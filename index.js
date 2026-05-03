'use strict';

const bedrock = require('bedrock-protocol');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const config = {
  host: 'WorldWidePlusSMP.aternos.me', 
  port: 23270,                        
  version: '1.26.14',                
  password: 'chalo362'               
};

app.get('/', (req, res) => res.send('🤖 KING IS JUMPING 🗿'));
app.listen(PORT, '0.0.0.0');

function createBot() {
  console.log(`[*] @a LOCKED IN + JUMPING... 🗿🧤`);
  
  const client = bedrock.createClient({
    host: config.host,
    port: config.port,
    version: config.version,
    offline: true,              
    skipEncryption: true,       // NO REAL ENCRYPTION 💀
    connectTimeout: 90000,      
    raknetErrorTimeout: 90000
  });

  client.on('join', () => {
    console.log("[+] JOINED! STARTING JUMP GRIND... 🗿");
    
    // THE INFINITY JUMP FIX:
    setInterval(() => {
      if (client.status === 'play') {
        // Force a jump/move packet so we never go idle
        client.write('player_auth_input', {
          pitch: 0, yaw: 0,
          position: client.startGameData.world_spawn,
          move_vector: { x: 0, z: 0 },
          input_data: { jump_down: true, jumping: true },
          input_mode: 'touch', play_mode: 'normal',
          tick: BigInt(0)
        });
        console.log("[*] JUMP! 🧪");
      }
    }, 2000); // Jump every 2s

    setTimeout(() => {
      client.chat(`/login ${config.password}`);
    }, 5000); 
  });

  client.on('error', (err) => {
    if (err.message.includes('timeout')) setTimeout(createBot, 10000); 
  });

  client.on('close', () => setTimeout(createBot, 5000));
}

createBot();
