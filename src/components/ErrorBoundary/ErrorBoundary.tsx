/**
 * This is component which will prevent your app is cracked when something wrong
 * with typescript.
 * This component is similar with try-catch wrapper
 */

import React from "react";
import { Component, ErrorInfo, isValidElement, ReactNode } from "react";

interface IErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface IErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return isValidElement(this.props.fallback) ? (
        this.props.fallback
      ) : (
        <div className="p-2 bg-red-200 border border-red-600 rounded-lg">
          <h2 className="font-semibold text-red-600 text-xxl text-primary-1">
            Has error was occurred!
          </h2>
          <p className="text-lg font-bold text-gray-900">
            {this.state.error && this.state.error.toString()}
          </p>
          <textarea
            className="bg-transparent focus:outline-none w-full min-h-[300px]"
            defaultValue={this.state.errorInfo.componentStack}
          />
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
