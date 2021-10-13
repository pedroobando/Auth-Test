// const Condominio = require('../../../mongodb/models/condominio');
const { AuthenticationError, ApolloError } = require('apollo-server-express');

const querys = {
  getUser: async (_, {}, ctx) => {
    if (!ctx.user) throw new AuthenticationError('not authenticated');
    const { email } = ctx.user;

    const existsUser = await User.findOne({ email });
    if (!existsUser) throw new ApolloError(`Usuario no localizado..!`);
    return existsUser;
  },

  getUsers: async (_, {}, ctx) => {
    if (!ctx.user) throw new AuthenticationError('not authenticated');
    const getsUser = await User.findOne({ email: ctx.user.email });

    const listUsers = await User.find({});
    const retlistUsers = listUsers.map((item) => ({
      ...item._doc,
      id: item._doc._id,
      owner: getsUser.id.toString() !== item._doc._id.toString() ? 'false' : 'true',
    }));

    return [...retlistUsers];
  },
};

module.exports = querys;
