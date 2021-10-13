const { Schema, model } = require('mongoose');
const { dataTypeProperty, dataTypeUser } = require('./xdataTypeModel');

const AccountDebitSchema = new Schema({
  expenseId: {
    ...dataTypeExpense,
  },
  propertyId: {
    ...dataTypeProperty,
  },
  dateDebit: {
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
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model('AccountDebit', AccountDebitSchema);
