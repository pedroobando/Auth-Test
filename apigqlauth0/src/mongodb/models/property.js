const { Schema, model } = require('mongoose');

const { dataTypeStringDefault, dataTypeUser, dataTypeCondominio } = require('./xdataTypeModel');

const PropertyGroupSchema = new Schema({
  condominioId: {
    ...dataTypeCondominio,
  },
  name: {
    ...dataTypeStringDefault,
  },
  properties: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  userId: {
    ...dataTypeUser,
    required: false,
  },
  user_at: {
    ...dataTypeUser,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const PropertySchema = new Schema({
  condominioId: {
    ...dataTypeCondominio,
  },
  inmuebleName: {
    ...dataTypeStringDefault,
  },
  propertyName: {
    ...dataTypeStringDefault,
  },
  email: {
    ...dataTypeStringDefault,
    required: false,
  },
  aliquot: {
    type: Schema.Types.Number,
    default: 0,
  },
  userId: {
    ...dataTypeUser,
    required: false,
  },
  user_at: {
    ...dataTypeUser,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

const PropertyGroup = model('condpropertygroup', PropertyGroupSchema);
const Property = model('condproperties', PropertySchema);

module.exports = { Property, PropertyGroup };
