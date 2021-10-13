const mutationUser = require('./mutations/user');
const mutationCondomi = require('./mutations/condominio');
const mutationProperty = require('./mutations/property');
const mutationExpense = require('./mutations/expense');
const mutationConceptExpense = require('./mutations/conceptexpense');

const mutations = {
  Mutation: {
    ...mutationUser,
    ...mutationCondomi,
    ...mutationProperty,
    ...mutationExpense,
    ...mutationConceptExpense,
  },
};

module.exports = mutations;
