const { ConceptGroupsExpense, ConceptExpense } = require('../../../mongodb/models/conceptgroup');
const { ApolloError } = require('apollo-server-express');

const {
  isExistsCondominio,
  isExistsConceptGroupExp,
  isUserAdministrator,
  isUserAuthenticate,
} = require('../middleware');

const mutation = {
  newConceptGroupExpense: async (_, { condid, input }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(condid);
    isUserAdministrator(activeUser, existsCondominio.id);

    try {
      const newConceptGroup = new ConceptGroupsExpense({
        ...input,
        condominioId: existsCondominio.id,
        user_at: activeUserId,
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      // await newConceptGroup.validate();
      const saveConceptGroup = await newConceptGroup.save();
      return saveConceptGroup;
    } catch (error) {
      throw new ApolloError(`Problema al ingresar los datos del grupo de conceptos..!`);
    }
  },

  updateConceptGroupExpense: async (_, { condid, id, input }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(condid);
    isUserAdministrator(activeUser, existsCondominio.id);

    const existsConceptGroup = await ConceptGroupsExpense.findById(id);
    if (!existsConceptGroup)
      throw new ApolloError('Grupos de conceptos de condominio no encontrado.');
    try {
      input.user_at = activeUserId;
      input.updated_at = Date.now();

      const saveConceptGroup = await ConceptGroupsExpense.findByIdAndUpdate(id, input, {
        new: true,
      });
      return saveConceptGroup;
    } catch (error) {
      throw new ApolloError(`Problemas al guardar los datos..!`);
    }
  },

  removeConceptGroupExpense: async (_, { condid, id }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(condid);
    isUserAdministrator(activeUser, existsCondominio.id);

    const existsConceptGroup = await ConceptGroupsExpense.findById(id);
    if (!existsConceptGroup) throw new ApolloError('Registro grupo de conceptos no encontrado.');
    const { name } = existsConceptGroup;
    try {
      await ConceptGroupsExpense.findByIdAndDelete(id);
      return `${name} eliminado.`;
    } catch (error) {
      throw new ApolloError(`Problema al eliminar los datos..!`);
    }
  },

  newConceptExpense: async (_, { condid, input }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    const existsCondominio = await isExistsCondominio(condid);
    isUserAdministrator(activeUser, existsCondominio.id);

    // const existsConpGroup = await ConceptGroupsExpense.findById(groupid);
    // if (!existsConpGroup) throw new ApolloError('Grupo de concepto no localizado.');

    try {
      const newConceptExpense = new ConceptExpense({
        ...input,
        condominioId: existsCondominio.id,
        // conceptGroupId: existsConpGroup.id,
        user_at: activeUserId,
        created_adt: Date.now(),
        updated_at: Date.now(),
      });

      const saveConceptExpense = await newConceptExpense.save();
      return saveConceptExpense;
    } catch (error) {
      throw new ApolloError(`Problema al ingresar los datos de concepto..!`);
    }
  },

  updateConceptExpense: async (_, { condid, id, input }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    // const existsCondominio = await isExistsCondominio(condid);
    isUserAdministrator(activeUser, condid);

    const existsConceptExpense = await ConceptExpense.findById(id);
    if (!existsConceptExpense) throw new ApolloError('Concepto de Gasto no localizado.');
    try {
      input.user_at = activeUserId;
      input.updated_at = Date.now();

      const updConceptExpense = await ConceptExpense.findByIdAndUpdate(
        existsConceptExpense.id,
        input,
        {
          new: true,
        }
      );
      return updConceptExpense;
    } catch (error) {
      throw new ApolloError(`Problema al actualizar los datos del concepto..!`);
    }
  },

  removeConceptExpense: async (_, { condid, id }, ctx) => {
    const { activeUserId, activeUser } = await isUserAuthenticate(ctx);
    isUserAdministrator(activeUser, condid);

    const existsConceptExpense = await ConceptExpense.findById(id);
    if (!existsConceptExpense) throw new ApolloError('Concepto de Gasto no localizado.');
    const { name } = existsConceptExpense;

    try {
      await ConceptExpense.findByIdAndDelete(id);
      return `Concepto ${name} eliminado.`;
    } catch (error) {
      console.log(error);
      throw new ApolloError(`Problema al eliminar los datos del concepto..!`);
    }
  },
};

module.exports = mutation;
