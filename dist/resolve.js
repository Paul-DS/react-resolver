var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from "react";

import Resolver from "./Resolver";

const capitalize = word => {
  return word.replace(/^./, letter => letter.toUpperCase());
};

export default function resolve(prop, promise) {
  const asyncProps = arguments.length === 1 ? prop : { [prop]: promise };
  const asyncNames = Object.keys(asyncProps).map(capitalize).join("");

  return function resolveDecorator(Component) {
    var _class, _temp;

    return _temp = _class = class PropResolver extends React.Component {

      render() {
        return React.createElement(
          Resolver,
          { props: this.props, resolve: asyncProps },
          resolved => React.createElement(Component, _extends({}, this.props, resolved))
        );
      }
    }, _class.displayName = `${asyncNames}Resolver`, _temp;
  };
}