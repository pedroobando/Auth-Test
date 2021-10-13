const { Schema, model } = require('mongoose');

const {
  dataTypeStringDefault,
  dataTypeCurrencyRate,
  dataTypeCondominio,
  dataTypeUser,
} = require('./xdataTypeModel');

const BankSchema = new Schema({
  condominioId: {
    ...dataTypeCondominio,
  },
  name: {
    ...dataTypeStringDefault,
  },
  rateWorkId: {
    ...dataTypeCurrencyRate,
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
    required: false,
  },
  phone: {
    ...dataTypeStringDefault,
    required: false,
  },
  contactName: {
    ...dataTypeStringDefault,
  },
  active: {
    type: Schema.Types.Boolean,
    default: true,
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

module.exports = model('Bank', BankSchema);
