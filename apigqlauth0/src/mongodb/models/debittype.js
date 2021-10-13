const { Schema, model } = require('mongoose');
const {
  dataTypeStringDefault,
  dataTypeUser,
  dataTypeCondominio,
} = require('./xdataTypeModel');

const DebitTypeSchema = new Schema({
  condominioId: {
    ...dataTypeCondominio,
  },
  name: {
    ...dataTypeStringDefault,
  },
  debitConcept: {
    ...dataTypeStringDefault,
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

module.exports = model('DebitType', DebitTypeSchema);
