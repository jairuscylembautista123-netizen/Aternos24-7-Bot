// 1. THE NUCLEAR SUPPRESSOR - Force Node to ignore the "stinky" warnings 🧤
process.env.NODE_NO_WARNINGS = '1';
process.removeAllListeners('warning');

const express = require('express');
const https = require('https');
// We are importing the modern URL tools to kill the bootloop 🛡️
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
        console.log("--- 1,000,000/10 SIGMA PULSE: NO PARSE MODE ---");
        
        // Using WHATWG API - No more "stinky" url.parse() bootloops! 🧪
        const bodyParams = new URLSearchParams({
            user: credentials.user,
            password: credentials.password,
            ajax: '1'
        }).toString();

        const options = {
            hostname: 'aternos.org',
            port: 443,
            path: '/panel/ajax/login.php',
            method: 'POST',
            headers: { 
                ...humanHeaders, 
                'Content-Length': Buffer.byteLength(bodyParams) 
            }
        };

        const req = https.request(options, (res) => {
            const cookies = res.headers['set-cookie'];
            
            res.on('data', () => {});
            res.on('end', () => {
                if (res.statusCode === 200 && cookies) {
                    // Mapping cookies the Sigma way 🧤
                    const cookieStr = cookies.map(c => c.split(';')[0]).join('; ');
                    console.log("Login Secured. No security garbage detected! 🛡️");
                    
                    // The Extend Pulse
                    const extendReq = https.request({
                        hostname: 'aternos.org',
                        path: '/panel/ajax/extend.php',
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

// Random Interval (45-75s) for stealth
function startPulse() {
    const jitter = 45000 + Math.random() * 30000;
    setTimeout(() => {
        bypassSecurity();
        startPulse();
    }, jitter);
}

startPulse();

app.get('/', (req, res) => res.send('<h1>XialitySMP: ANTI-BOOTLOOP SIGMA ACTIVE 🛡️</h1>'));
app.listen(PORT, () => console.log(`Engine Online on Port ${PORT}. TikTok brainrot deleted! 💀`));
