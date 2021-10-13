const User = require('../../mongodb/models/user');
const Condominio = require('../../mongodb/models/condominio');
const { Property, PropertyGroup } = require('../../mongodb/models/property');
const { ConceptGroupsExpense } = require('../../mongodb/models/conceptgroup');
const user = require('../../mongodb/models/user');

const types = {
  Condominio: {
    // user: async (parent) => {
    //   return await User.findById(parent.user_at);
    // },
    propertys: async (parent) => await Property.find({ condominioId: parent._id }),
    users: async (parent) => {
      const retorna = await User.find({ 'condominios._id': parent._id.toString() });
      const addRoll = retorna.map((uss) => ({
        ...uss._doc,
        id: uss._doc._id,
        roll: uss.condominios.find((rll) => rll._id.toString() === parent._id.toString()).roll,
      }));
      return addRoll;
    },
  },
  CondominioProperty: {
    condominio: async (parent) => await Condominio.findById(parent.condominioId),
  },
  ConceptExpense: {
    conceptGroup: async (parent) => await ConceptGroupsExpense.findById(parent.conceptGroupId),
  },

  CondominioPropertyGroup: {
    properties: (parent) =>
      parent.properties.map(async (property) => await Property.findById(property)),
  },
  // roll: doc.documentos.id(parent._id.toString()).roll
  // CondominioUser: {
  //   user: async (parent) => await User.findById(parent.userId),
  // },
  // ConceptGroupExpense: {
  //   condominio: async (parent) => await Condominio.findById(parent.condominioId),
  // },
  // Todo: {
  //   user: async (parent) => {
  //     return await User.findById(parent.user);
  //   },
  //   userTo: async (parent) => {
  //     return await User.findById(parent.userTo);
  //   },
  //   product: async (parent) => {
  //     return await Product.findById(parent.product);
  //   },
  // },
  // Cliente: {
  // nombreCompleto: (parent) => parent.nombre + ' ' + parent.apellido,
  // nombre: String
  // apellido: String
  // empresa: String
  // email: String
  // telefono: String
  // vendedor: ID
  // creado: String
  // cliente:async (parent) => {
  //   let cursosLista: Array<any> = [];
  //   parent.courses.map((curso: string) => {
  //     cursosLista = [...cursosLista, database.cursos.find((elc) => elc.id == curso)];
  //     // cursosLista.push(_.filter(database.cursos, ['id', curso])[0]);
  //   });
  //   return cursosLista;
  // },
  // },
  // Curso: {
  //   students: (parent) => {
  //     const listaEstudiantes: Array<any> = [];
  //     const idCurso = parent.id;
  //     database.estudiantes.map((elEstudiante) => {
  //       if (elEstudiante.courses.filter((idc: any) => idc == idCurso).length > 0) {
  //         listaEstudiantes.push(elEstudiante);
  //       }
  //     });
  //     return listaEstudiantes;
  //   },
  //   path: (parent) => `https://www.udemy.com${parent.path}`,
  // },
};

module.exports = types;
