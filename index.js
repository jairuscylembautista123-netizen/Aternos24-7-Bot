'use strict';

const bedrock = require('bedrock-protocol');
const express = require('express');
const config = require('./settings.json');

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => res.send('Bot is IMMORTAL and Reconnecting!'));
app.listen(PORT, () => console.log(`[System] Web Dashboard Live`));

function startBot() {
  console.log(`[Bot] Connecting to ${config.name}...`);

  try {
    const client = bedrock.createClient({
      host: config.name,
      port: 23270,
      username: config['bot-account'].username,
      offline: true,
      version: "" // BLANK FOR GIGACHAD AUTO-DETECT
    });

    client.on('spawn', () => {
      console.log('[+] Spawned! Aternos timer is now frozen.');
    });

    // THE MR. JUICE RECONNECT LOGIC
    client.on('error', (err) => {
      console.log(`[!] Error: ${err.message}. Retrying in 10s...`);
      setTimeout(startBot, 10000); // Wait 10s and restart the function
    });

    client.on('close', () => {
      console.log('[-] Connection lost. Restarting loop...');
      setTimeout(startBot, 10000); // Wait 10s and restart the function
    });

  } catch (e) {
    console.log(`[Fatal] ${e.message}. Emergency restart in 20s...`);
    setTimeout(startBot, 20000);
  }
}

// Start the first attempt
startBot();
