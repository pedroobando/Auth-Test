const { Property, PropertyGroup } = require('../../../mongodb/models/property');
const { ApolloError } = require('apollo-server-express');
const { validEmail } = require('../../../utils');
const {
  isExistsCondominio,
  isPropertyExistsCondominio,
  isUserAdministrator,
  isUserAuthenticate,
} = require('../middleware');

const mutation = {
  newCondProperty: async (_, { condid, input }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(condid);
    isUserAdministrator(activeUser, existsCondominio.id);

    await isPropertyExistsCondominio(input.inmuebleName, condid);

    if (input.email && !validEmail(input.email))
      throw new ApolloError(`Email ${input.email}, no valido.`);

    try {
      const newProperty = {
        ...input,
        condominioId: condid,
        user_at: activeUserId,
        updated_at: Date.now(),
      };

      const createProperty = new Property(newProperty);
      await createProperty.validate();
      await createProperty.save();

      return createProperty;
    } catch (error) {
      throw new Error(`Problema al ingresar los datos..!`);
    }
  },

  updateCondProperty: async (_, { condid, id, input }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(condid);
    isUserAdministrator(activeUser, existsCondominio.id);

    const findProperty = await isPropertyExistsCondominio(input.inmuebleName, condid, id);
    if (!findProperty) throw new ApolloError('Registro del inmueble no fue encontrado');

    if (input.email && !validEmail(input.email))
      throw new ApolloError(`Email ${input.email}, no valido.`);

    try {
      input.user_at = activeUserId;
      input.updated_at = Date.now();

      const updateProperty = await Property.findByIdAndUpdate(id, input, {
        new: true,
      });
      await updateProperty.validate();
      return updateProperty;
    } catch (error) {
      console.log(error);
      throw new Error(`Problema al actualizar los datos del inmueble..!`);
    }
  },

  removeCondProperty: async (_, { condid, id }, ctx) => {
    const { activeUser } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(condid);
    isUserAdministrator(activeUser, existsCondominio.id);

    let findProperty = await Property.findById(id);
    if (!findProperty) throw new ApolloError('Registro del propietario no fue encontrado');

    try {
      const { inmuebleName, propertyName } = findProperty;
      await Property.findByIdAndDelete(id);
      return `Propietario ${propertyName} del ${inmuebleName} eliminado.`;
    } catch (error) {
      throw new Error(`Problema al eliminar los datos..!`);
    }
  },

  newCondPropertyGroup: async (_, { condid, input }, ctx) => {
    const { activeUser, activeUserId } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(condid);
    isUserAdministrator(activeUser, existsCondominio.id);

    try {
      input.condominioId = existsCondominio.id;
      input.user_at = activeUserId;
      input.updated_at = Date.now();

      const newPropertyGroup = new PropertyGroup(input);
      await newPropertyGroup.validate();
      const savePropertyGroup = await newPropertyGroup.save();
      return savePropertyGroup;
    } catch (error) {
      throw new Error(`Problema al ingresar los datos..!`);
    }
  },

  updateCondPropertyGroup: async (_, { condid, id, input }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(condid);
    isUserAdministrator(activeUser, existsCondominio.id);

    try {
      input.user_at = activeUserId;
      input.updated_at = Date.now();

      const updatePtyGrp = await PropertyGroup.findByIdAndUpdate(id, input, {
        new: true,
      });
      await updatePtyGrp.validate();
      return updatePtyGrp;
    } catch (error) {
      console.log(error);
      throw new Error(`Problema al actualizar los datos del inmueble..!`);
    }
  },

  removeCondPropertyGroup: async (_, { condid, id }, ctx) => {
    const { activeUser } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(condid);
    isUserAdministrator(activeUser, existsCondominio.id);

    let findProperty = await PropertyGroup.findById(id);
    if (!findProperty)
      throw new ApolloError('Registro del grupo del propietario no fue encontrado');

    try {
      const { name } = findProperty;
      await PropertyGroup.findByIdAndDelete(id);
      return `Grupo ${name} eliminado.`;
    } catch (error) {
      throw new Error(`Problema al eliminar los datos..!`);
    }
  },
};

module.exports = mutation;
