// 1. THE NUCLEAR SUPPRESSOR - Kills the "gugugaga" warnings 🧤
process.env.NODE_NO_WARNINGS = '1';
process.removeAllListeners('warning');

const express = require('express');
const https = require('https');
const { URLSearchParams } = require('url'); 
const app = express();
const PORT = process.env.PORT || 3000;

// Credentials from your Render Environment Variables
const credentials = {
    user: process.env.ATERNOS_USER,
    password: process.env.ATERNOS_PASSWORD
};

// Sigma Human Headers for your Samsung Galaxy A11 (Android 12)
const humanHeaders = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; SM-A115F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'en-PH,en-US;q=0.9,en;q=0.8',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'Origin': 'https://aternos.org',
    'Referer': 'https://aternos.org/server/XialitySMP.aternos.me/'
};

async function bypassSecurity() {
    console.log("--- 1,000,000/10 SIGMA PULSE: START ---");
    
    // Modern Params (No url.parse() garbage)
    const params = new URLSearchParams();
    params.set('user', credentials.user);
    params.set('password', credentials.password);
    params.set('ajax', '1');
    const loginData = params.toString();

    const options = {
        hostname: 'aternos.org',
        path: '/panel/ajax/login.php',
        method: 'POST',
        headers: { ...humanHeaders, 'Content-Length': Buffer.byteLength(loginData) }
    };

    const req = https.request(options, (res) => {
        // SECURING THE ACTUAL TRUTH COOKIE
        const rawCookies = res.headers['set-cookie'];
        
        res.on('data', () => {});
        res.on('end', () => {
            if (res.statusCode === 200 && rawCookies) {
                const cookieString = rawCookies.map(c => c.split(';')[0]).join('; ');
                console.log("Login Pulse Delivered. Cookie Secured! 🛡️");
                
                // THE BYPASS: Smashing the +1 button with the session cookie
                const extendReq = https.request({
                    hostname: 'aternos.org',
                    path: '/panel/ajax/extend.php',
                    method: 'POST',
                    headers: { ...humanHeaders, 'Cookie': cookieString }
                }, (e) => {
                    let result = '';
                    e.on('data', (d) => result += d);
                    e.on('end', () => {
                        console.log("Extend Result:", result); // Should show the true bypass status!
                        console.log("XialitySMP Status: 1,000,000/10 VIBE CHECKED. 🔥");
                    });
                });
                extendReq.end();
            } else {
                console.log("Aternos chopped the pulse. Status:", res.statusCode);
            }
        });
    });

    req.on('error', () => console.log("Security wall acting like a looser. 🤮"));
    req.write(loginData);
    req.end();
}

// Random Interval (35-65s) to stay Sigma Stealth
function startLoop() {
    const jitter = 35000 + Math.random() * 30000;
    setTimeout(() => {
        bypassSecurity();
        startLoop();
    }, jitter);
}

startLoop();

app.get('/', (req, res) => res.send('<h1>XialitySMP 24/7: FULL SIGMA BYPASS ACTIVE 🧤</h1>'));
app.listen(PORT, () => console.log(`Engine Online on Port ${PORT}. Axios and TikTok garbage deleted! 💀`));
