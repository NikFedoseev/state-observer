"use strict";

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _lodash = _interopRequireDefault(require("lodash.isequal"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const createStore = defaultState => {
  let state = defaultState || {};
  let listeners = [];

  function getState() {
    return state;
  }

  function setState(newState) {
    const prevState = getState();
    state = _objectSpread({}, prevState, {}, newState);
    listeners.forEach(listener => listener(getState(), prevState));
  }

  function connect(mapStateToProps, func) {
    const connectedFunc = (globalState, prevGlobalState) => {
      const localState = mapStateToProps(globalState);
      const prevLocalState = mapStateToProps(prevGlobalState);
      const isStatesEqual = (0, _lodash.default)(localState, prevLocalState);
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
