const { Schema, model } = require('mongoose');

const { dataTypeStringDefault, dataTypeCondominio, dataTypeUser } = require('./xdataTypeModel');

const UserCondominioSchema = Schema({
  //_id => Se guarda el condominioId
  // Esto solo se hace en la creacion del condominio
  // ADMIN, DIRECTOR, PROPERTY
  roll: {
    ...dataTypeStringDefault,
  },
  user_at: {
    ...dataTypeUser,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const UserSchema = Schema({
  name: {
    ...dataTypeStringDefault,
  },
  email: {
    ...dataTypeStringDefault,
    unique: true,
  },
  password: {
    ...dataTypeStringDefault,
  },
  urlImagen: {
    ...dataTypeStringDefault,
    required: false,
  },
  phone: {
    ...dataTypeStringDefault,
    required: false,
  },
  condominios: {
    type: [UserCondominioSchema],
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model('User', UserSchema);
