const { Schema, model } = require('mongoose');
const {
  dataTypeStringDefault,
  dataTypeUser,
  dataTypeCondominio,
} = require('./xdataTypeModel');

export const recordRate = {
  date: {
    type: Date,
    default: Date.now(),
  },
  amount: {
    type: Schema.Types.Number,
    default: 0,
  },
  user_at: {
    ...dataTypeUser,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
};

const RateSchema = new Schema({ ...recordRate });

const CurrencyRateSchema = new Schema({
  condominioId: {
    ...dataTypeCondominio,
  },
  name: {
    ...dataTypeStringDefault,
  },
  rates: {
    type: [RateSchema],
    default: [],
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

module.exports = model('CurrencyRate', CurrencyRateSchema);
