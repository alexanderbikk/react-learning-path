import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoudary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  compoponentDidCatch(error, info) {
    console.error("ErrorBoudary component caught error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error <Link to="/">Click to go home</Link>
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoudary;
