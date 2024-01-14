import { Component, ErrorInfo, ReactElement } from "react";
import { Link } from "react-router-dom";
// we can still create Props interface or use {children: ReactElement} since we just need children
class ErrorBoudary extends Component<{children: ReactElement}> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  compoponentDidCatch(error: Error, info : ErrorInfo) {
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
