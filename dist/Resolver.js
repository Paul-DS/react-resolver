"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _server = require("react-dom/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-underscore-dangle */

var ID = "ReactResolver.ID";
var CHILDREN = "ReactResolver.CHILDREN";
var HAS_RESOLVED = "ReactResolver.HAS_RESOLVED";
var IS_CLIENT = "ReactResolver.IS_CLIENT";
var PAYLOAD = "__REACT_RESOLVER_PAYLOAD__";

var Resolver = function (_React$Component) {
  _inherits(Resolver, _React$Component);

  function Resolver(props, context) {
    _classCallCheck(this, Resolver);

    // Internal tracking variables
    var _this = _possibleConstructorReturn(this, (Resolver.__proto__ || Object.getPrototypeOf(Resolver)).call(this, props, context));

    _this[ID] = _this.generateId();
    _this[CHILDREN] = [];
    _this[HAS_RESOLVED] = false;
    _this[IS_CLIENT] = false;

    _this.state = _this.computeState(_this.props, {
      pending: {},
      resolved: _this.cached() || {}
    });

    if (_this.isPending(_this.state)) {
      _this.resolve(_this.state);
      _this[HAS_RESOLVED] = false;
    } else {
      _this[HAS_RESOLVED] = true;
    }
    return _this;
  }

  _createClass(Resolver, [{
    key: "cached",
    value: function cached() {
      var resolver = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;

      var id = resolver[ID];

      if (this.props.data.hasOwnProperty(id)) {
        return _extends({}, this.props.data[id]);
      } else if (this.context.resolver) {
        return this.context.resolver.cached(resolver);
      }
    }
  }, {
    key: "clearData",
    value: function clearData() {
      var resolver = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;

      var id = resolver[ID];

      if (this.props.data.hasOwnProperty(id)) {
        delete this.props.data[id];
      } else if (this.context.resolver) {
        return this.context.resolver.clearData(resolver);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this[IS_CLIENT] = true;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var cleanState = {
        pending: {},
        resolved: {}
      };

      var _computeState = this.computeState(nextProps, cleanState),
          pending = _computeState.pending,
          resolved = _computeState.resolved;

      // Next state will resolve async props again, but update existing sync props


      var nextState = {
        pending: pending,
        resolved: _extends({}, this.state.resolved, resolved)
      };

      this.setAtomicState(nextState);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._unmounted = true;
    }
  }, {
    key: "computeState",
    value: function computeState(thisProps, nextState) {
      var props = thisProps.props,
          resolve = thisProps.resolve;


      Object.keys(resolve).forEach(function (name) {
        // Ignore existing supplied props or existing resolved values
        if (!nextState.resolved.hasOwnProperty(name)) {
          var factory = resolve[name];
          var value = factory(props);
          var isPromise = value instanceof Promise || ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value !== null || typeof value === "function") && typeof value.then === "function";

          if (isPromise) {
            nextState.pending[name] = value;
          } else {
            // Synchronous values are immediately assigned
            nextState.resolved[name] = value;
          }
        }
      });

      return nextState;
    }
  }, {
    key: "generateId",
    value: function generateId() {
      var resolver = this.context.resolver;


      if (!resolver) {
        return ".0";
      }

      var id = resolver[ID] + "." + resolver[CHILDREN].length;

      if (resolver && resolver[CHILDREN].indexOf(this) === -1) {
        resolver[CHILDREN].push(this);
      }

      return id;
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return { resolver: this };
    }
  }, {
    key: "isPending",
    value: function isPending() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state;

      return Object.keys(state.pending).length > 0;
    }
  }, {
    key: "isParentPending",
    value: function isParentPending() {
      var resolver = this.context.resolver;


      if (resolver) {
        return resolver.isPending() || resolver.isParentPending();
      }

      return false;
    }
  }, {
    key: "onResolve",
    value: function onResolve(state) {
      if (this.props.onResolve) {
        return this.props.onResolve(state);
      } else if (this.context.resolver) {
        return this.context.resolver.onResolve(state);
      } else {
        return state;
      }
    }
  }, {
    key: "render",
    value: function render() {
      // Avoid rendering until ready
      if (!this[HAS_RESOLVED]) {
        return false;
      }

      // If render is called again (e.g. hot-reloading), re-resolve
      if (this.isPending(this.state)) {
        this.resolve(this.state);
      }

      // Both those props provided by parent & dynamically resolved
      return this.props.children(_extends({}, this.props.props, this.state.resolved));
    }
  }, {
    key: "resolve",
    value: function resolve(state) {
      var _this2 = this;

      var pending = Object.keys(state.pending).map(function (name) {
        var promise = state.pending[name];

        return { name: name, promise: promise };
      });

      var promises = pending.map(function (_ref) {
        var promise = _ref.promise;
        return promise;
      });

      var resolving = Promise.all(promises).then(function (values) {
        var id = _this2[ID];
        var resolved = values.reduce(function (resolved, value, i) {
          var name = pending[i].name;


          resolved[name] = value;

          return resolved;
        }, {});

        return { id: id, resolved: resolved };
      });

      // Resolve listeners get the current ID + resolved
      resolving = this.onResolve(resolving);

      // Update current component with new data (on client)
      resolving.then(function (_ref2) {
        var resolved = _ref2.resolved;

        _this2[HAS_RESOLVED] = true;

        if (!_this2[IS_CLIENT]) {
          return false;
        }

        var nextState = {
          pending: {},
          resolved: _extends({}, state.resolved, resolved)
        };

        _this2.setAtomicState(nextState);
      });
    }
  }, {
    key: "setAtomicState",
    value: function setAtomicState(nextState) {
      if (this._unmounted) {
        return;
      }

      this.setState(nextState);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      // Prevent updating when parent is changing values
      if (this.isParentPending()) {
        return false;
      }

      // Prevent rendering until pending values are resolved
      if (this.isPending(nextState)) {
        this.resolve(nextState);

        return false;
      }

      // Update if we have resolved successfully
      return this[HAS_RESOLVED];
    }
  }]);

  return Resolver;
}(_react2.default.Component);

Resolver.childContextTypes = {
  resolver: _propTypes2.default.instanceOf(Resolver)
};
Resolver.contextTypes = {
  resolver: _propTypes2.default.instanceOf(Resolver)
};
Resolver.defaultProps = {
  data: {},
  props: {},
  resolve: {}
};
Resolver.displayName = "Resolver";
Resolver.propTypes = {
  children: _propTypes2.default.func.isRequired,
  data: _propTypes2.default.object.isRequired,
  props: _propTypes2.default.object,
  resolve: _propTypes2.default.object
};

Resolver.render = function (render, node) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window[PAYLOAD];

  _reactDom2.default.render(_react2.default.createElement(
    Resolver,
    { data: data },
    render
  ), node);

  delete window[PAYLOAD];
};

Resolver.resolve = function (_render) {
  var initialData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var queue = [];

  (0, _server.renderToStaticMarkup)(_react2.default.createElement(
    Resolver,
    { data: initialData, onResolve: function onResolve(promise) {
        queue.push(promise);
        return Promise.resolve(true);
      } },
    _render
  ));

  return Promise.all(queue).then(function (results) {
    var data = _extends({}, initialData);

    results.forEach(function (_ref3) {
      var id = _ref3.id,
          resolved = _ref3.resolved;
      return data[id] = resolved;
    });

    if (Object.keys(initialData).length < Object.keys(data).length) {
      return Resolver.resolve(_render, data);
    }

    var Resolved = function (_React$Component2) {
      _inherits(Resolved, _React$Component2);

      function Resolved() {
        _classCallCheck(this, Resolved);

        return _possibleConstructorReturn(this, (Resolved.__proto__ || Object.getPrototypeOf(Resolved)).apply(this, arguments));
      }

      _createClass(Resolved, [{
        key: "render",
        value: function render() {
          return _react2.default.createElement(
            Resolver,
            { data: data },
            _render
          );
        }
      }]);

      return Resolved;
    }(_react2.default.Component);

    Resolved.displayName = "Resolved";


    return { data: data, Resolved: Resolved };
  });
};

exports.default = Resolver;