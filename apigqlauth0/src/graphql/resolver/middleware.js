const User = require('../../mongodb/models/user');
const { EnumUserRoll } = require('../enumTypes');
const Condominio = require('../../mongodb/models/condominio');
const { Property } = require('../../mongodb/models/property');
const ConceptGroupExp = require('../../mongodb/models/conceptgroup');
const { AuthenticationError, ApolloError } = require('apollo-server-express');

const messageErrorAuthorization = 'Usuario no autorizado..!';

const isUserAuthenticate = async (context) => {
  if (!context.user) throw new AuthenticationError('not authenticated');
  const { id: activeUserId } = context.user;

  let activeUser = await User.findById(activeUserId);
  if (!activeUser) throw new ApolloError('Usuario no encontrado.');

  return { activeUserId, activeUser };
};

const isExistsCondominio = async (condominioId) => {
  const theCondominio = await Condominio.findById(condominioId);
  if (!theCondominio) throw new Error('Registro del condominio no encontrado');
  return theCondominio;
};

const isUserAdministrator = (activeUser, condominioId) => {
  const existsUserAdmin = activeUser.condominios.id(condominioId);

  if (existsUserAdmin.roll !== EnumUserRoll.ADMIN)
    throw new ApolloError(messageErrorAuthorization, '403');
  // console.log(existsUserAdmin.roll);
  return true;
};

const isExistsConceptGroupExp = async (condominioId, conceptGroupId) => {
  const existsConceptGroups = await ConceptGroupExp.findOne({ condominioId: condominioId });
  if (!existsConceptGroups) throw new Error('Grupos para el condominio, no han sido creados');

  const oneConceptGroup = existsConceptGroups.conceptGroups.id(conceptGroupId);
  if (!oneConceptGroup) throw new Error('Problemas al localizar el grupo.');

  const existsCondominio = await Condominio.findById(condominioId);
  return { existsCondominio, existsConceptGroups };
};

const isUserExistsCondominio = (userId, theCondominio) => {
  const userExists = theCondominio.users.find(
    (user) => user.userId.toString() === userId.toString()
  );
  if (userExists) throw new ApolloError('Usuario ya registrado en condominio');
  return userExists;
};

const isPropertyExistsCondominio = async (inmuebleName, condominioId, id = undefined) => {
  const propertyExists = await Property.findOne({ inmuebleName, condominioId });
  console.log(id, propertyExists.id);
  if (
    (propertyExists && typeof id === 'undefined') ||
    (propertyExists && typeof id !== 'undefined' && propertyExists.id !== id)
  )
    throw new ApolloError(`Inmueble ${inmuebleName}, ya ingresado.`);

  return propertyExists;
};

module.exports = {
  isExistsCondominio,
  isExistsConceptGroupExp,
  isPropertyExistsCondominio,
  isUserAdministrator,
  isUserAuthenticate,
  isUserExistsCondominio,
};
