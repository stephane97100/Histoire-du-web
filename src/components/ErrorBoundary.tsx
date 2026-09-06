/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught Error in Component:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-2xl mx-auto my-12 bg-slate-900 border border-slate-800 rounded-2xl text-left shadow-2xl">
          <div className="flex items-center gap-3 text-red-400 mb-4">
            <AlertTriangle className="w-8 h-8 shrink-0" />
            <div>
              <h2 className="text-lg font-bold text-white">Une erreur d'affichage est survenue</h2>
              <p className="text-xs text-slate-400">Le module a rencontré une exception inattendue.</p>
            </div>
          </div>
          <div className="bg-black/80 p-4 rounded-xl font-mono text-xs text-red-300 overflow-x-auto mb-6 border border-slate-800">
            {this.state.error?.toString() || 'Erreur inconnue'}
          </div>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Recharger l'application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
