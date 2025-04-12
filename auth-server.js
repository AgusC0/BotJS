require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();

const bot = new Client({
  intents: [GatewayIntentBits.Guilds]
});

bot.login(process.env.CLIENT_TOKEN);

app.get('/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.send('❌ No se recibió ningún código de autorización.');

  try {
    const tokenRes = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.REDIRECT_URI,
      scope: 'identify connections',
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const { access_token } = tokenRes.data;

    const userRes = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    const user = userRes.data;

    const connRes = await axios.get('https://discord.com/api/users/@me/connections', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const steamConn = connRes.data.find(c => c.type === 'steam');
    if (!steamConn) return res.send('❌ No se encontró una cuenta de Steam conectada.');

    const guild = await bot.guilds.fetch(process.env.GUILD_ID);
    const member = await guild.members.fetch(user.id);

    const rolVerificado = guild.roles.cache.get(process.env.ROL_VERIFICADO_ID);
    const rolFarmeito = guild.roles.cache.get(process.env.ROL_FARMEITO_ID);
    const rolNoVerificado = guild.roles.cache.get(process.env.ROL_NO_VERIFICADO_ID);

    if (rolVerificado) await member.roles.add(rolVerificado);
    if (rolFarmeito) await member.roles.add(rolFarmeito);
    if (rolNoVerificado) await member.roles.remove(rolNoVerificado);

    res.send(`✅ Verificado correctamente como **${user.username}** con Steam: **${steamConn.name}**`);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('⚠️ Error en el proceso de verificación.');
  }
});

const PORT = process.env.PORT || 1275; 

app.listen(PORT, () => {
  console.log(`🌐 Servidor OAuth2 activo en https://botjs-production-be49.up.railway.app`);
});
