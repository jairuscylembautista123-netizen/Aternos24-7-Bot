const express = require('express');
const axios = require('axios');
const app = express();

// Use the credentials you "installed" in Render
const credentials = {
    user: process.env.ATERNOS_USER,
    password: process.env.ATERNOS_PASSWORD
};

async function keepXialityAlive() {
    try {
        // 1. AXIOS LOGIN
        await axios.post('https://aternos.org/panel/ajax/login.php', 
        `user=${credentials.user}&password=${credentials.password}`, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        // 2. DASHBOARD HIT (XialitySMP)
        const response = await axios.get('https://aternos.org/server/');
        
        // 3. THE +1 BUTTON DETECTION
        // If the extend button is there, Axios smashes it!
        if (response.data.includes('btn-extend') || response.data.includes('extend.php')) {
            console.log("Timer is low on XialitySMP! Pressing +1 Button! 🧤");
            await axios.post('https://aternos.org/panel/ajax/extend.php');
            console.log("Time Extended! 1,000,000/10 SIGMA! 🛡️🔥");
        } else {
            console.log("XialitySMP is stable. No 'gugugaga' moves needed. 🧪");
        }
    } catch (error) {
        console.log("Axios got 'chopped' by the Aternos garbage. Check your Render logs! 💀");
    }
}

// Check every 30 seconds to catch that +1 button window
setInterval(keepXialityAlive, 30000);

app.get('/', (req, res) => res.send('XialitySMP 24/7 Engine is ONLINE! 🧤'));
app.listen(process.env.PORT || 3000);
