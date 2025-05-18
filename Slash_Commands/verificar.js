const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: 'verificar',
  data: new SlashCommandBuilder()
    .setName('verificar')
    .setDescription('Verifica si tenés tu cuenta de Steam conectada al perfil de Discord'),
  globalCooldown: 30,  
  async execute(interaction) {
    const clientId = '1336881786785107978';
    const redirectUri = encodeURIComponent('https://farmxpbot.com/callback');
    const scopes = 'identify connections';

    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(scopes)}`;

    const message = await interaction.reply({
      content: `🛡️ Para verificar tu cuenta, [hacé clic acá y autorizá el acceso](${authUrl})`,
      ephemeral: true,  
      fetchReply: true,
    });

    setTimeout(async () => {
      if (message) {
        await message.delete().catch(console.error);  
      }
    }, 120000); // 1 minuto
  },
};


