var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import PropTypes from "prop-types";
import React from "react";

import Resolver from "./Resolver";

export default function client(Loader) {
  return function clientDecorator(Component) {
    var _class, _temp;

    return _temp = _class = class ClientResolver extends Component {

      constructor(props, context) {
        super(props, context);

        this.enqueue = this.enqueue.bind(this);
        this.queue = [];
        this.state = {
          bypass: process.env.NODE_ENV === "test",
          loaded: false,
          server: true
        };
      }

      componentDidMount() {
        this.setState({ server: false }, function () {
          Promise.all(this.queue).then(() => this.setState({ loaded: true }));
        });
      }

      enqueue(promise) {
        this.queue.push(promise);
        return promise;
      }

      render() {
        const { bypass, loaded, server } = this.state;

        const loader = Loader ? React.createElement(Loader, null) : null;

        if (server) {
          return loader;
        }

        if (bypass || loaded) {
          return React.createElement(Component, this.props);
        }

        return React.createElement(
          "div",
          null,
          loader,
          React.createElement(
            "div",
            { style: { display: "none" } },
            React.createElement(
              Resolver,
              { onResolve: this.enqueue },
              resolved => React.createElement(Component, _extends({}, this.props, resolved))
            )
          )
        );
      }
    }, _class.displayName = `ClientResolver`, _class.childContextTypes = {
      resolver: PropTypes.instanceOf(Resolver)
    }, _class.contextTypes = {
      resolver: PropTypes.instanceOf(Resolver)
    }, _temp;
  };
}