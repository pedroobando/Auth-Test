const { gql } = require('apollo-server-express');

// Schema
const typeDefs = gql`
  scalar Date

  "Datos para usuario nuevo"
  input UserInput {
    name: String!
    email: String!
    password: String!
    """
    Indica la imagen asociada al usuario,
    esta guarda una direccion http.
    """
    urlImagen: String
    phone: String
  }

  "Datos para actualizacion de usuario"
  input UserUpdateInput {
    name: String
    email: String
    avatar: String
    phone: String
  }

  "Datos para Autenticacion de usuario"
  input AuthenticateInput {
    email: String!
    password: String!
  }

  "Datos para cambio de contraseña"
  input ChangeUserPasswordInput {
    oldpassword: String!
    newpassword: String!
  }

  "Datos para ingreso de condominio"
  input CondominioInput {
    name: String!
    address: String
    dni: String
    email: String!
    phone: String
    contactName: String
  }

  "Datos para ingreso de la Propiedad"
  input CondPropertyInput {
    inmuebleName: String!
    propertyName: String
    aliquot: Float
    email: String
    userId: ID
  }

  "Datos para increso de conceptos de cobro del condominio"
  input CondPropertyGroupInput {
    name: String!
    properties: [ID!]
  }

  "Datos para ingreso de los usuarios del sistema condominio"
  input CondUserInput {
    userId: ID!
    roll: RollUser!
  }

  "Datos para ingreso de grupo conceptos de cobro del condominio"
  input ConceptGroupExpenseInput {
    name: String
    order: Int
  }

  "Datos para ingreso de conceptos de cobro del condominio"
  input ConceptExpenseInput {
    name: String
    conceptGroupId: ID
    permanent: Boolean
  }

  "Datos para gastos del condominio (monto y concepto)"
  input ExpenseInput {
    nameExpense: String!
    dateExpense: Date!
    details: [ExpenseDetailInput]
    statusExpense: StatusExpense
  }

  "Datos para detalle gastos, concepto, grupo, monto, descripcion del gasto"
  input ExpenseDetailInput {
    conceptgroupId: ID!
    conceptexpenseId: ID!
    description: String!
    expensebyType: ExpenseByType
    properties: [ID]
    isForecast: Boolean
    amount: Float
  }

  "Token de seguridad entre cliente & servidor"
  type Token {
    token: String
  }

  "Informacion Usuario de la aplicacion"
  type User {
    id: ID!
    name: String!
    email: String!
    urlImagen: String
    phone: String
    created_at: Date!
    updated_at: Date!
  }

  "Informacion datos del condominio"
  type Condominio {
    id: ID!
    name: String!
    address: String
    dni: String
    email: String!
    phone: String
    contactName: String
    active: Boolean!
    isblock: Boolean!
    propertys: [CondominioProperty]
    users: [CondominioUser]
    user_at: ID!
    created_at: Date!
    updated_at: Date!
  }

  "Datos para ingreso de la Propiedad"
  type CondominioProperty {
    id: ID!
    condominioId: ID!
    inmuebleName: String!
    propertyName: String
    aliquot: Float
    email: String
    condominio: Condominio
    userId: ID
    user_at: ID!
    updated_at: Date!
  }

  "Datos para Grupos de Propietarios"
  type CondominioPropertyGroup {
    id: ID!
    name: String!
    properties: [CondominioProperty]
    user_at: ID!
    updated_at: Date!
  }

  "Informacion usuario del condominio"
  type CondominioUser {
    id: ID!
    name: String!
    email: String!
    urlImagen: String
    phone: String
    roll: String
  }

  "Informacion de grupos de conceptos del condominio"
  type ConceptGroupExpense {
    id: ID!
    name: String!
    order: Int
    # conceptExpenses:
    user_at: ID!
    created_at: Date!
    updated_at: Date!
  }

  "Informacion datos del condominio"
  type ConceptExpense {
    id: ID!
    name: String!
    permanent: Boolean
    condominioId: ID!
    conceptGroupId: ID!
    conceptGroup: ConceptGroupExpense
    user_at: ID!
    created_at: Date!
    updated_at: Date!
  }

  type Expense {
    id: ID!
    condominioId: ID!
    nameExpense: String!
    dateExpense: Date!
    # detailExpense: []
    statusExpense: StatusExpense
    user_at: ID!
    created_at: Date!
    updated_at: Date!
  }

  type ExpenseDetail {
    id: ID
    conceptgroupId: ID
    conceptexpenseId: ID
    description: String
    expensebyType: ExpenseByType
    properties: [ID]
    isForecast: Boolean
    amount: Float
    updated_at: Date!
  }

  "Roles de Usuario de la aplicacion"
  enum RollUser {
    ADMIN
    DIRECTOR
    PROPERTY
  }

  "Roles de Status del Gasto"
  enum StatusExpense {
    DRAFT
    FINISHED
    SHIPPEDANDLOADED
  }

  "Forma de aplicacion de Gastos"
  enum ExpenseByType {
    BYALIQUOT
    BYINDIVIDUAL
    BYEQUALDISTRIBUTION
    BYGROUPDISTRIBUTION
  }

  type Query {
    "Obtener solo un usuario"
    getUser: User
    "Muestra todos los usuarios de la App"
    getUsers: [User]

    "Obtiene el condonminio por el ID"
    getCondominio(id: ID!): Condominio
    "Obtiene todos los condominios asociados al usuario actual"
    getCondominios: [Condominio]!

    "Obtiene todos los propietarios del condominio por el ID"
    getProperties(condid: ID!): [CondominioProperty]!
    "Obtiene un propietario segun el ID"
    getProperty(id: ID!): CondominioProperty

    "Obtiene un grupo de propietario segun el ID"
    getPropertyGroup(id: ID!): CondominioPropertyGroup
    "Obtiene todos los grupos de propietarios segun el condominio ID"
    getPropertyGroupByCond(condid: ID!): [CondominioPropertyGroup]

    "Grupos de Concetos de Pago"
    getConceptGroupExpenses(condid: ID!): [ConceptGroupExpense]
    getConceptGroupExpense(condid: ID!, id: ID!): ConceptGroupExpense

    "Concetos de Pagos"
    getConceptExpense(condid: ID!, id: ID!): ConceptExpense
    "Concetos de Pagos por Grupos"
    getConceptExpensesByGroup(groupid: ID!): [ConceptExpense]
    "Concetos de Pagos por ID del Condominio"
    getConceptExpensesByCond(condid: ID!): [ConceptExpense]
  }

  type Mutation {
    "Creacion de nuevo usuario"
    newUser(input: UserInput!): User
    "Autenticacion del usuario, retornando el token"
    authenticateRetToken(input: AuthenticateInput!): Token
    # "Autenticacion de usuario, retornado el usuario"
    # authenticateRetUser(input: AuthenticateInput!): User
    "Actualizacion de datos del usuario"
    updateUser(input: UserUpdateInput!): User
    "Dar de baja al usuario"
    removeUser: String
    "Cambio de password o contrase~na"
    changeUserPassword(input: ChangeUserPasswordInput!): String

    "Creacion de nuevo condominio"
    newCondominio(input: CondominioInput!): Condominio
    "Actualizacion de datos del condominio"
    updateCondominio(id: ID!, input: CondominioInput!): Condominio
    "Eliminacion de registo del condominio"
    removeCondominio(id: ID!): String

    """
    Creacion de propiedades del condominio
    condid: coresponde al condominioId
    input: los demas datos de la propiedad
    """
    newCondProperty(condid: ID!, input: CondPropertyInput!): CondominioProperty
    "Actualizacion de propiedades del condominio"
    updateCondProperty(condid: ID!, id: ID!, input: CondPropertyInput!): CondominioProperty
    "Eliminacion de la propiedad del condominio"
    removeCondProperty(condid: ID!, id: ID!): String

    """
    Creacion de nuevo usuario para el condominio
    ADMIN / DIRECTOR / PROPIETARY
    """
    newCondUser(condid: ID!, input: CondUserInput!): CondominioUser
    "Actualizacion de propiedades del condominio"
    updateCondUser(condid: ID!, input: CondUserInput!): CondominioUser
    "Eliminacion de la propiedad del condominio"
    removeCondUser(condid: ID!, id: ID!): String

    "Creacion de Grupos de propietarios"
    newCondPropertyGroup(condid: ID!, input: CondPropertyGroupInput!): CondominioPropertyGroup
    "Actualizacion de Grupos de Propietarios"
    updateCondPropertyGroup(
      condid: ID!
      id: ID!
      input: CondPropertyGroupInput!
    ): CondominioPropertyGroup
    "Eliminacion del Grupo de Propietarios"
    removeCondPropertyGroup(condid: ID!, id: ID!): String

    "Creacion del Grupo de Conceptos de pagos"
    newConceptGroupExpense(condid: ID!, input: ConceptGroupExpenseInput!): ConceptGroupExpense
    "Actualizacion del Grupo de conceptos de pagos"
    updateConceptGroupExpense(
      condid: ID!
      id: ID!
      input: ConceptGroupExpenseInput!
    ): ConceptGroupExpense
    "Eliminacion del Grupo de conceptos de pagos"
    removeConceptGroupExpense(condid: ID!, id: ID!): String

    "Creacion de los conceptos de pago, estos van dentro del grupo"
    newConceptExpense(condid: ID!, input: ConceptExpenseInput!): ConceptExpense
    "Actualizacion de conceptos de pagos"
    updateConceptExpense(condid: ID!, id: ID!, input: ConceptExpenseInput!): ConceptExpense
    "Eliminacion de conceptos de pagos"
    removeConceptExpense(condid: ID!, id: ID!): String

    "Creacion conjunto de gatos aplicados a propietarios"
    newExpense(condid: ID!, input: ExpenseInput!): Expense
    "Actualizacion de gastos a propietarios"
    updateExpense(condid: ID!, id: ID!, input: ExpenseInput!): Expense
    "Eliminacion de gastos a propietarios"
    removeExpense(condid: ID!, id: ID!): String
  }
`;

module.exports = typeDefs;
