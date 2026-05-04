const express = require('express');
const https = require('https');
const { URL } = require('url');
const app = express();
const PORT = process.env.PORT || 3000;

const credentials = {
    user: process.env.ATERNOS_USER,
    password: process.env.ATERNOS_PASSWORD
};

// Sigma Stealth Headers - Rotating these stops the "chopped" vibe
const getHeaders = () => ({
    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; SM-A115F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
    'Referer': 'https://aternos.org/server/XialitySMP.aternos.me',
    'Origin': 'https://aternos.org',
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest'
});

async function stealthPulse() {
    // Sigma Jitter: Randomly wait 30-60 seconds so Aternos doesn't flag the "bot" pattern
    const jitter = Math.floor(Math.random() * 30000);
    setTimeout(async () => {
        console.log("--- 1,000,000/10 STEALTH BYPASS START ---");
        
        const loginData = `user=${encodeURIComponent(credentials.user)}&password=${encodeURIComponent(credentials.password)}`;
        
        const options = {
            hostname: 'aternos.org',
            path: '/panel/ajax/login.php',
            method: 'POST',
            headers: { ...getHeaders(), 'Content-Length': Buffer.byteLength(loginData) }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (d) => body += d);
            res.on('end', () => {
                console.log("Stealth Pulse Delivered to XialitySMP! 🧤🛡️");
                // After login, we hit the extend endpoint directly
                const extendOptions = {
                    hostname: 'aternos.org',
                    path: '/panel/ajax/extend.php',
                    method: 'POST',
                    headers: getHeaders()
                };
                https.request(extendOptions, (e) => e.on('data', () => {})).end();
            });
        });

        req.on('error', () => console.log("Security garbage tried to chop us. 🤮"));
        req.write(loginData);
        req.end();
        
        // Loop the pulse
        stealthPulse();
    }, 30000 + jitter);
}

// Start the Sigma Engine
stealthPulse();

app.get('/', (req, res) => res.send('<h1>XialitySMP 24/7: STEALTH BYPASS ACTIVE 🛡️</h1>'));
app.listen(PORT, () => console.log(`Engine running on ${PORT}. No warnings, pure Sigma. 🧤`));
