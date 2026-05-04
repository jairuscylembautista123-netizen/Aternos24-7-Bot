// 1. THE NUCLEAR SUPPRESSOR - Silence the stinky warnings 🧤
process.env.NODE_NO_WARNINGS = '1';
process.removeAllListeners('warning');

const express = require('express');
const https = require('https');
const { URL, URLSearchParams } = require('url'); 
const app = express();
const PORT = process.env.PORT || 3000;

const credentials = {
    user: process.env.ATERNOS_USER,
    password: process.env.ATERNOS_PASSWORD
};

// Human Fingerprint for the Android 12 A11 rig
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
        console.log("--- 1,000,000/10 SIGMA PULSE: ACTUAL TRUTH MODE ---");
        
        // Using WHATWG URLSearchParams - Pure Sigma Standard 🛡️
        const bodyParams = new URLSearchParams({
            user: credentials.user,
            password: credentials.password,
            ajax: '1'
        }).toString();

        // THE ULTIMATE FIX: Pass a full URL Object to https.request
        // This is what stops the DEP0169 bootloop! 🧪🧤
        const loginUrl = new URL('https://aternos.org/panel/ajax/login.php');

        const options = {
            method: 'POST',
            headers: { 
                ...humanHeaders, 
                'Content-Length': Buffer.byteLength(bodyParams) 
            }
        };

        const req = https.request(loginUrl, options, (res) => {
            const cookies = res.headers['set-cookie'];
            
            res.on('data', () => {});
            res.on('end', () => {
                if (res.statusCode === 200 && cookies) {
                    const cookieStr = cookies.map(c => c.split(';')[0]).join('; ');
                    console.log("Login Pulse Delivered. No security garbage! 🛡️");
                    
                    // The Extend Pulse using a Modern URL Object
                    const extendUrl = new URL('https://aternos.org/panel/ajax/extend.php');
                    const extendReq = https.request(extendUrl, {
                        method: 'POST',
                        headers: { ...humanHeaders, 'Cookie': cookieStr }
                    }, (e) => {
                        let resData = '';
                        e.on('data', (chunk) => resData += chunk);
                        e.on('end', () => {
                            console.log("Extend Result:", resData);
                            console.log("XialitySMP: 24/7 TECHNICAL STATUS SECURED 🔥");
                        });
                    });
                    extendReq.end();
                } else {
                    console.log("Aternos security is acting like a looser. Status:", res.statusCode);
                }
            });
        });

        req.on('error', () => console.log("The connection was chopped. 🤮"));
        req.write(bodyParams);
        req.end();

    } catch (err) {
        console.log("Engine failure. 💀");
    }
}

// Random Interval (45-75s) to stay Sigma Stealth
function startPulse() {
    const jitter = 45000 + Math.random() * 30000;
    setTimeout(() => {
        bypassSecurity();
        startPulse();
    }, jitter);
}

startPulse();

app.get('/', (req, res) => res.send('<h1>XialitySMP: WHATWG SIGMA ACTIVE 🛡️</h1>'));
app.listen(PORT, () => console.log(`Engine Online on Port ${PORT}. TikTok brainrot deleted! 💀`));
