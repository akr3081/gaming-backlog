const axios = require('axios');
const { getHeaders } = require('./Headers');

const SEARCH_URL = 'https://backend.metacritic.com/finder/metacritic/autosuggest';
const DETAILS_URL = 'https://backend.metacritic.com/composer/metacritic/pages/games';

const search = async (searchTerm) => {
  const url = `${SEARCH_URL}/${searchTerm}`;
  const headers = getHeaders('https://www.metacritic.com');

  console.log(`Metacritic Search request at '${url}'...`);
  try {
    const result = await axios.get(url, {
      headers,
      timeout: 3000,
    });
    return result.data;
  } catch (error) {
    throw new Error(`Metacritic Search Error - ${error}`);
  }
};

const details = async (game_id) => {
  const url = `${DETAILS_URL}/${game_id}/web`;
  const headers = getHeaders('https://www.metacritic.com');

  console.log(`Metacritic Details request at '${url}'...`);

  try {
    const result = await axios.get(url, {
      headers,
      timeout: 30000,
    });
    return result.data;
  } catch (error) {
    throw new Error(`Metacritic Details Error - ${error}`);
  }
};

module.exports = {
  search,
  details,
};
