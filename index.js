const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Credentials from your Render Environment Variables
const credentials = {
    user: process.env.ATERNOS_USER,
    password: process.env.ATERNOS_PASSWORD
};

// Sigma Human Headers to stop the Aternos "garbage" from blocking your Samsung A11
const humanHeaders = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; SM-A115F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://aternos.org/server/',
    'Origin': 'https://aternos.org',
};

async function keepXialityAlive() {
    try {
        console.log("--- Scanning XialitySMP (Modern URL Mode) ---");

        // 1. LOGIN (Using standard string body to avoid old URL parsing)
        const loginData = new URLSearchParams();
        loginData.append('user', credentials.user);
        loginData.append('password', credentials.password);

        await axios.post('https://aternos.org/panel/ajax/login.php', loginData.toString(), {
            headers: { 
                ...humanHeaders, 
                'Content-Type': 'application/x-www-form-urlencoded' 
            }
        });

        // 2. THE CORRECT DASHBOARD HIT
        const response = await axios.get('https://aternos.org/server/XialitySMP.aternos.me', { 
            headers: humanHeaders 
        });
        
        // 3. PLAYER CHECK (Protecting your technical Minecraft Bedrock world)
        if (response.data.includes('id="status-number">0/')) {
            console.log("0 players online. 🧤");

            // 4. THE +1 BUTTON SMASH (No more gugugaga restarts!)
            if (response.data.includes('btn-extend') || response.data.includes('extend.php')) {
                console.log("Timer under a minute! Smashed the +1 button! 🛡️🔥");
                await axios.post('https://aternos.org/panel/ajax/extend.php', {}, { headers: humanHeaders });
                console.log("1,000,000/10 SIGMA! Time extended! 🧤");
            } else {
                console.log("Timer is still safe. 🧪");
            }
        } else {
            console.log("Players are joined! Keeping session alive. 💀");
        }

    } catch (error) {
        console.log("Aternos garbage blocked us or connection timed out. 🧪");
    }
}

// Check every 30 seconds to catch the +1 window
setInterval(keepXialityAlive, 30000);

app.get('/', (req, res) => res.send('<h1>XialitySMP 24/7 Engine: MODERN SIGMA ACTIVE 🧤</h1>'));
app.listen(PORT, () => console.log(`Engine running on port ${PORT} without warnings!`));
