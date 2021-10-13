const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const verifyToken = async (bearerToken) => {
  const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });

  function getJwksClientKey(header, callback) {
    client.getSigningKey(header.kid, function (error, key) {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }

  return new Promise((resolve, reject) => {
    jwt.verify(
      bearerToken,
      getJwksClientKey,
      {
        audience: process.env.AUTH0_AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ['RS256'],
      },
      function (err, decoded) {
        if (err) reject(err);
        resolve(decoded);
      }
    );
  });
};

const authenticationUser = (token) => {
  if (token) {
    try {
      const user = jwt.verify(token.replace('bearer ', ''), process.env.SECRET_JWT, {
        maxAge: process.env.EXPIRES_IN,
        algorithm: process.env.ALGORITHM,
      });
      return { user };
    } catch (error) {
      return null;
    }
  }
};

const createToken = (usuario) => {
  const { id, name, email } = usuario;
  return jwt.sign({ name, email, id }, process.env.SECRET_JWT, {
    expiresIn: process.env.EXPIRES_IN,
    algorithm: process.env.ALGORITHM,
  });
};

const cifrate = async (sword) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(sword, salt);
};

const cifrateVerify = async (swordOne, swordTwo) => {
  return await bcryptjs.compare(swordOne, swordTwo);
};

const validEmail = (email) => {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validRegex.test(String(email).toLowerCase());
};

module.exports = {
  authenticationUser,
  isTokenValid,
  createToken,
  cifrate,
  cifrateVerify,
  validEmail,
  verifyToken,
};
