const { ConceptGroupsExpense, ConceptExpense } = require('../../../mongodb/models/conceptgroup');

const { AuthenticationError, ApolloError } = require('apollo-server-express');
const { isUserAuthenticate, isExistsCondominio } = require('../middleware');

const querys = {
  getConceptGroupExpenses: async (_, { condid }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    const existsConceptGroups = await ConceptGroupsExpense.find({ condominioId: condid });
    return existsConceptGroups;
  },

  getConceptGroupExpense: async (_, { condid, id }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);

    const existsConceptGroup = await ConceptGroupsExpense.findById(id);
    if (!existsConceptGroup) throw new ApolloError('El grupo del conceptos, no fue localizado.');
    try {
      return existsConceptGroup;
    } catch (error) {
      console.log(error);
      throw new ApolloError('Error en obtener datos de los grupos');
    }
  },

  getConceptExpensesByCond: async (_, { condid }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    const existsConcepts = await ConceptExpense.find({ condominioId: condid });
    return existsConcepts;
  },

  getConceptExpensesByGroup: async (_, { groupid }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    const existsConcepts = await ConceptExpense.find({ conceptGroupId: groupid });
    return existsConcepts;
  },

  getConceptExpense: async (_, { condid, id }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);

    const existsConcept = await ConceptExpense.findById(id);
    if (!existsConcept) throw new ApolloError('El concepto, no fue localizado.');
    try {
      return existsConcept;
    } catch (error) {
      console.log(error);
      throw new ApolloError('Error en obtener datos del concepto');
    }
  },

  // getCondominiosbyUser: async (_, {}, ctx) => {
  //   if (!ctx.user) throw new AuthenticationError('not authenticated');
  //   const { sub: userId } = ctx.user;

  //   try {
  //     const listCondominios = await Condominio.find({ user_at: userId });
  //     return [...listCondominios];
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApolloError('Error en obtener datos de los Condominios');
  //   }
  // },
};

module.exports = querys;
