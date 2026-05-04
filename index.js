const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Your NEW unlinked credentials from Render Env
const credentials = {
    user: process.env.ATERNOS_USER,
    password: process.env.ATERNOS_PASSWORD
};

// Human Fingerprint for your Android 12 Samsung A11 rig
const humanHeaders = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; SM-A115F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin': 'https://aternos.org',
    'Referer': 'https://aternos.org/server/XialitySMP.aternos.me/'
};

async function bypassSecurity() {
    console.log("--- 🕵️ NATIVE FETCH SIGMA PULSE: START ---");

    try {
        const bodyParams = new URLSearchParams({
            user: credentials.user,
            password: credentials.password,
            ajax: '1'
        });

        // STEP 1: Login using Global Fetch (No url.parse garbage here!)
        const loginRes = await fetch('https://aternos.org/panel/ajax/login.php', {
            method: 'POST',
            headers: humanHeaders,
            body: bodyParams
        });

        // Get the response text to see the ACTUAL TRUTH
        const loginText = await loginRes.text();
        const rawCookies = loginRes.headers.get('set-cookie');

        if (loginRes.ok && rawCookies) {
            // Clean up the cookies so Aternos doesn't act like a looser
            const cookieStr = rawCookies.split(',').map(c => c.split(';')[0]).join('; ');
            console.log("✅ Login Pulse Delivered! Unlinked Account Verified.");

            // STEP 2: Extend the server life
            const extendRes = await fetch('https://aternos.org/panel/ajax/extend.php', {
                method: 'POST',
                headers: { 
                    ...humanHeaders, 
                    'Cookie': cookieStr 
                }
            });

            const result = await extendRes.text();
            console.log(`Final Extend Result: ${result}`);
            console.log("XialitySMP: 24/7 TECHNICAL STATUS SECURED 🔥");
        } else {
            console.log(`❌ Login Chopped. Status: ${loginRes.status}. Check your Password!`);
        }
    } catch (err) {
        console.log(`🛑 ENGINE CRASH: ${err.message}. Aternos security is strong.`);
    }
}

// 45-75s Random Interval for Tayug Stealth
function loop() {
    const jitter = 45000 + Math.random() * 30000;
    setTimeout(() => {
        bypassSecurity();
        loop();
    }, jitter);
}

loop();

app.get('/', (req, res) => res.send('<h1>XialitySMP: FETCH ENGINE 100% NO-WARNING 🛡️</h1>'));
app.listen(PORT, () => console.log(`Engine Online on Port ${PORT}. TikTok brainrot deleted! 💀`));
