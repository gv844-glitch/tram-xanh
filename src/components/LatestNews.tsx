import React from 'react';
import { Article } from '../types';
import { Clock, ChevronRight, User } from 'lucide-react';

interface LatestNewsProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const LatestNews: React.FC<LatestNewsProps> = ({
  articles,
  onSelectArticle,
}) => {
  return (
    <section className="py-12 bg-[#F8F9FA]/80 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-7 bg-[#2E7D32] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#212121] tracking-tight">
              Tin mới nhất
            </h2>
          </div>
          <span className="text-xs text-gray-500 font-medium">
            Tất cả bài viết chọn lọc từ Trạm Xanh
          </span>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#2E7D32] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#2E7D32] text-white px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-xs">
                    {article.categoryName}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-3">
                  
                  {/* Read Time & Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1 font-medium text-gray-700">
                      <User className="w-3.5 h-3.5 text-[#2E7D32]" /> {article.author.name}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[#2E7D32] bg-[#E8F8EA] px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#212121] group-hover:text-[#2E7D32] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>

                </div>
              </div>

              {/* Card Footer with Explicit "Đọc tiếp" Button */}
              <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                <span className="text-[11px] text-gray-400 font-medium">
                  {article.publishedAt}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectArticle(article);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#2E7D32] bg-[#E8F8EA] hover:bg-[#2E7D32] hover:text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Đọc tiếp</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
