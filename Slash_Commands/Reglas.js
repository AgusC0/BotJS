const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'reglas',
    data: new SlashCommandBuilder()
        .setName('reglas')
        .setDescription('Muestra las reglas del servidor'),
    globalCooldown: 120,
    async execute(interaction) {
        const message = await interaction.reply({
            content: `⚠️ **Normas en las salas de farmeo** ⚠️  
Nos interesa que haya respeto 🤝 y compañerismo 💙.  
🔴 1 WARN = Baneo de 1 día 🕐  
🟠 2 WARN = Baneo de 1 semana 📅  
🔵 3 WARN = Baneo permanente 🚫

---  
🚨 **Uso indebido del servidor** 🚨  
El uso del servidor para desviar miembros hacia comunidades privadas, excluyendo a otros de la comunidad, es una falta grave y puede resultar en **baneo permanente**.  
Fomentamos un entorno inclusivo donde todos tengan la oportunidad de participar y crecer juntos. La creación de grupos cerrados con la intención de apartar a otros va en contra de estos valores.  
Si alguien tiene dudas o quiere discutirlo, pueden contactarme por privado.  
Muchas gracias por su atención.`,
            fetchReply: true
        });

        setTimeout(async () => {
            if (message) {
                await message.delete().catch(console.error);
            }
        }, 60000);
    },
};
