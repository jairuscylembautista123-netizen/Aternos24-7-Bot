const express = require('express');
const https = require('https');
const { URL, URLSearchParams } = require('url'); 
const app = express();
const PORT = process.env.PORT || 3000;

// CPU-Locked Credentials from Render Env
const credentials = {
    user: process.env.ATERNOS_USER,
    password: process.env.ATERNOS_PASSWORD
};

// Sigma Fingerprint for Galaxy A11 (Android 12) rig
const humanHeaders = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; SM-A115F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin': 'https://aternos.org',
    'Referer': 'https://aternos.org/server/XialitySMP.aternos.me/'
};

async function bypassSecurity() {
    try {
        // 1. LOGIN & INTENT PHASE
        const bodyParams = new URLSearchParams({
            user: credentials.user,
            password: credentials.password,
            ajax: '1'
        }).toString();

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
            
            res.on('data', () => {}); 
            res.on('end', () => {
                if (res.statusCode === 200 && rawCookies) {
                    const cookieStr = rawCookies.map(c => c.split(';')[0]).join('; ');

                    // 2. THE MECHANICAL SMASH PHASE (THE +1 BUTTON) 🎯
                    // We target the PHP script directly to bypass randomized IDs!
                    const extendUrl = new URL('https://aternos.org/panel/ajax/extend.php');
                    const extendReq = https.request(extendUrl, {
                        method: 'POST',
                        headers: { ...humanHeaders, 'Cookie': cookieStr }
                    }, (e) => {
                        let result = '';
                        e.on('data', (d) => result += d);
                        e.on('end', () => {
                            if (result.includes('true')) {
                                console.log("🎯 [+1] BUTTON SMASHED: XialitySMP SECURED!");
                            }
                        });
                    });
                    
                    // --- THE ACTUAL CLICK ---
                    // This is the signal the green button sends under the hood.
                    extendReq.write('action=extend&confirm=1'); 
                    extendReq.end();
                }
            });
        });

        req.on('error', (err) => {}); 
        req.write(bodyParams); 
        req.end(); 

    } catch (err) {
        // Sigma recovery logic for the A11 CPU
    }
}

// 3. THE 10ms GOD-MODE LOOP ⚡⚡⚡
function loop() {
    setTimeout(() => {
        bypassSecurity();
        loop();
    }, 10); // 10ms = ZERO LAG. Faster than 0:47 timer!
}

loop();

app.get('/', (req, res) => {
    res.send('<h1>XialitySMP: 10ms INJECTION ENGINE ACTIVE 🛡️</h1>');
});

app.listen(PORT, () => {
    console.log(`--- ENGINE ONLINE: 10ms GOD-SPEED ---`);
    console.log(`Target: XialitySMP | Device: Samsung A11 | Status: SIGMA`);
});
