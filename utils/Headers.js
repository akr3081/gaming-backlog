const UserAgent = require('user-agents');

const getHeaders = (origin) => ({
  'User-Agent': new UserAgent().toString(),
  'content-type': 'application/json',
  origin: origin,
  referer: origin,
});

module.exports = {
  getHeaders,
};
