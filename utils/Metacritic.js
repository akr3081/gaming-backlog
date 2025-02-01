const axios = require('axios');
const UserAgent = require('user-agents');

const SEARCH_URL = 'https://backend.metacritic.com/finder/metacritic/autosuggest';
const DETAILS_URL = 'https://backend.metacritic.com/composer/metacritic/pages/games';

const search = async (searchTerm) => {
  const url = `${SEARCH_URL}/${searchTerm}`;

  const headers = {
    'User-Agent': new UserAgent().toString(),
    'content-type': 'application/json',
    origin: 'https://www.metacritic.com',
    referer: 'https://www.metacritic.com/',
  };

  console.log(`Metacritic Search request at ${url}...`);

  try {
    const result = await axios.get(url, {
      headers,
      timeout: 30000,
    });
    return result.data;
  } catch (error) {
    throw new Error('Search');
  }
};

const details = async (game_id) => {
  const url = `${DETAILS_URL}/${game_id}/web`;

  const headers = {
    'User-Agent': new UserAgent().toString(),
    'content-type': 'application/json',
    origin: 'https://www.metacritic.com',
    referer: 'https://www.metacritic.com/',
  };

  console.log(`Metacritic Details request at ${url}...`);

  try {
    const result = await axios.get(url, {
      headers,
      timeout: 30000,
    });
    return result.data;
  } catch (error) {
    throw new Error('Details');
  }
};

module.exports = {
  search,
  details,
};
