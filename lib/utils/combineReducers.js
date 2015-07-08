'use strict';

exports.__esModule = true;
exports['default'] = combineReducers;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsMapValues = require('../utils/mapValues');

var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

var _utilsPick = require('../utils/pick');

var _utilsPick2 = _interopRequireDefault(_utilsPick);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function getErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType + '"' || 'an action';
  var reducerName = 'Reducer "' + key + '"';

  if (actionType === '@@INIT') {
    return reducerName + ' returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, ' + 'you must explicitly return the initial state.';
  }

  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function combineReducers(reducers) {
  var finalReducers = _utilsPick2['default'](reducers, function (val) {
    return typeof val === 'function';
  });

  return function composition(state, action) {
    if (state === undefined) state = {};

    return _utilsMapValues2['default'](finalReducers, function (reducer, key) {
      var newState = reducer(state[key], action);
      _invariant2['default'](typeof newState !== 'undefined', getErrorMessage(key, action));
      return newState;
    });
  };
}

module.exports = exports['default'];