const { Schema, model } = require('mongoose');
const { dataTypeStringDefault, dataTypeUser, dataTypeCondominio } = require('./xdataTypeModel');

const ConceptExpenseSchema = new Schema({
  condominioId: {
    ...dataTypeCondominio,
  },
  name: {
    ...dataTypeStringDefault,
  },
  permanent: {
    type: Schema.Types.Boolean,
    default: false,
  },
  conceptGroupId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'ConceptGroupsExpense',
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

const ConceptExpense = model('ConceptExpense', ConceptExpenseSchema);

const ConceptGroupSchema = new Schema({
  condominioId: {
    ...dataTypeCondominio,
  },
  name: {
    ...dataTypeStringDefault,
  },
  order: {
    type: Schema.Types.Number,
    required: true,
    default: 0,
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

const ConceptGroupsExpense = model('ConceptGroupsExpense', ConceptGroupSchema);

module.exports = { ConceptExpense, ConceptGroupsExpense };
