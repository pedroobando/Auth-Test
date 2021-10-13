const dotEnv = require('dotenv');
dotEnv.config('.env.local');

const express = require('express');
//const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const connectDb = require('./mongodb/connectdb');

const _typeDefs = require('./graphql/schema');
const _resolvers = require('./graphql/resolver');
const { authenticationUser, isTokenValid, verifyToken } = require('./utils');

const expressPlayGround = require('graphql-playground-middleware-express').default;

connectDb();

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: async ({ req, ...rest }) => {
//     let isAuthenticated = false;
//     try {
//       const authHeader = req.headers.authorization || "";
//       if (authHeader) {
//         const token = authHeader.split(" ")[1];
//         const payload = await verifyToken(token);
//         isAuthenticated = payload && payload.sub ? true : false;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//     return { ...rest, req, auth: { isAuthenticated } };
//   },
// });

const startApolloServer = async (typeDefs, resolvers) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: ({ req,  }) => {
    //   const token = req.headers.authorization || '';
    //   return isTokenValid(token);
    // },
    context: async ({ req, ...rest }) => {
      let isAuthenticated = false;
      try {
        const authHeader = req.headers.authorization || '';
        if (authHeader) {
          const token = authHeader.split(' ')[1];
          const payload = await verifyToken(token);
          isAuthenticated = payload && payload.sub ? true : false;
        }
      } catch (error) {
        console.error(error);
      }
      return { ...rest, req, auth: { isAuthenticated } };
    },
  });
  await server.start();

  const app = express();
  // app.use(cors({ origin: [`${process.env.CLIENT_ORIGIN_URL}`] }));
  server.applyMiddleware({ app, cors: true });
  // server.applyMiddleware({ app });
  app.use('/', expressPlayGround({ endpoint: '/graphql' }));

  const port = process.env.PORT || 4000;
  await new Promise((resolve) => app.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);

  // Eliminado por seguridad return { server, app };
  return true;
};

startApolloServer(_typeDefs, _resolvers);
