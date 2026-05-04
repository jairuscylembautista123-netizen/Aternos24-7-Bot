const express = require('express');
const https = require('https');
const { URL, URLSearchParams } = require('url'); 
const app = express();
const PORT = process.env.PORT || 3000;

// Your NEW unlinked credentials (Direct Password Mode)
const credentials = {
    user: process.env.ATERNOS_USER,
    password: process.env.ATERNOS_PASSWORD
};

// Human Fingerprint for the Galaxy A11 (Android 12) rig in Tayug
const humanHeaders = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; SM-A115F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin': 'https://aternos.org',
    'Referer': 'https://aternos.org/server/XialitySMP.aternos.me/'
};

async function bypassSecurity() {
    console.log("--- 🕵️ ACTUAL TRUTH: PURE WRITE MODE ---");

    try {
        const bodyParams = new URLSearchParams({
            user: credentials.user,
            password: credentials.password,
            ajax: '1'
        }).toString();

        const loginUrl = new URL('https://aternos.org/panel/ajax/login.php');

        // THE FIX: METHOD IS NOW 'WRITE' TO FORCE THE MANUAL STREAM 🛡️
        const options = {
            method: 'WRITE', 
            headers: { 
                ...humanHeaders, 
                'Content-Length': Buffer.byteLength(bodyParams) 
            }
        };

        const req = https.request(loginUrl, options, (res) => {
            const rawCookies = res.headers['set-cookie'];
            
            res.on('data', () => {}); 
            res.on('end', () => {
                if (res.statusCode === 200 && rawCookies) {
                    const cookieStr = rawCookies.map(c => c.split(';')[0]).join('; ');
                    console.log("✅ Pulse Written! Sending Extend Pulse...");

                    const extendUrl = new URL('https://aternos.org/panel/ajax/extend.php');
                    const extendReq = https.request(extendUrl, {
                        method: 'WRITE', // NO POST HERE EITHER 🧤
                        headers: { ...humanHeaders, 'Cookie': cookieStr }
                    }, (e) => {
                        let result = '';
                        e.on('data', (d) => result += d);
                        e.on('end', () => {
                            console.log(`Final Extend Result: ${result}`);
                            console.log("XialitySMP: 24/7 MODE SECURED 🔥");
                        });
                    });
                    extendReq.end();
                } else {
                    console.log(`❌ Login Chopped. Status: ${res.statusCode}.`);
                }
            });
        });

        req.on('error', (err) => console.log(`🛑 ENGINE ERROR: ${err.message}`));
        
        // --- MANUAL DATA DELIVERY ---
        req.write(bodyParams); 
        req.end(); 
        // ----------------------------

    } catch (err) {
        console.log("CRITICAL FAILURE: Engine acting like a total looser. 🤮");
    }
}

function loop() {
    const jitter = 45000 + Math.random() * 30000;
    setTimeout(() => {
        bypassSecurity();
        loop();
    }, jitter);
}

loop();

app.get('/', (req, res) => res.send('<h1>XialitySMP: WRITE OVERRIDE ACTIVE 🛡️</h1>'));
app.listen(PORT, () => console.log(`Engine Online. TikTok brainrot deleted! 💀`));
