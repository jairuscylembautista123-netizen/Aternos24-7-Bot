'use strict';

const bedrock = require('bedrock-protocol');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// --- THE SIGMA CONFIG ---
const config = {
  name: "Immortal King Bot",
  host: 'WorldWidePlusSMP.aternos.me', 
  port: 23270,                        // YOUR SPECIFIC ATERNOS PORT 🧤
  version: '1.26.14',                 // Match Aternos EXACTLY
  offline: true                       // FOR CRACKED SERVERS
};

// ============================================================
// EXPRESS SERVER - Keep Render Alive
// ============================================================
app.get('/', (req, res) => {
  res.send(`<h1>🤖 ${config.name} Dashboard</h1><p>Status: Online on Port ${config.port}</p>`);
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'connected', 
    uptime: Math.floor(process.uptime()),
    memory: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Server] Dashboard started on port ${PORT} 🧤`);
});

// ============================================================
// BEDROCK BOT LOGIC - NO MINEFLAYER
// ============================================================
function createBot() {
  console.log(`[*] BOOTING THE IMMORTAL KING ON BEDROCK... 📟`);
  
  const client = bedrock.createClient({
    host: config.host,
    port: config.port,
    version: config.version,
    offline: config.offline,
    connectTimeout: 60000 // FIX FOR PING TIMEOUT 🥀
  });

  client.on('join', () => {
    console.log("[+] THE IMMORTAL KING HAS SPAWNED! 🧤");
    
    // Anti-AFK Heartbeat
    setInterval(() => {
      if (client.status === 'play') {
        client.write('animate', { action_id: 1 }); // Swing arm
        console.log("[*] Heartbeat: Still Grinding... 🧪");
      }
    }, 30000);
  });

  client.on('error', (err) => {
    console.log("[-] STINKY ERROR: " + err.message + " 🥀");
  });

  client.on('close', () => {
    console.log("[!] CONNECTION LOST... REANIMATING! 🚨");
    setTimeout(createBot, 5000); // Simple reconnect
  });
}

// ============================================================
// CRASH RECOVERY - IMMORTAL MODE
// ============================================================
process.on('uncaughtException', (err) => {
  const msg = err.message || 'Unknown';
  console.log(`[FATAL] Exception: ${msg} 🥀`);

  const isNetworkError = msg.includes('timeout') || msg.includes('ECONN') || msg.includes('RakNet');
  
  // THE TIMEOUT RECOVERY FIX WE DISCUSSED[cite: 1]
  setTimeout(() => {
    console.log("[*] RE-BOOTING PROTOCOL AFTER CRASH... 🧤");
    createBot(); 
  }, isNetworkError ? 5000 : 10000);
});

// START THE GRIND
createBot();
