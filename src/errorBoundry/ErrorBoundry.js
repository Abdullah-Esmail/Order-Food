import { Component } from "react";

class ErrorBoundry extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // this what will happen if something go wrong
      // with compnents inside this boundry error compnent.
      return console.log(`${this.props.errorMsg}`);
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
