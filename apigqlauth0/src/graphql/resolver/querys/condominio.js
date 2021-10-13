const Condominio = require('../../../mongodb/models/condominio');
const { AuthenticationError, ApolloError } = require('apollo-server-express');
const { isUserAuthenticate, isExistsCondominio } = require('../middleware');

const querys = {
  getCondominio: async (_, { id }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    const existCondominio = await isExistsCondominio(id);
    return existCondominio;
  },

  getCondominios: async (_, {}, ctx) => {
    console.log(ctx);
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);

    try {
      let listCondominio = [];
      listCondominio = activeUser.condominios.map(
        async (cond) => await Condominio.findById(cond.id)
      );

      return [...listCondominio];
    } catch (error) {
      console.log(error);
      throw new ApolloError('Error en obtener datos de los Condominios');
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
