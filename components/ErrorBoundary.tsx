'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">出錯了</h2>
            <p className="mt-2 text-gray-600">請刷新頁面重試</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 mt-4 text-white rounded-md bg-primary hover:bg-primary/90"
            >
              刷新頁面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 