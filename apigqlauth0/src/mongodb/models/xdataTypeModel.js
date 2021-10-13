const { Schema } = require('mongoose');

const dataTypeStringDefault = {
  type: Schema.Types.String,
  required: true,
  trim: true,
};

const dataTypeProperty = {
  type: Schema.Types.ObjectId,
  required: true,
  ref: 'Property',
};

const dataTypeBank = {
  type: Schema.Types.ObjectId,
  required: true,
  ref: 'Bank',
};

const dataTypeUser = {
  type: Schema.Types.ObjectId,
  required: true,
  ref: 'User',
};

const dataTypeCurrencyRate = {
  type: Schema.Types.ObjectId,
  required: true,
  ref: 'CurrencyRate',
};

const dataTypeDebitType = {
  type: Schema.Types.ObjectId,
  required: true,
  ref: 'DebitType',
};

const dataTypeCondominio = {
  type: Schema.Types.ObjectId,
  required: true,
  ref: 'Condominio',
};

const dataTypeConceptGroup = {
  type: Schema.Types.ObjectId,
  required: true,
  ref: 'ConceptGroup',
};

const dataTypeConceptExpense = {
  type: Schema.Types.ObjectId,
  required: true,
  ref: 'ConceptExpense',
};

const dataTypeExpense = {
  type: Schema.Types.ObjectId,
  required: true,
  ref: 'Expense',
};

module.exports = {
  dataTypeBank,
  dataTypeConceptExpense,
  dataTypeConceptGroup,
  dataTypeCondominio,
  dataTypeCurrencyRate,
  dataTypeDebitType,
  dataTypeExpense,
  dataTypeProperty,
  dataTypeStringDefault,
  dataTypeUser,
};
