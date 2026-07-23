import React from 'react';
import { Article } from '../types';
import { Clock, TrendingUp, ChevronRight, User } from 'lucide-react';

interface FeaturedNewsProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const FeaturedNews: React.FC<FeaturedNewsProps> = ({
  articles,
  onSelectArticle,
}) => {
  if (!articles || articles.length === 0) return null;

  const leadArticle = articles[0];
  const sideArticles = articles.slice(1, 5); // 4 sub-articles

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-7 bg-[#2E7D32] rounded-full"></div>
            <h2 className="text-2xl font-bold text-[#212121] tracking-tight">
              Tin nổi bật
            </h2>
            <span className="ml-2 px-2.5 py-0.5 rounded-full bg-[#E8F8EA] text-[#2E7D32] text-xs font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Nóng trong ngày
            </span>
          </div>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Lead Story (Left Col - 7 cols) */}
          <div className="lg:col-span-7 group cursor-pointer" onClick={() => onSelectArticle(leadArticle)}>
            <div className="bg-[#F8F9FA] rounded-2xl overflow-hidden border border-gray-200 hover:border-[#2E7D32] hover:shadow-md transition-all duration-300 flex flex-col h-full">
              
              {/* Image */}
              <div className="relative aspect-16/10 overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={leadArticle.imageUrl}
                  alt={leadArticle.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#2E7D32] text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-xs">
                  {leadArticle.categoryName}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1 text-gray-700 font-semibold">
                      <User className="w-3.5 h-3.5 text-[#2E7D32]" />
                      {leadArticle.author.name}
                    </span>
                    <span>•</span>
                    <span>{leadArticle.publishedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {leadArticle.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#212121] group-hover:text-[#2E7D32] transition-colors leading-snug">
                    {leadArticle.title}
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base line-clamp-3 leading-relaxed">
                    {leadArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Chuyên mục: {leadArticle.categoryName}</span>
                  <button className="inline-flex items-center gap-1 text-[#2E7D32] font-bold text-xs group-hover:translate-x-1 transition-transform cursor-pointer bg-[#E8F8EA] px-3 py-1.5 rounded-lg">
                    <span>Đọc tiếp</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* 4 Side Highlights (Right Col - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {sideArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group cursor-pointer p-3.5 rounded-xl bg-[#F8F9FA] hover:bg-white border border-gray-200 hover:border-[#2E7D32] hover:shadow-xs transition-all duration-200 flex gap-4 items-center"
              >
                {/* Thumbnail */}
                <div className="w-28 h-24 rounded-lg overflow-hidden shrink-0 bg-gray-100 relative">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                    {article.categoryName}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 space-y-1.5">
                  <h4 className="text-xs sm:text-sm font-bold text-[#212121] group-hover:text-[#2E7D32] line-clamp-2 leading-snug transition-colors">
                    {article.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span>{article.publishedAt}</span>
                    <span className="text-[#2E7D32] font-semibold flex items-center gap-0.5 group-hover:underline">
                      Đọc tiếp <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
