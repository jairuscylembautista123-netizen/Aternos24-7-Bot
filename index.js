'use strict';

const bedrock = require('bedrock-protocol');
const express = require('express');
const config = require('./settings.json');

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('WorldwidePlusSMP Bot is Running!');
});

app.listen(PORT, () => {
  console.log('Web server is live');
});

function startBot() {
  console.log('Connecting to: ' + config.name);
  
  try {
    const client = bedrock.createClient({
      host: config.name,
      port: 19132,
      username: config['bot-account'].username,
      offline: true,
      version: ""
    });

    client.on('spawn', () => {
      console.log('Bot spawned successfully!');
    });

    client.on('error', (err) => {
      console.log('Error: ' + err.message);
      setTimeout(startBot, 10000);
    });

    client.on('close', () => {
      console.log('Connection closed. Retrying...');
      setTimeout(startBot, 10000);
    });
  } catch (e) {
    console.log('Crash: ' + e.message);
    setTimeout(startBot, 10000);
  }
}

startBot();
