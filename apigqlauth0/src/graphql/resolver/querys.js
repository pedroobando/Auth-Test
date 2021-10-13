const queryUser = require('./querys/user');
const queryCondomin = require('./querys/condominio');
const queryProperty = require('./querys/property');
const queryConcepts = require('./querys/conceptexpense');

const querys = {
  Query: {
    ...queryUser,
    ...queryCondomin,
    ...queryProperty,
    ...queryConcepts,
  },
};

module.exports = querys;
