var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import PropTypes from "prop-types";
import React from "react";

export default function context(name, type = PropTypes.any.isRequired) {
  return function contextDecorator(Component) {
    class ContextDecorator extends React.Component {

      render() {
        return React.createElement(Component, _extends({}, this.context, this.props));
      }
    }

    ContextDecorator.contextTypes = {
      [name]: type
    };
    ContextDecorator.displayName = "ContextDecorator";
    return ContextDecorator;
  };
}