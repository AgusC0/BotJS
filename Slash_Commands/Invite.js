const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Obtén el link de invitación al servidor de Discord'),
    globalCooldown: 120,
    async execute(interaction) {
        const message = await interaction.reply({
            content: '¡Únete a nuestro servidor de Discord! \nhttps://discord.gg/Z39Gnr9THg',
            fetchReply: true
        });

        setTimeout(async () => {
            if (message) {
                await message.delete().catch(console.error);
            }
        }, 120000);
    },
};
