import { TYPE_AUTH, TYPE_PAGESTATE } from './types';

const TodoReducer = (state, { type, payload }) => {
  switch (type) {
    case TYPE_AUTH.LOGIN:
      return {
        ...state,
        logged: true,
        activeUser: payload,
      };

    case TYPE_AUTH.LOGOUT:
      return {
        ...state,
        logged: false,
        activeUser: {},
      };

    case TYPE_PAGESTATE.SETPAGE:
      return {
        ...state,
        backPageState: payload,
      };

    case TYPE_PAGESTATE.CLEAR:
      return {
        ...state,
        backPageState: { name: '', params: {} },
      };

    default:
      return state;
  }
};

export default TodoReducer;
