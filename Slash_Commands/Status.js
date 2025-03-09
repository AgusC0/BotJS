const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Verifica el estado de Steam'),
    globalCooldown: 130, 
    async execute(interaction) {
        const message = await interaction.reply({
            content: 'Consulta el estado de Steam aquí: \nhttps://steamstat.us/',
            fetchReply: true
        });

        setTimeout(async () => {
            if (message) {
                await message.delete().catch(console.error);
            }
        }, 120000);
    },
};

