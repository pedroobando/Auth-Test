const { Schema, model } = require('mongoose');
const {
  dataTypeStringDefault,
  dataTypeUser,
  dataTypeConceptGroup,
  dataTypeCondominio,
  dataTypeConceptExpense,
} = require('./xdataTypeModel');

const ExpenseDetailSchema = new Schema({
  conceptgroupId: {
    ...dataTypeConceptGroup,
  },
  conceptexpenseId: {
    ...dataTypeConceptExpense,
  },
  description: {
    ...dataTypeStringDefault,
  },
  // byAliquot // byIndividual // byEqualDistribution // byGroupDistribution
  // byAliquot    => Expense * Aliquot
  // byIndividual => Expense / (byIndividual + ... + byIndividual)
  // byEqualDistribution => Expense / (AllPropertys)
  // byGroupDistribution => Expense / (All PropertyGroups)
  expensebyType: {
    ...dataTypeStringDefault,
  },
  // aplicate only byIndividual || byGroupDistribution
  properties: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  // is Prevision
  isForecast: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const ExpenseSchema = new Schema({
  condominioId: {
    ...dataTypeCondominio,
  },
  nameExpense: {
    ...dataTypeStringDefault,
  },
  dateExpense: {
    type: Date,
    default: Date.now(),
  },
  details: {
    type: [ExpenseDetailSchema],
    default: [],
  },
  // draft || finished || shipped and loaded
  statusExpense: {
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

// const ExpenseDetail = model('ExpenseDetail', ExpenseDetailSchema);
const Expense = model('Expense', ExpenseSchema);

module.exports = { Expense };
