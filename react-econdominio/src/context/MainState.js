import { useReducer } from 'react';
import { TYPE_AUTH, TYPE_PAGESTATE } from './types';
import TodoContext from './TodoContext';
import TodoReducer from './TodoReducer';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

const init = () => {
  // return JSON.parse(localStorage.getItem('user')) || { logged: false };
  return {
    backPageState: { name: '', params: {} },
    logged: false,
    activeUser: { email: '', name: '', userid: '' },
  };
};

const TodoState = ({ children }) => {
  const initialState = {
    backPageState: {},
    logged: false,
    activePage: {},
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState, init);

  const setPageState = (setPage) => {
    dispatch({
      type: TYPE_PAGESTATE.SETPAGE,
      payload: { ...setPage },
    });
  };

  const clearPageState = () => {
    dispatch({
      type: TYPE_PAGESTATE.CLEAR,
    });
  };

  const validUser = () => {
    try {
      const _token = localStorage.getItem('token') || null;
      const _verify = jwt.verify(_token, process.env.secretword);
      const { email, name } = _verify;

      dispatch({
        type: TYPE_AUTH.LOGIN,
        payload: { email, name },
      });
      return true;
    } catch (error) {
      logoutUser();
      return false;
    }
  };

  const loginUser = (token) => {
    localStorage.setItem('token', token);
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const { email, name } = jwt.decode(token);

    dispatch({
      type: TYPE_AUTH.LOGIN,
      payload: { email, name, token },
    });
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    fetch('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch({
      type: TYPE_AUTH.LOGOUT,
    });
  };

  // const asignarCliente = (cliente) => {
  //   dispatch({
  //     type: SELECCIONAR_CLIENTE,
  //     payload: cliente,
  //   });
  // };

  // const asignarProductos = (productoSeleccionados) => {
  //   let nuevoState;
  //   if (state.productos.length > 0) {
  //     nuevoState = productoSeleccionados.map((producto) => {
  //       const nuevoObjeto = state.productos.find(
  //         (productoState) => productoState.id === producto.id
  //       );
  //       return { ...producto, ...nuevoObjeto };
  //     });
  //   } else {
  //     nuevoState = productoSeleccionados;
  //   }

  //   dispatch({
  //     type: SELECCIONAR_PRODUCTO,
  //     payload: nuevoState,
  //   });
  // };

  // const cantidadProductos = (nuevoProducto) => {
  //   dispatch({
  //     type: CANTIDAD_PRODUCTOS,
  //     payload: nuevoProducto,
  //   });
  // };

  // const actualizarTotal = () => {
  //   dispatch({
  //     type: ACTUALIZAR_TOTAL,
  //   });
  // };

  return (
    <TodoContext.Provider
      value={{
        activeUser: state.activeUser,
        logged: state.logged,
        backPageState: state.backPageState,
        loginUser,
        logoutUser,
        validUser,
        setPageState,
        clearPageState,
        // asignarCliente,
        // asignarProductos,
        // cantidadProductos,
        // actualizarTotal,
      }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoState;
