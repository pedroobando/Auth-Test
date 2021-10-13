const query = require('./querys');
const mutations = require('./mutations');
const type = require('./types');

const resolvers = {
  ...query,
  ...mutations,
  ...type,
};

module.exports = resolvers;
