'use strict';

exports.__esModule = true;
exports['default'] = createStore;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _utilsCombineReducers = require('./utils/combineReducers');

var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

function createStore(reducer, initialState) {
  var finalReducer = typeof reducer === 'function' ? reducer : _utilsCombineReducers2['default'](reducer);

  var store = new _Store2['default'](finalReducer, initialState);

  return {
    dispatch: store.dispatch.bind(store),
    subscribe: store.subscribe.bind(store),
    getState: store.getState.bind(store),
    getReducer: store.getReducer.bind(store),
    replaceReducer: store.replaceReducer.bind(store)
  };
}

module.exports = exports['default'];