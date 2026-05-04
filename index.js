const express = require('express');
const axios = require('axios'); // We keep this for the GET requests
const app = express();
const PORT = process.env.PORT || 3000;

const credentials = {
    user: process.env.ATERNOS_USER,
    password: process.env.ATERNOS_PASSWORD
};

// Sigma Human Headers for your Samsung Galaxy A11 rig
const humanHeaders = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; SM-A115F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://aternos.org/server/XialitySMP.aternos.me',
    'Origin': 'https://aternos.org',
};

async function keepXialityAlive() {
    try {
        console.log("--- 1,000,000/10 SIGMA PULSE START ---");

        // 1. MODERN LOGIN (Using URLSearchParams to avoid the "stinky" parser)
        const params = new URLSearchParams();
        params.append('user', credentials.user);
        params.append('password', credentials.password);

        const session = axios.create({
            baseURL: 'https://aternos.org',
            headers: humanHeaders
        });

        // The Actual Truth Login
        await session.post('/panel/ajax/login.php', params.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        // 2. HIT THE XIALITY-SMP DASHBOARD
        const response = await session.get('/server/XialitySMP.aternos.me');
        
        // 3. THE +1 BUTTON SMASH
        // We check for the 'btn-extend' or the specific AJAX call
        if (response.data.includes('id="status-number">0/')) {
            if (response.data.includes('extend.php') || response.data.includes('btn-extend')) {
                console.log("Timer under 1 min! Smashing +1 button! 🧤🛡️");
                await session.post('/panel/ajax/extend.php');
                console.log("Time Extended! XialitySMP is 24/7! 🔥");
            } else {
                console.log("Timer is safe. No 'gugugaga' moves needed. 🧪");
            }
        } else {
            console.log("Players are joined! Keeping the world alive. 💀");
        }

    } catch (error) {
        console.log("Aternos garbage blocked the pulse. Retrying... 🤮");
    }
}

// Check every 30 seconds to catch that +1 window
setInterval(keepXialityAlive, 30000);

app.get('/', (req, res) => res.send('XialitySMP 24/7 Engine: ZERO-GUGUGAGA MODE 🛡️'));
app.listen(PORT, () => console.log(`Engine running on ${PORT}. No more security chops! 🧤`));
