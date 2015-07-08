'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = applyMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _composeMiddleware = require('./composeMiddleware');

var _composeMiddleware2 = _interopRequireDefault(_composeMiddleware);

var _middlewareThunk = require('../middleware/thunk');

var _middlewareThunk2 = _interopRequireDefault(_middlewareThunk);

/**
 * Creates a higher-order store that applies middleware to a store's dispatch.
 * Because middleware is potentially asynchronous, this should be the first
 * higher-order store in the composition chain.
 * @param {...Function} ...middlewares
 * @return {Function} A higher-order store
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  var finalMiddlewares = middlewares.length ? middlewares : [_middlewareThunk2['default']];

  return function (next) {
    return function () {
      var store = next.apply(undefined, arguments);
      var methods = {
        dispatch: store.dispatch,
        getState: store.getState
      };
      return _extends({}, store, {
        dispatch: _compose2['default'](_composeMiddleware2['default'].apply(undefined, finalMiddlewares)(methods), store.dispatch)
      });
    };
  };
}

module.exports = exports['default'];