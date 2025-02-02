const MetacriticController = require('express').Router();
const metacritic = require('../utils/Metacritic');

MetacriticController.get('/', (req, res) => {
  const searchTerm = req?.query?.searchTerm;
  metacritic
    .search(searchTerm)
    .then((result) => {
      const gameId = result?.data?.items?.[0]?.slug;
      if (!gameId) {
        return res.json({
          status: 404,
          data: `Game not found with searchTerm '${searchTerm}'`,
        });
      } else {
        return gameId;
      }
    })
    .then((result) => {
      metacritic.details(result).then((result) => {
        return res.json({
          status: 200,
          data: result,
        });
      });
    })
    .catch((error) => {
      return res.json({
        status: 500,
        data: `Gaming Backlog metacritic error - ${error}`,
      });
    });
});

MetacriticController.get('/search', (req, res) => {
  const searchTerm = req?.query?.searchTerm;

  metacritic
    .search(searchTerm)
    .then((result) => {
      return res.json({
        status: 200,
        data: result.data,
      });
    })
    .catch((error) => {
      return res.json({
        status: 500,
        data: `Gaming Backlog metacritic error - ${error}`,
      });
    });
});

MetacriticController.get('/game', (req, res) => {
  const gameId = req?.query?.gameId;

  if (!gameId) {
    return res.json({
      status: 400,
      data: 'Query param gameId required',
    });
  }

  metacritic
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
        data: `Gaming Backlog metacritic error - ${error}`,
      });
    });
});

module.exports = MetacriticController;
