'use strict';

const bedrock = require('bedrock-protocol');
const express = require('express');
const axios = require('axios'); // ADD THIS TO PACKAGE.JSON! 🧪
const app = express();
const PORT = process.env.PORT || 5000;

// THE CONFIG - LOCKED IN 🧤
const config = {
  host: 'WorldWidePlusSMP.aternos.me', 
  port: 23270,                        
  version: '1.26.14',                
  password: 'chalo362',
  url: 'https://your-app-name.onrender.com' // CHANGE TO YOUR RENDER URL! 🚨
};

// THE WEB SERVER TO TRICK THE HOST 🤫
app.get('/', (req, res) => {
  res.send('<h1>🤖 IMMORTAL KING IS AWAKE 🤖</h1>');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[+] WEB DASHBOARD LIVE ON PORT ${PORT} 🧤`);
});

// THE "MR. JUICE" SELF-PING LOGIC 🧪
setInterval(async () => {
  try {
    await axios.get(config.url);
    console.log("[*] SELF-PING SUCCESS: STAYING AWAKE... 🛡️");
  } catch (err) {
    console.log("[-] SELF-PING FAILED: " + err.message + " 🥀");
  }
}, 300000); // Every 5 minutes

function createBot() {
  console.log(`[*] @a CONNECTING TO ${config.host}... 🧪`);
  
  const client = bedrock.createClient({
    host: config.host,
    port: config.port,
    version: config.version,
    offline: true,              
    skipEncryption: true,       
    connectTimeout: 90000
  });

  client.on('join', () => {
    console.log("[+] JOINED! WAITING 10S TO AVOID VOID... 🧤");
    
    setTimeout(() => {
      console.log("[*] LOGGING IN... 🛡️");
      client.chat(`/login ${config.password}`);
      
      setInterval(() => {
        if (client.status === 'play') {
          client.write('player_auth_input', {
            pitch: 0, yaw: 0,
            position: { x: 0, y: 100, z: 0 },
            move_vector: { x: 0, z: 0 },
            input_data: { jump_down: true, jumping: true },
            input_mode: 'touch', play_mode: 'normal',
            tick: BigInt(0)
          });
          console.log("[*] SIGMA JUMP! 🧪");
        }
      }, 5000); 
    }, 10000); 
  });

  client.on('error', (err) => {
    console.log("[-] ERROR: " + err.message + " 🥀");
    setTimeout(createBot, 15000); 
  });

  client.on('close', () => {
    console.log("[-] CONNECTION LOST... RE-LOCKING IN... 🧤");
    setTimeout(createBot, 5000);
  });
}

createBot();
