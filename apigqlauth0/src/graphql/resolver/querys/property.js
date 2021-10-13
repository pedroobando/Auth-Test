const { Property, PropertyGroup } = require('../../../mongodb/models/property');
const { AuthenticationError, ApolloError } = require('apollo-server-express');
const { isUserAuthenticate, isExistsCondominio } = require('../middleware');

const querys = {
  getProperties: async (_, { condid }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    try {
      const listProperties = await Property.find({ condominioId: condid.toString() });
      return listProperties;
    } catch (error) {
      throw new ApolloError('Error en obtener datos de los Propietarios');
    }
  },

  getProperty: async (_, { id }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    try {
      const property = await Property.findById(id);
      return property;
    } catch (error) {
      throw new ApolloError('Error en obtener datos de los Propietarios');
    }
  },

  getPropertyGroup: async (_, { id }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    try {
      return await PropertyGroup.findById(id);
    } catch (error) {
      throw new ApolloError('Error en obtener datos de los Grupos de propietarios');
    }
  },

  getPropertyGroupByCond: async (_, { condid }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    try {
      return await PropertyGroup.find({ condominioId: condid });
    } catch (error) {
      throw new ApolloError('Error en obtener datos de los Grupos de propietarios');
    }
  },
};

module.exports = querys;
