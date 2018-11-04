"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = context;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function context(name) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _propTypes2.default.any.isRequired;

  return function contextDecorator(Component) {
    var ContextDecorator = function (_React$Component) {
      _inherits(ContextDecorator, _React$Component);

      function ContextDecorator() {
        _classCallCheck(this, ContextDecorator);

        return _possibleConstructorReturn(this, (ContextDecorator.__proto__ || Object.getPrototypeOf(ContextDecorator)).apply(this, arguments));
      }

      _createClass(ContextDecorator, [{
        key: "render",
        value: function render() {
          return _react2.default.createElement(Component, _extends({}, this.context, this.props));
        }
      }]);

      return ContextDecorator;
    }(_react2.default.Component);

    ContextDecorator.contextTypes = _defineProperty({}, name, type);
    ContextDecorator.displayName = "ContextDecorator";


    return ContextDecorator;
  };
}