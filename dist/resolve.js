"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = resolve;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Resolver = require("./Resolver");

var _Resolver2 = _interopRequireDefault(_Resolver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var capitalize = function capitalize(word) {
  return word.replace(/^./, function (letter) {
    return letter.toUpperCase();
  });
};

function resolve(prop, promise) {
  var asyncProps = arguments.length === 1 ? prop : _defineProperty({}, prop, promise);
  var asyncNames = Object.keys(asyncProps).map(capitalize).join("");

  return function resolveDecorator(Component) {
    var _class, _temp;

    return _temp = _class = function (_React$Component) {
      _inherits(PropResolver, _React$Component);

      function PropResolver() {
        _classCallCheck(this, PropResolver);

        return _possibleConstructorReturn(this, (PropResolver.__proto__ || Object.getPrototypeOf(PropResolver)).apply(this, arguments));
      }

      _createClass(PropResolver, [{
        key: "render",
        value: function render() {
          var _this2 = this;

          return _react2.default.createElement(
            _Resolver2.default,
            { props: this.props, resolve: asyncProps },
            function (resolved) {
              return _react2.default.createElement(Component, _extends({}, _this2.props, resolved));
            }
          );
        }
      }]);

      return PropResolver;
    }(_react2.default.Component), _class.displayName = asyncNames + "Resolver", _temp;
  };
}