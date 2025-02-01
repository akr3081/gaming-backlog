const express = require('express');

const hltb = require('../utils/HowLongToBeat');
const app = express();

app.get('/heartbeat', (req, res) => {
  res.json({
    status: 200,
    data: `Gaming Backlog service - ${new Date().toLocaleString()}`,
  });
});

app.get('/search', (req, res) => {
  const searchTerm = req?.query?.searchTerm;
  if (!searchTerm) {
    return res.json({
      status: 400,
      data: `Query param 'searchTerm' is required`,
    });
  }

  hltb
    .search(searchTerm)
    .then((result) => {
      const gameId = result?.data?.[0]?.game_id;

      if (!gameId) {
        return res.json({
          status: 404,
          data: `Game not found for searchTerm '${searchTerm}'`,
        });
      } else {
        return gameId;
      }
    })
    .then((result) => {
      hltb.details(result).then((result) => {
        return res.json({
          status: 200,
          data: result,
        });
      });
    })
    .catch((error) => {
      return res.json({
        status: 500,
        error: `Gaming Backlog Search Error - ${error}`,
      });
    });
});

app.get('*', (req, res) => {
  res.json({ status: 404, data: 'Invalid Route' });
});

app.listen(3000, () =>
  console.log('Gaming Backlog service started on port 3000...')
);
module.exports = app;
