const express = require('express');
const https = require('https');
const { URL, URLSearchParams } = require('url'); 
const app = express();
const PORT = process.env.PORT || 3000;

// CPU-Locked Credentials from your Render Env
const credentials = {
    user: process.env.ATERNOS_USER,
    password: process.env.ATERNOS_PASSWORD
};

// Sigma Fingerprint for the Galaxy A11 (Android 12) rig
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
        const bodyParams = new URLSearchParams({
            user: credentials.user,
            password: credentials.password,
            ajax: '1'
        }).toString();

        const loginUrl = new URL('https://aternos.org/panel/ajax/login.php');

        const options = {
            method: 'POST', // Node stream requires POST for the .write() method
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
                    
                    // THE +1 CLUTCH PULSE
                    const extendUrl = new URL('https://aternos.org/panel/ajax/extend.php');
                    const extendReq = https.request(extendUrl, {
                        method: 'POST',
                        headers: { ...humanHeaders, 'Cookie': cookieStr }
                    }, (e) => {
                        let result = '';
                        e.on('data', (d) => result += d);
                        e.on('end', () => {
                            // Only logging successful pings to avoid crashing the A11 console at 10ms!
                            if (result.includes('true')) {
                                console.log("✅ [+1] BUTTON SMASHED AT GOD-SPEED!");
                            }
                        });
                    });
                    extendReq.end();
                }
            });
        });

        req.on('error', (err) => {}); // Silencing errors to maintain 10ms speed
        
        // THE ACTUAL TRUTH WRITE METHOD 🧤
        req.write(bodyParams); 
        req.end(); 

    } catch (err) {
        // Recovery logic for the Sigma CPU
    }
}

// THE ULTIMATE 10ms GOD-MODE LOOP ⚡⚡⚡
function loop() {
    const godDelay = 10; 
    setTimeout(() => {
        bypassSecurity();
        loop();
    }, godDelay);
}

loop();

app.get('/', (req, res) => {
    res.send('<h1>XialitySMP: 10ms GOD-MODE ACTIVE 🛡️</h1><p>TikTok brainrot: BANNED</p>');
});

app.listen(PORT, () => {
    console.log(`--- ENGINE ONLINE: 10ms HYPER-PULSE ---`);
    console.log(`Target: XialitySMP | Device: Galaxy A11 | Status: SIGMA`);
});
