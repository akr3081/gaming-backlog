const express = require('express');
const app = express();

app.use('/hltb', require('../controllers/HLTBController.js'));
app.use('/metacritic', require('../controllers/MetacriticController.js'));

app.get('/heartbeat', (req, res) => {
  return res.json({
    status: 200,
    data: `Gaming Backlog service - ${new Date().toLocaleString()}`,
  });
});

app.get('*', (req, res) => {
  return res.json({ status: 404, data: 'Invalid Route' });
});

app.listen(3000, () => console.log('Gaming Backlog service started on port 3000...'));
module.exports = app;
