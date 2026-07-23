import React from 'react';
import { Leaf, Home, ArrowLeft } from 'lucide-react';

interface NotFoundViewProps {
  onGoHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F9FA] px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-md">
        <div className="w-20 h-20 rounded-3xl bg-[#E8F8EA] text-[#2E7D32] flex items-center justify-center mx-auto shadow-xs">
          <Leaf className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2E7D32]">
            Lỗi 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Không tìm thấy trang
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
            Trang hoặc đường dẫn bạn truy cập không tồn tại hoặc đã được di chuyển sang địa chỉ khác trên Trạm Xanh.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onGoHome}
            aria-label="Quay về Trang chủ"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#1b5e20] text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-200 shadow-xs cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#2E7D32] min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            <span>Quay về Trang chủ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
