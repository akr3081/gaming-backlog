const HLTBController = require('express').Router();
const hltb = require('../utils/howLongToBeat');

HLTBController.get('/', (req, res) => {
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
      // Expand this to check for more than one result
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

HLTBController.get('/search', (req, res) => {
  const searchTerm = req?.query?.searchTerm;
  if (!searchTerm) {
    return res.json({
      status: 404,
      data: `Query param 'searchTerm' is required`,
    });
  }

  hltb
    .search(searchTerm)
    .then((result) => {
      return res.json({
        status: 200,
        data: result,
      });
    })
    .catch((error) => {
      return res.json({
        status: 500,
        error: `HLTB Search Error - ${error}`,
      });
    });
});

HLTBController.get('/game', (req, res) => {
  const gameId = req?.query?.gameId;
  if (!gameId) {
    return res.json({
      status: 400,
      data: `Query param 'gameId' is required`,
    });
  }

  hltb
    .details(gameId)
    .then((result) => {
      return res.json({
        status: 200,
        data: result,
      });
    })
    .catch((error) => {
      return res.json({
        status: 500,
        error: `HLTB Game Error - ${error}`,
      });
    });
});

module.exports = HLTBController;
