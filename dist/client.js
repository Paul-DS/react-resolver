"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = client;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Resolver = require("./Resolver");

var _Resolver2 = _interopRequireDefault(_Resolver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function client(Loader) {
  return function clientDecorator(Component) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
      _inherits(ClientResolver, _Component);

      function ClientResolver(props, context) {
        _classCallCheck(this, ClientResolver);

        var _this = _possibleConstructorReturn(this, (ClientResolver.__proto__ || Object.getPrototypeOf(ClientResolver)).call(this, props, context));

        _this.enqueue = _this.enqueue.bind(_this);
        _this.queue = [];
        _this.state = {
          bypass: process.env.NODE_ENV === "test",
          loaded: false,
          server: true
        };
        return _this;
      }

      _createClass(ClientResolver, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.setState({ server: false }, function () {
            var _this2 = this;

            Promise.all(this.queue).then(function () {
              return _this2.setState({ loaded: true });
            });
          });
        }
      }, {
        key: "enqueue",
        value: function enqueue(promise) {
          this.queue.push(promise);
          return promise;
        }
      }, {
        key: "render",
        value: function render() {
          var _this3 = this;

          var _state = this.state,
              bypass = _state.bypass,
              loaded = _state.loaded,
              server = _state.server;


          var loader = Loader ? _react2.default.createElement(Loader, null) : null;

          if (server) {
            return loader;
          }

          if (bypass || loaded) {
            return _react2.default.createElement(Component, this.props);
          }

          return _react2.default.createElement(
            "div",
            null,
            loader,
            _react2.default.createElement(
              "div",
              { style: { display: "none" } },
              _react2.default.createElement(
                _Resolver2.default,
                { onResolve: this.enqueue },
                function (resolved) {
                  return _react2.default.createElement(Component, _extends({}, _this3.props, resolved));
                }
              )
            )
          );
        }
      }]);

      return ClientResolver;
    }(Component), _class.displayName = "ClientResolver", _class.childContextTypes = {
      resolver: _propTypes2.default.instanceOf(_Resolver2.default)
    }, _class.contextTypes = {
      resolver: _propTypes2.default.instanceOf(_Resolver2.default)
    }, _temp;
  };
}