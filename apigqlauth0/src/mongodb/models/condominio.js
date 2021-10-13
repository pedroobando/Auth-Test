const { Schema, model } = require('mongoose');

const { dataTypeStringDefault, dataTypeUser, dataTypeProperty } = require('./xdataTypeModel');

const CondominioSchema = new Schema({
  name: {
    ...dataTypeStringDefault,
  },
  address: {
    ...dataTypeStringDefault,
    required: false,
  },
  dni: {
    ...dataTypeStringDefault,
    required: false,
  },
  email: {
    ...dataTypeStringDefault,
  },
  phone: {
    ...dataTypeStringDefault,
    required: false,
  },
  contactName: {
    ...dataTypeStringDefault,
    required: false,
  },
  active: {
    type: Schema.Types.Boolean,
    default: true,
  },
  isblock: {
    type: Schema.Types.Boolean,
    default: false,
  },
  user_at: {
    ...dataTypeUser,
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

module.exports = model('Condominio', CondominioSchema);
