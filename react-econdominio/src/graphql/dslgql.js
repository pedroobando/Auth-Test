import { gql } from '@apollo/client';

export const AUTENTICAR_USUARIO = gql`
  mutation authenticateUser($authenticateUserInput: AuthenticateInput!) {
    authenticateUser(input: $authenticateUserInput) {
      token
    }
  }
`;

export const OBTENER_USUARIO = gql`
  query getUser {
    getUser {
      id
      name
      email
    }
  }
`;

export const OBTENER_USUARIOS = gql`
  query getUsers {
    getUsers {
      id
      name
      email
      owner
      created
    }
  }
`;

export const OBTENER_PRODUCTO = gql`
  query getProduct($getProductId: ID!) {
    getProduct(id: $getProductId) {
      id
      name
      description
      amount
      user {
        id
        name
        email
      }
      active
      hashtags
    }
  }
`;

export const OBTENER_PRODUCTOS = gql`
  query getProducts($hashtag: [String!]) {
    getProducts(hashtag: $hashtag) {
      id
      name
      description
      amount
      user {
        id
        name
        email
      }
      active
      hashtags
    }
  }
`;

export const OBTENER_HASHTAGSPRODUCTO = gql`
  query getProductHashTag {
    getProductHashTag
  }
`;

export const OBTENER_PRODUCTOS_USUARIO = gql`
  query getProductsbyUser {
    getProductsbyUser {
      id
      name
      description
      amount
      user {
        id
        name
        email
      }
      active
      hashtags
    }
  }
`;

export const OBTENER_TAREAS = gql`
  query getTodos {
    getTodos {
      id
      product {
        name
      }
      description
      amount
      userTo {
        name
        email
      }
      complete
      created
      user {
        email
      }
    }
  }
`;

export const NUEVO_USUARIO = gql`
  mutation newUser($input: UserInput!) {
    newUser(input: $input) {
      id
      name
      email
      created
    }
  }
`;

export const ACTUALIZAR_USUARIO = gql`
  mutation UpdateUserMutation($updateUserInput: UserUpdateInput!) {
    updateUser(input: $updateUserInput) {
      id
      name
      email
    }
  }
`;

export const ELIMINAR_USUARIO = gql`
  mutation RemoveUserMutation {
    removeUser
  }
`;

export const NUEVO_PRODUCTO = gql`
  mutation NewProductMutation($newProductInput: ProductInput!) {
    newProduct(input: $newProductInput) {
      id
      name
      description
      amount
      user {
        id
        name
        email
      }
      active
      hashtags
    }
  }
`;

export const ELIMINAR_PRODUCTO = gql`
  mutation RemoveProductMutation($removeProductId: ID!) {
    removeProduct(id: $removeProductId)
  }
`;

export const ACTUALIZAR_PRODUCTO = gql`
  mutation updateProduct($updateProductId: ID!, $updateProductInput: ProductInput!) {
    updateProduct(id: $updateProductId, input: $updateProductInput) {
      id
      name
      description
      amount
      user {
        id
        name
        email
      }
      active
      hashtags
    }
  }
`;

export const NUEVA_TAREA = gql`
  mutation newTodo($newTodoInput: TodoInput!) {
    newTodo(input: $newTodoInput) {
      id
      product {
        name
      }
      description
      amount
      userTo {
        name
        email
      }
      complete
      created
      user {
        email
      }
    }
  }
`;

export const ELIMINAR_TAREA = gql`
  mutation removeTodo($removeTodoId: ID!) {
    removeTodo(id: $removeTodoId)
  }
`;

export const ACTUALIZAR_TAREA_COMPLETE = gql`
  mutation updateTodoComplete($upTodoCompleteId: ID!, $upTodoComplete: Boolean!) {
    updateTodoComplete(id: $upTodoCompleteId, complete: $upTodoComplete) {
      id
      product {
        name
      }
      description
      amount
      userTo {
        name
        email
      }
      complete
      created
      user {
        email
      }
    }
  }
`;
