
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Credentials from your Render Environment Variables
const credentials = {
    user: process.env.ATERNOS_USER,
    password: process.env.ATERNOS_PASSWORD
};

// Sigma Human Headers to stop the Aternos "garbage" from blocking you
const humanHeaders = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; SM-A115F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://aternos.org/server/',
    'Origin': 'https://aternos.org',
};

async function keepXialityAlive() {
    try {
        console.log("--- Scanning XialitySMP Dashboard ---");

        // 1. LOGIN
        await axios.post('https://aternos.org/panel/ajax/login.php', 
        `user=${credentials.user}&password=${credentials.password}`, {
            headers: { ...humanHeaders, 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        // 2. THE CORRECT DASHBOARD HIT
        // Using your exact link: https://aternos.org/server/XialitySMP.aternos.me
        const response = await axios.get('https://aternos.org/server/XialitySMP.aternos.me', { 
            headers: humanHeaders 
        });
        
        // 3. PLAYER CHECK (Protecting your technical Minecraft gameplay)
        if (response.data.includes('id="status-number">0/')) {
            console.log("0 players online. 🧤");

            // 4. THE +1 BUTTON SMASH (The 24/7 Secret)
            if (response.data.includes('btn-extend') || response.data.includes('extend.php')) {
                console.log("Timer under a minute! Smashed the +1 button! 🛡️🔥");
                await axios.post('https://aternos.org/panel/ajax/extend.php', {}, { headers: humanHeaders });
                console.log("1,000,000/10 SIGMA! Time extended! 🧤");
            } else {
                console.log("Timer is still safe. No 'gugugaga' moves needed. 🧪");
            }
        } else {
            console.log("Players are joined! Keeping server alive for the squad. 💀");
        }

    } catch (error) {
        console.log("Aternos garbage blocked us. Re-tuning the engine... 🧪");
    }
}

// Check every 30 seconds so we never lose the 24/7 status
setInterval(keepXialityAlive, 30000);

app.get('/', (req, res) => res.send('<h1>XialitySMP 24/7 Engine: ACTIVE 🧤</h1>'));
app.listen(PORT, () => console.log(`Engine running on port ${PORT}. 1,000,000/10 vibes!`));
