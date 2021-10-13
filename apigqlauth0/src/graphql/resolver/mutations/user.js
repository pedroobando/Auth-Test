const { AuthenticationError } = require('apollo-server-express');
const User = require('../../../mongodb/models/user');
const { createToken, cifrate, cifrateVerify } = require('../../../utils');

const mutationUser = {
  newUser: async (_, { input }) => {
    const { email, password } = input;

    // Revisar si el usuario existe
    const elEmail = email.toString().toLowerCase();
    const usuarioExiste = await User.findOne({ email: elEmail });
    if (usuarioExiste) {
      throw new Error(`El email ${elEmail} ya esta registrado.`);
    }
    try {
      input.email = email.toString().toLowerCase();
      input.password = await cifrate(password);

      const newUser = new User(input);
      newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(`Problema al registrar el usuario..!`);
    }
  },

  updateUser: async (_, { input }, ctx) => {
    if (!ctx.user) throw new AuthenticationError('not authenticated');
    const { sub: id } = ctx.user;

    let user = await User.findById(id);
    if (!user) throw new Error('Usuario no encontrado');

    try {
      if (typeof input.email !== 'undefined') input.email = input.email.toString().toLowerCase();
      input.updated_at = Date.now();
      user = await User.findOneAndUpdate(id, input, { new: true });
    } catch (error) {
      throw new Error('Error actualizando usuario.');
    }
    return user;
  },

  removeUser: async (_, {}, ctx) => {
    if (!ctx.user) throw new AuthenticationError('not authenticated');
    const { sub: id } = ctx.user;
    const user = await User.findById(id);

    if (!user) throw new Error('Usuario no encontrado');
    const { name } = user;
    await User.findByIdAndDelete(id);

    return `Usuario ${name} eliminado.`;
  },

  changeUserPassword: async (_, { input }, ctx) => {
    if (!ctx.user) throw new AuthenticationError('not authenticated');
    const { sub: id } = ctx.user;
    const { oldpassword, newpassword } = input;

    let existsUser = await User.findById(id);
    if (!existsUser) throw new Error('Usuario no encontrado');
    // Revisar si el password es correcto
    const passwordCorrecto = await cifrateVerify(oldpassword, existsUser.password);
    if (!passwordCorrecto) throw new Error('Password incorrecto');
    try {
      input.password = await cifrate(newpassword);
      input.updated_at = Date.now();

      existsUser = await User.findOneAndUpdate(id, input, { new: true });
    } catch (error) {
      console.log(error);
      throw new Error('Error cambiando password del usuario.');
    }
    return 'El cambio de contraseña ha sido exitoso.!';
  },

  authenticateRetToken: async (_, { input }) => {
    const { email, password } = input;
    // Si el usuario existe
    const existsUser = await User.findOne({ email });
    //console.log(email, existsUser.email);
    if (!existsUser) throw new Error(`Usuario no registrado..!`);
    // Revisar si el password es correcto
    const passwordCorrecto = await cifrateVerify(password, existsUser.password);
    if (!passwordCorrecto) throw new Error('Password incorrecto');
    // Crear el token
    return { token: createToken(existsUser) };
  },

  // authenticateRetUser: async (_, { input }) => {
  //   const { email, password } = input;
  //   // Si el usuario existe
  //   const existsUser = await User.findOne({ email });
  //   //console.log(email, existsUser.email);
  //   if (!existsUser) throw new Error(`Usuario no registrado..!`);
  //   // Revisar si el password es correcto
  //   const passwordCorrecto = await cifrateVerify(password, existsUser.password);
  //   if (!passwordCorrecto) throw new Error('Password incorrecto');

  //   return existsUser;
  // },
};

module.exports = mutationUser;
