const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('creadores')
        .setDescription('Muestra los perfiles de Steam de los creadores Doscua y Rextor'),
    globalCooldown: 185, 
    async execute(interaction) {
        const message = await interaction.reply({
            content:
                "🔹 **Creadores del proyecto** 🔹\n" +
                "👤 **Doscua**: [Perfil de Steam](https://steamcommunity.com/id/dosscua/)\n" +
                "👤 **Lefty**: [Perfil de Steam](https://steamcommunity.com/id/LeftyCases/)",
            fetchReply: true
        });

        setTimeout(async () => {
            if (message) {
                await message.delete().catch(console.error);
            }
        }, 120000);
    },
};
