const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

async function smartRestart() {
    try {
        // 1. LOGIN & GO TO SERVER TAB
        // (Use the credentials we "installed" in Render)
        await axios.get('https://aternos.org/server/');
        
        // 2. CHECK PLAYER COUNT (The Actual Truth)
        // We look for the player count on the page. 
        // If it's NOT "0/whatever", we STOP!
        const response = await axios.get('https://aternos.org/server/');
        if (response.data.includes('id="status-number">0/')) {
            console.log("0 players online. 1,000,000/10 Sigma to Restart! 🧤");
            await axios.post('https://aternos.org/panel/ajax/restart.php');
        } else {
            console.log("Players are joined! Aborting restart to avoid 'looser' moment! 🛡️🔥");
        }
    } catch (error) {
        console.log("Engine hit a 'stinky' error checking players. 🧪💀");
    }
}

setInterval(smartRestart, 300000); // Check every 5 minutes
app.listen(PORT);
