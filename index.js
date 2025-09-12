const express = require('express');
const fetch = require('node-fetch');
const app = express();

const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';

app.use(express.json());

app.get('/', async (req, res) => {
  const response = await fetch(GOOGLE_SCRIPT_URL);
  const data = await response.text();
  res.set('Content-Type', 'application/json');
  res.send(data);
});

app.post('/', async (req, res) => {
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  });
  const data = await response.text();
  res.send(data);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your proxy is listening on port ' + listener.address().port);
});