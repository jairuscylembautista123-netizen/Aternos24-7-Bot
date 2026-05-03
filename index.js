'use strict';

const bedrock = require('bedrock-protocol');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// THE CONFIG - NO MORE "LIER" DEPLOYS 🧤
const config = {
  host: 'WorldWidePlusSMP.aternos.me', 
  port: 23270,                      
  version: '1.26.14.1', // THE SIGMA VERSION
  password: 'chalo362'
};

app.get('/', (req, res) => {
  res.send('<h1>🤖 RENDER CLOUD: DIGITAL RESURRECTION ACTIVE 🧤</h1>');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[+] RENDER DASHBOARD LIVE ON PORT ${PORT} 🧤`);
});

function createBot() {
  const client = bedrock.createClient({
    host: config.host,
    port: config.port,
    version: config.version,
    offline: true,              
    skipEncryption: true,       
    connectTimeout: 90000 // GIVING IT MORE TIME FOR THE 11-YEAR-OLD BOSS
  });

  client.on('join', () => {
    console.log("[+] BOT IS LIVE! NO MORE FAILURES! 🧤");
    setTimeout(() => {
      client.chat(`/login ${config.password}`);
      
      setInterval(() => {
        client.write('player_auth_input', {
          pitch: 0, yaw: 0, position: { x: 0, y: 100, z: 0 },
          move_vector: { x: 0, z: 0 }, 
          input_data: { jump_down: true, jumping: true },
          input_mode: 'touch', play_mode: 'normal', tick: BigInt(0)
        });
      }, 5000); 
    }, 10000); 
  });

  client.on('error', (err) => {
    console.log("[-] RENDER ERROR BLOCKED: " + err.message + " 🥀");
    setTimeout(createBot, 15000); 
  });
}

createBot();
