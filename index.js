'use strict';

const bedrock = require('bedrock-protocol');
const express = require('express');
const config = require('./settings.json');

const app = express();
const PORT = process.env.PORT || 10000;

// Health check for Render.com to keep the "garbage can" from sleeping
app.get('/', (req, res) => res.send('WorldwidePlusSMP Bot is Running!'));
app.listen(PORT, () => console.log(`[System] Web Dashboard on Port ${PORT}`));

function startBot() {
  console.log(`[Bot] Connecting to ${config.server.ip}...`);

  try {
    const client = bedrock.createClient({
      host: config.server.ip,
      port: parseInt(config.server.port),
      username: config['bot-account'].username,
      offline: true,
      version: "" // BLANK FOR GIGACHAD AUTO-DETECT
    });

    client.on('spawn', () => {
      console.log('[+] Bot spawned! WorldwidePlusSMP is now IMMORTAL.');
      
      // Anti-AFK head movement
      setInterval(() => {
        client.queue('player_auth_input', {
          pitch: 0, yaw: Math.random() * 360,
          position: { x: 0, y: 0, z: 0 },
          move_vector: { x: 0, z: 0 },
          input_data: { _value: 0 }
        });
      }, 25000);
    });

    client.on('error', (err) => {
      console.log(`[!] Error: ${err.message}`);
      setTimeout(startBot, 5000);
    });

    client.on('close', () => {
      console.log('[-] Connection closed. Restarting...');
      setTimeout(startBot, 5000);
    });

  } catch (e) {
    console.log(`[Fatal] ${e.message}`);
    setTimeout(startBot, 10000);
  }
}

startBot();
