const express = require('express');
const axios = require('axios');
const { URLSearchParams } = require('url'); // MODERN WHATWG API 🧤
const app = express();
const PORT = process.env.PORT || 3000;

const credentials = {
    user: process.env.ATERNOS_USER,
    password: process.env.ATERNOS_PASSWORD
};

const humanHeaders = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; SM-A115F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://aternos.org/server/',
    'Origin': 'https://aternos.org',
};

async function keepXialityAlive() {
    try {
        console.log("--- Sigma Engine: Scanning XialitySMP ---");

        // 1. LOGIN (Using Modern WHATWG Params to stop the warning)
        const params = new URLSearchParams();
        params.append('user', credentials.user);
        params.append('password', credentials.password);

        await axios.post('https://aternos.org/panel/ajax/login.php', params.toString(), {
            headers: { 
                ...humanHeaders, 
                'Content-Type': 'application/x-www-form-urlencoded' 
            }
        });

        // 2. TARGET THE DASHBOARD
        const response = await axios.get('https://aternos.org/server/XialitySMP.aternos.me', { 
            headers: humanHeaders 
        });
        
        // 3. THE +1 BUTTON LOGIC
        if (response.data.includes('id="status-number">0/')) {
            if (response.data.includes('btn-extend') || response.data.includes('extend.php')) {
                console.log("Timer low! Pressing +1 on XialitySMP! 🛡️🔥");
                await axios.post('https://aternos.org/panel/ajax/extend.php', {}, { headers: humanHeaders });
                console.log("1,000,000/10 SIGMA! Time extended! 🧤");
            } else {
                console.log("Timer is safe. No 'gugugaga' moves. 🧪");
            }
        } else {
            console.log("Players are joined! Keeping technical gameplay active. 💀");
        }

    } catch (error) {
        console.log("Aternos garbage blocked us. Restarting the Sigma Pulse... 🧪");
    }
}

// Check every 30 seconds to catch that +1 window
setInterval(keepXialityAlive, 30000);

app.get('/', (req, res) => res.send('<h1>XialitySMP 24/7 Engine: ANTI-GUGUGAGA ACTIVE 🛡️</h1>'));
app.listen(PORT, () => console.log(`Engine running on port ${PORT}. Clean logs only! 🧤`));
