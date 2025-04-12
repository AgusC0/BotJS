const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verificar')
    .setDescription('Verifica si tenés tu cuenta de Steam conectada al perfil de Discord'),

  async execute(interaction) {
    const clientId = '1336881786785107978'; 
    const redirectUri = encodeURIComponent('https://botjs-production-be49.up.railway.app/callback');
    const scopes = 'identify connections';

    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${encodeURIComponent(scopes)}`;

    await interaction.reply({
      content: `🛡️ Para verificar tu cuenta, hacé clic en este enlace y autorizá el acceso:\n${authUrl}`,
      ephemeral: true,
    });
  },
};