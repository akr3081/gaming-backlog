const express = require('express');
const app = express();
const hltb = require('../utils/howLongToBeat');
const metacritic = require('../utils/metacritic');
const { tranformDetailsData } = require('../utils/transformers');

app.use('/metacritic', require('../controllers/MetacriticController.js'));
app.use('/hltb', require('../controllers/HLTBController.js'));

app.get('/search', async (req, res) => {
  const searchTerm = req?.query?.searchTerm;
  if (!searchTerm) {
    return res.json({
      status: 400,
      data: `Query param 'searchTerm' is required`,
    });
  }
  try {
    const hltbSearchResults = await hltb.search(searchTerm);
    const hltbGameDetails = await hltb.details(hltbSearchResults.data[0].game_id);

    // FIXME - For now we are assuming hltb title gives same game from metacritic search.
    const title = hltbGameDetails.name;

    const metacriticSearchResults = await metacritic.search(title);

    // FIXME: We may be able to skip this call if extra data is not needed
    const metacriticGameDetails = await metacritic.details(metacriticSearchResults.data.items[0].slug);

    const transformedData = tranformDetailsData({ hltbData: hltbGameDetails, metacriticData: metacriticGameDetails });

    return res.json({
      status_code: 200,
      data: transformedData,
    });
  } catch (error) {
    return res.json({
      status_code: 500,
      data: `Something went wrong ${error}`,
    });
  }
});

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
