const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'steam',
    data: new SlashCommandBuilder()
        .setName('steam')
        .setDescription('Información sobre el farmeo y cómo unirte al grupo de Steam'),
    globalCooldown: 70,
    async execute(interaction) {
        const message = await interaction.reply({
            content: `¡Que onda amigo, cómo te va! Para farmear, podes entrar al grupo de Steam y al chat. De ahí, podes unirte a los lobbys. Para seguir las reglas, dirígete a <#1326995374933676174> y <#1336418426712752328>.  
Cualquier otra duda que tengas, podés preguntarle a los chicos del VC, que son re copados.  

Te dejo los link para unirte:  
👉 **Grupo de Steam**: [Farming XP Argentina](https://steamcommunity.com/groups/farming-xp-argentina-ar)  

¡Que disfrutes el farmeo!`,

            fetchReply: true
        });

        setTimeout(async () => {
            if (message) {
                await message.delete().catch(console.error);
            }
        }, 60000); // 1 minuto
    },
};
