const { Schema, model } = require('mongoose');
const {
  dataTypeStringDefault,
  dataTypeProperty,
  dataTypeBank,
  dataTypeUser,
} = require('./xdataTypeModel');

const { recordRate } = require('./currencyrate');

const AccountCreditSchema = new Schema({
  propertyId: {
    ...dataTypeProperty,
  },
  paymentType: {
    ...dataTypeStringDefault,
  },
  paymentDate: {
    type: Date,
    default: Date.now(),
  },
  paymentBankId: {
    ...dataTypeBank,
  },
  paymentReference: {
    ...dataTypeStringDefault,
  },
  paymentRate: {
    rateId: { type: Schema.Types.ObjectId },
    ...recordRate,
  },
  paymentAmount: {
    type: Schema.Types.Number,
    default: 0,
  },
  reconciled: {
    type: Boolean,
    default: false,
  },
  userReconciledId: {
    ...dataTypeUser,
    required: false,
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

module.exports = model('AccountCredit', AccountCreditSchema);
