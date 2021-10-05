const INITIAL_STATE = {
  usuarioLogado: 0,
  usuarioId: "",
};

function usuarioReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        usuarioLogado: 1,
        usuarioId: action.usuarioId,
      };
    case "LOGOUT":
      return {
        ...state,
        usuarioLogado: 0,
        usuarioId: "",
      };
    default:
      return state;
  }
}

export default usuarioReducer;
