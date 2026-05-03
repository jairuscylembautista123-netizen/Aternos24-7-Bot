'use strict';

const bedrock = require('bedrock-protocol');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const config = {
  host: 'WorldWidePlusSMP.aternos.me', 
  port: 23270,                        
  version: '1.26.14',                
  password: 'chalo362'               // THE MISSING SIGMA KEY 🧤
};

app.get('/', (req, res) => res.send('🤖 Bot is Grinding...'));
app.listen(PORT, '0.0.0.0', () => console.log(`[Server] Live on ${PORT} 🧤`));

function createBot() {
  console.log(`[*] BOOTING WITH PASSWORD: ${config.password}... 📟`);
  
  const client = bedrock.createClient({
    host: config.host,
    port: config.port,
    version: config.version,
    offline: true,              
    connectTimeout: 90000,      // WAIT FOR THE STINKY LAG 🥀
    raknetErrorTimeout: 90000
  });

  client.on('join', () => {
    console.log("[+] SPAWNED! SENDING AUTH... 🧤");
    
    // THE PASSWORD FIX:
    setTimeout(() => {
      client.chat(`/login ${config.password}`);
      console.log(`[*] Sent: /login ${config.password} 🧪`);
    }, 3000); // Wait 3s for the world to load
  });

  client.on('error', (err) => console.log("[-] ERROR: " + err.message + " 🥀"));
  client.on('close', () => setTimeout(createBot, 5000));
}

createBot();
