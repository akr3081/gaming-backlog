const axios = require('axios');
const hltb = require('howlongtobeat');
const { getHeaders } = require('./headers');

const hltbService = new hltb.HowLongToBeatService();

const SEARCH_URL = `https://howlongtobeat.com/api/s`;

const defaultPayload = {
  searchType: 'games',
  searchTerms: [],
  searchPage: 1,
  size: 20,
  searchOptions: {
    games: {
      userId: 0,
      platform: '',
      sortCategory: 'popular',
      rangeCategory: 'main',
      rangeTime: { min: null, max: null },
      gameplay: { perspective: '', flow: '', genre: '', difficulty: '' },
      rangeYear: { min: '', max: '' },
      modifier: '',
    },
    users: { sortCategory: 'postcount' },
    lists: { sortCategory: 'follows' },
    filter: '',
    sort: 0,
    randomizer: 0,
  },
  useCache: true,
};

// Search function had to be rebuilt from scratch since HLTB library is outdated
const search = async (searchTerm) => {
  const search = { ...defaultPayload, searchTerms: [searchTerm] };
  const url = `${SEARCH_URL}/5b26492381a39f41`;
  const headers = getHeaders('https://howlongtobeat.com');

  console.log(`HLTB Search request at ${url}...`);

  try {
    const result = await axios.post(url, search, {
      headers,
      timeout: 30000,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};

const details = async (gameId) => {
  try {
    console.log(`Fetching game results for ${gameId}...`);
    const result = await hltbService.detail(gameId);
    return result;
  } catch (error) {
    throw new Error(`HLTB details error - ${error}`);
  }
};

module.exports = {
  search,
  details,
};
