const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
const config = require("./config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
client.globalCooldowns = new Collection(); 

const commandFiles = fs.readdirSync("./Slash_Commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./Slash_Commands/${file}`);
    client.commands.set(command.data.name, command);
}

const rest = new REST({ version: '10' }).setToken(config.CLIENT_TOKEN);

(async () => {
    try {
        console.log("Cargando comandos en Discord...");
        await rest.put(
            Routes.applicationCommands(config.clientID),
            { body: client.commands.map(cmd => cmd.data.toJSON()) }
        );        
        console.log(`Se han cargado ${client.commands.size} comandos con éxito.`);
    } catch (error) {
        console.error("Error al cargar comandos:", error);
    }
})();

client.once("ready", () => {
    console.log("✅ Bot Online");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    const { globalCooldowns } = client;
    const now = Date.now();
    const cooldownAmount = (command.globalCooldown || 10) * 1000; 

    if (globalCooldowns.has(command.data.name)) {
        const expirationTime = globalCooldowns.get(command.data.name) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
            return interaction.reply({ content: `⏳ El comando **/${command.data.name}** está en cooldown. Espera ${timeLeft} segundos antes de volver a usarlo.`, ephemeral: true });
        }
    }

    globalCooldowns.set(command.data.name, now);
    setTimeout(() => globalCooldowns.delete(command.data.name), cooldownAmount);

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error ejecutando ${interaction.commandName}:`, error);
        await interaction.reply({ content: "Hubo un error al ejecutar el comando.", ephemeral: true });
    }
});

client.login(config.CLIENT_TOKEN);