export default (initialState, actionHandlers = {}) =>
  (state, action) => {
    const handler = actionHandlers[action.type];

    if (!handler) {
      return state === undefined ?
        initialState : state;
    }

    return handler(state, action);
  };
