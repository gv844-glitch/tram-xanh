import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 bg-[#F8F9FA]">
          <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-md space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-gray-900">
                Đã xảy ra lỗi. Vui lòng thử lại.
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Hệ thống tạm thời không phản hồi. Bạn vui lòng bấm nút bên dưới để tải lại trang.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              aria-label="Thử lại"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#1b5e20] text-white px-5 py-3 rounded-2xl font-bold text-sm transition-colors shadow-xs cursor-pointer min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Thử lại</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
