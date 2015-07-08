'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = createConnector;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _utilsCreateStoreShape = require('../utils/createStoreShape');

var _utilsCreateStoreShape2 = _interopRequireDefault(_utilsCreateStoreShape);

var _utilsIdentity = require('../utils/identity');

var _utilsIdentity2 = _interopRequireDefault(_utilsIdentity);

var _utilsShallowEqual = require('../utils/shallowEqual');

var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

var _utilsIsPlainObject = require('../utils/isPlainObject');

var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function createConnector(React) {
  var Component = React.Component;
  var PropTypes = React.PropTypes;

  var storeShape = _utilsCreateStoreShape2['default'](PropTypes);

  return (function (_Component) {
    function Connector(props, context) {
      _classCallCheck(this, Connector);

      _Component.call(this, props, context);
      this.state = this.selectState(props, context);
    }

    _inherits(Connector, _Component);

    Connector.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
      return !this.isSliceEqual(this.state.slice, nextState.slice) || !_utilsShallowEqual2['default'](this.props, nextProps);
    };

    Connector.prototype.isSliceEqual = function isSliceEqual(slice, nextSlice) {
      var isRefEqual = slice === nextSlice;
      if (isRefEqual) {
        return true;
      } else if (typeof slice !== 'object' || typeof nextSlice !== 'object') {
        return isRefEqual;
      }
      return _utilsShallowEqual2['default'](slice, nextSlice);
    };

    Connector.prototype.componentDidMount = function componentDidMount() {
      this.unsubscribe = this.context.store.subscribe(this.handleChange.bind(this));
    };

    Connector.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (nextProps.select !== this.props.select) {
        // Force the state slice recalculation
        this.handleChange(nextProps);
      }
    };

    Connector.prototype.componentWillUnmount = function componentWillUnmount() {
      this.unsubscribe();
    };

    Connector.prototype.handleChange = function handleChange() {
      var props = arguments[0] === undefined ? this.props : arguments[0];

      var nextState = this.selectState(props, this.context);
      this.setState(nextState);
    };

    Connector.prototype.selectState = function selectState(props, context) {
      var state = context.store.getState();
      var slice = props.select(state);

      _invariant2['default'](_utilsIsPlainObject2['default'](slice), 'The return value of `select` prop must be an object. Instead received %s.', slice);

      return { slice: slice };
    };

    Connector.prototype.render = function render() {
      var children = this.props.children;
      var slice = this.state.slice;
      var dispatch = this.context.store.dispatch;

      return children(_extends({ dispatch: dispatch }, slice));
    };

    _createClass(Connector, null, [{
      key: 'contextTypes',
      value: {
        store: storeShape.isRequired
      },
      enumerable: true
    }, {
      key: 'propTypes',
      value: {
        children: PropTypes.func.isRequired,
        select: PropTypes.func.isRequired
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        select: _utilsIdentity2['default']
      },
      enumerable: true
    }]);

    return Connector;
  })(Component);
}

module.exports = exports['default'];