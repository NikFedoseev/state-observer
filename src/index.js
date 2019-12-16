import isEqual from "lodash.isequal";
(window => {
  const createStore = defaultState => {
    let state = defaultState || {};
    let listeners = [];

    function getState() {
      return state;
    }

    function setState(newState) {
      const prevState = getState();
      state = { ...prevState, ...newState };
      listeners.forEach(listener => listener(getState(), prevState));
    }

    function connect(mapStateToProps, func) {
      const connectedFunc = (globalState, prevGlobalState) => {
        const localState = mapStateToProps(globalState);
        const prevLocalState = mapStateToProps(prevGlobalState);
        const isStatesEqual = isEqual(localState, prevLocalState);
        if (isStatesEqual) return;
        func(localState);
      };
      listeners.push(connectedFunc);
      return connectedFunc;
    }

    return {
      getState,
      setState,
      connect
    };
  };

  if (typeof module != "undefined" && module.exports) {
    module.exports = createStore;
  } else {
    window.createStore = createStore;
  }
})(window);
