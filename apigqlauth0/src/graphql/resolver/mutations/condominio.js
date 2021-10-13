const { EnumUserRoll } = require('../../enumTypes');
const User = require('../../../mongodb/models/user');
const Condominio = require('../../../mongodb/models/condominio');
const { ApolloError } = require('apollo-server-express');
const { validEmail } = require('../../../utils');

const { isExistsCondominio, isUserAdministrator, isUserAuthenticate } = require('../middleware');

const mutation = {
  newCondominio: async (_, { input }, ctx) => {
    console.log(ctx);
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);

    const { email } = input;
    if (!validEmail(email)) throw new Error(`Direccion email ${email} no valida.`);

    try {
      input.email = email.toString().toLowerCase();
      input.user_at = activeUserId;

      const newCondominio = new Condominio(input);
      await newCondominio.validate();
      await newCondominio.save();

      activeUser.condominios.push({
        _id: newCondominio.id,
        roll: EnumUserRoll.ADMIN,
        user_at: activeUserId,
        updated_at: Date.now(),
      });
      await User.findByIdAndUpdate(activeUserId, activeUser, { new: true });

      return newCondominio;
    } catch (error) {
      throw new Error(`Problema al ingresar los datos del condominio..!`);
    }
  },

  updateCondominio: async (_, { id, input }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(id);
    isUserAdministrator(activeUser, existsCondominio.id);

    const { email } = input;
    if (!validEmail(email)) throw new Error(`Direccion email ${email} no valida.`);
    try {
      input.email = email.toString().toLowerCase();
      input.user_at = activeUserId;
      input.updated_at = Date.now();
      const condominio = await Condominio.findByIdAndUpdate(id, input, { new: true });
      return condominio;
    } catch (error) {
      throw new Error(`Problemas al guardar los datos..!`);
    }
  },

  removeCondominio: async (_, { id }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(id);
    isUserAdministrator(activeUser, existsCondominio.id);

    const { name } = existsCondominio.name;
    try {
      await Condominio.findByIdAndDelete(id, {}, async (err, doc) => {
        if (err) new Error(`Problemas al eliminar el condominio`);
        // console.log(doc);
        activeUser.condominios.id(doc.id).remove();
        await User.findByIdAndUpdate(activeUserId, activeUser, { new: true });
        // await Property.deleteMany((prop) => prop.condominioId.toString() === doc.id.toString());

        // return `${doc.name} eliminado. promise`;
      });
      return `${name} eliminado.`;
    } catch (error) {
      throw new Error(`Problema al eliminar los datos..!`);
    }
  },

  newCondUser: async (_, { condid, input }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    let existsCondominio = await isExistsCondominio(condid);
    isUserAdministrator(activeUser, existsCondominio.id);

    const { userId, roll } = input;
    const theUserCondominio = await User.findById(userId.toString());
    const existsInCondominio = theUserCondominio.condominios.id(condid.toString());
    if (existsInCondominio) throw new ApolloError('Usuario ya registrado en el condominio');

    try {
      theUserCondominio.condominios.push({
        _id: condid,
        roll,
        user_at: activeUserId,
        updated_at: Date.now(),
      });

      const addUserCond = await User.findByIdAndUpdate(userId, theUserCondominio, {
        new: true,
      });

      return { ...addUserCond._doc, roll: input.roll, id: addUserCond._doc._id };
    } catch (error) {
      throw new Error(`Problema al ingresar los datos..!`);
    }
  },

  updateCondUser: async (_, { condid, input }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    let existsCondominio = await isExistsCondominio(condid);
    isUserAdministrator(activeUser, existsCondominio.id);

    const { userId, roll } = input;
    const theUserCondominio = await User.findById(userId);
    const existsInCondominio = theUserCondominio.condominios.id(condid.toString());
    if (!existsInCondominio) throw new ApolloError('Usuario no esta registrado en el condominio');

    try {
      theUserCondominio.condominios.id(condid).roll = roll;
      theUserCondominio.condominios.id(condid).user_at = activeUserId;
      theUserCondominio.condominios.id(condid).updated_at = Date.now();

      const updUserCond = await User.findByIdAndUpdate(userId, theUserCondominio, {
        new: true,
      });
      return { ...updUserCond._doc, roll: input.roll, id: updUserCond._doc._id };
    } catch (error) {
      throw new Error(`Problema al actualizar los datos de usuario en condominio.!`);
    }
  },

  removeCondUser: async (_, { condid, id }, ctx) => {
    const { activeUser } = await isUserAuthenticate(ctx);
    let existsCondominio = await isExistsCondominio(condid);
    isUserAdministrator(activeUser, existsCondominio.id);

    const theUserCondominio = await User.findById(id.toString());
    const existsInCondominio = theUserCondominio.condominios.id(condid.toString());
    if (!existsInCondominio) throw new ApolloError('Usuario no esta registrado en el condominio');

    try {
      theUserCondominio.condominios.id(condid).remove();
      const condominio = await User.findByIdAndUpdate(id, theUserCondominio, {
        new: true,
      });
      return `Usuario ${theUserCondominio.name} fue removido del condominio`;
    } catch (error) {
      throw new Error(`Problema al eliminar los datos..!`);
    }
  },
};

module.exports = mutation;
