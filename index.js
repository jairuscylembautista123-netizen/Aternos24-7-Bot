const express = require('express');
const https = require('https');
const { URL, URLSearchParams } = require('url'); // THE ACTUAL TRUTH API
const app = express();
const PORT = process.env.PORT || 3000;

// Your NEW unlinked credentials from Render Env
const credentials = {
    user: process.env.ATERNOS_USER,
    password: process.env.ATERNOS_PASSWORD
};

// Precise Fingerprint for your Android 12 Galaxy A11
const humanHeaders = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; SM-A115F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin': 'https://aternos.org',
    'Referer': 'https://aternos.org/server/XialitySMP.aternos.me/'
};

async function bypassSecurity() {
    console.log("--- STARTING RAW SIGMA PULSE ---");

    try {
        // Using WHATWG URLSearchParams to avoid old 'url' garbage
        const bodyParams = new URLSearchParams({
            user: credentials.user,
            password: credentials.password,
            ajax: '1'
        }).toString();

        // WE ARE PASSING THE URL OBJECT DIRECTLY - THIS KILLS DEP0169
        const loginUrl = new URL('https://aternos.org/panel/ajax/login.php');

        const options = {
            method: 'POST',
            headers: { 
                ...humanHeaders, 
                'Content-Length': Buffer.byteLength(bodyParams) 
            }
        };

        const req = https.request(loginUrl, options, (res) => {
            const rawCookies = res.headers['set-cookie'];
            
            res.on('data', () => {}); // Drain stream
            res.on('end', () => {
                if (res.statusCode === 200 && rawCookies) {
                    const cookieStr = rawCookies.map(c => c.split(';')[0]).join('; ');
                    console.log("✅ Login Pulse Delivered! Status: 200");

                    // The Extend Pulse using the same Modern URL Object logic
                    const extendUrl = new URL('https://aternos.org/panel/ajax/extend.php');
                    const extendReq = https.request(extendUrl, {
                        method: 'POST',
                        headers: { ...humanHeaders, 'Cookie': cookieStr }
                    }, (e) => {
                        let result = '';
                        e.on('data', (d) => result += d);
                        e.on('end', () => {
                            console.log(`Final Extend Result: ${result}`);
                            console.log("XialitySMP: 24/7 MODE SECURED. 🧤🛡️");
                        });
                    });
                    extendReq.end();
                } else {
                    console.log(`❌ Login Chopped. Status: ${res.statusCode}. Check Password!`);
                }
            });
        });

        req.on('error', (err) => console.log(`🛑 ENGINE ERROR: ${err.message}`));
        req.write(bodyParams);
        req.end();

    } catch (err) {
        console.log("CRITICAL FAILURE: Gugugaga vibes detected.");
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

app.get('/', (req, res) => res.send('XialitySMP: RAW SIGMA ENGINE ACTIVE 🛡️'));
app.listen(PORT, () => console.log(`Engine Online on Port ${PORT}. TikTok brainrot banned. 💀`));
