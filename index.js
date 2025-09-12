const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzB1Sj5PndlaVK_zE3gqbZLRCOwm-8o2ObkL4kk_cb__JGtC5Io5voPSIABIcpV85qz/exec'; // Replace with your actual Google Apps Script web app URL

// CORS setup: allow your GitHub Pages domain
app.use(cors({
  origin: 'https://sombounn.github.io' // use "*" for testing, but NOT recommended for production
}));

app.use(express.json());

// GET handler (fetch from Google Apps Script)
app.get('/', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);
    const data = await response.text();
    res.set('Content-Type', 'application/json');
    res.send(data);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch data' });
  }
});

// POST handler (forward POST body to Google Apps Script)
app.post('/', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(500).send({ error: 'Failed to post data' });
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your proxy is listening on port ' + listener.address().port);
});
