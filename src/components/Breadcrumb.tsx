import React from 'react';
import { CategoryId } from '../types';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  categoryName?: string;
  categoryId?: CategoryId;
  articleTitle?: string;
  onSelectCategory: (id: CategoryId) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  categoryName,
  categoryId,
  articleTitle,
  onSelectCategory,
}) => {
  return (
    <nav className="flex items-center text-xs text-gray-500 py-2 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
      <button
        onClick={() => onSelectCategory('trang-chu')}
        className="flex items-center gap-1 hover:text-[#2E7D32] transition-colors cursor-pointer font-medium"
      >
        <Home className="w-3.5 h-3.5 text-[#2E7D32]" />
        <span>Trang chủ</span>
      </button>

      {categoryName && (
        <>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-gray-400 shrink-0" />
          {categoryId && !articleTitle ? (
            <span className="font-bold text-[#2E7D32] bg-[#E8F8EA] px-2 py-0.5 rounded-md">
              {categoryName}
            </span>
          ) : (
            <button
              onClick={() => categoryId && onSelectCategory(categoryId)}
              className="hover:text-[#2E7D32] transition-colors cursor-pointer font-medium"
            >
              {categoryName}
            </button>
          )}
        </>
      )}

      {articleTitle && (
        <>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-gray-400 shrink-0" />
          <span className="font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-[320px]">
            {articleTitle}
          </span>
        </>
      )}
    </nav>
  );
};
