import React, { useState, useMemo, useEffect } from 'react';
import { Article, CategoryId, GreenEvent } from '../types';
import { CATEGORIES } from '../data/mockData';
import { Breadcrumb } from './Breadcrumb';
import { Pagination } from './Pagination';
import { Clock, Calendar, MapPin, Users, ArrowUpRight, Leaf, Search, Filter, Tag, RefreshCw } from 'lucide-react';

interface CategoryViewProps {
  category: CategoryId;
  articles: Article[];
  events: GreenEvent[];
  onSelectArticle: (article: Article) => void;
  onOpenAiModal: () => void;
  onSelectCategory: (id: CategoryId) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  articles,
  events,
  onSelectArticle,
  onOpenAiModal,
  onSelectCategory,
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 6;

  const categoryInfo = CATEGORIES.find((c) => c.id === category) || {
    id: category,
    name: 'Chuyên mục',
    description: 'Tin tức & bài viết chọn lọc từ Trạm Xanh',
  };

  const isEvents = category === 'su-kien';

  // Extract all unique tags in this category
  const categoryTags = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [articles]);

  // Filter articles inside category
  const filteredCategoryArticles = useMemo(() => {
    let result = articles;

    if (selectedTag) {
      result = result.filter((a) => a.tags.includes(selectedTag));
    }

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [articles, selectedTag, searchFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCategoryArticles.length / itemsPerPage);
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCategoryArticles.slice(start, start + itemsPerPage);
  }, [filteredCategoryArticles, currentPage]);

  // Simulate skeleton loading on page or filter change
  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    window.scrollTo({ top: 250, behavior: 'smooth' });
    setTimeout(() => setIsLoading(false), 250);
  };

  const handleTagClick = (tag: string) => {
    setIsLoading(true);
    setSelectedTag(selectedTag === tag ? null : tag);
    setCurrentPage(1);
    setTimeout(() => setIsLoading(false), 200);
  };

  const handleSearchChange = (val: string) => {
    setSearchFilter(val);
    setCurrentPage(1);
  };

  // Reset page if category changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedTag(null);
    setSearchFilter('');
  }, [category]);

  return (
    <div className="py-8 bg-white min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          categoryName={categoryInfo.name}
          categoryId={category}
          onSelectCategory={onSelectCategory}
        />

        {/* Category Header Banner */}
        <div className="bg-[#F8F9FA] border border-gray-200 p-8 sm:p-10 rounded-3xl space-y-4 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#E8F8EA] rounded-l-full opacity-40 pointer-events-none hidden md:block"></div>

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E7D32] text-white text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" />
              <span>Tạp chí điện tử Trạm Xanh</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#212121] tracking-tight">
              Chuyên mục: {categoryInfo.name}
            </h1>
            
            <p className="text-gray-700 text-sm sm:text-base max-w-2xl leading-relaxed">
              {categoryInfo.description}
            </p>
          </div>
        </div>

        {/* Search & Tag Filter Bar (for Article categories) */}
        {!isEvents && (
          <div className="p-4 sm:p-6 bg-[#F8F9FA] rounded-2xl border border-gray-200 space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              
              {/* Search input in category */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={`Tìm kiếm trong chuyên mục ${categoryInfo.name}...`}
                  value={searchFilter}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] transition-all"
                />
                {searchFilter && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700 underline"
                  >
                    Xóa
                  </button>
                )}
              </div>

              {/* Reset filter button */}
              {(selectedTag || searchFilter) && (
                <button
                  onClick={() => {
                    setSelectedTag(null);
                    setSearchFilter('');
                    setCurrentPage(1);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border border-gray-300 hover:border-red-500 text-xs font-semibold text-gray-700 hover:text-red-600 rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Xóa bộ lọc</span>
                </button>
              )}

            </div>

            {/* Filter Tags */}
            {categoryTags.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
                <span className="flex items-center gap-1 font-bold text-gray-500 shrink-0 mr-1">
                  <Filter className="w-3.5 h-3.5 text-[#2E7D32]" /> Bộ lọc từ khóa:
                </span>

                {categoryTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                      selectedTag === tag
                        ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-xs'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#2E7D32] hover:bg-[#E8F8EA]'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content Section */}
        {isEvents ? (
          /* Events List Layout */
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#212121] pb-2 border-b border-gray-200">
              Sự kiện &amp; Chiến dịch hành động xanh
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                      <img
                        src={ev.imageUrl}
                        alt={ev.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#2E7D32] text-white text-xs px-2.5 py-1 rounded-md font-bold">
                        Sự kiện nổi bật
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-bold text-[#212121] leading-snug">
                        {ev.title}
                      </h3>

                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {ev.description}
                      </p>

                      <div className="pt-2 space-y-2 text-xs text-gray-600 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#2E7D32] shrink-0" />
                          <span className="font-semibold text-gray-800">{ev.date}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                          <span>{ev.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#2E7D32] shrink-0" />
                          <span>{ev.participantsCount}+ Đã đăng ký tham gia</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={onOpenAiModal}
                      className="w-full bg-[#E8F8EA] hover:bg-[#2E7D32] text-[#2E7D32] hover:text-white font-semibold py-2.5 rounded-xl text-xs transition-colors duration-200 cursor-pointer"
                    >
                      Hỏi AI Trạm Trưởng về sự kiện này
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Standard Article Grid with Pagination & Skeleton Loading */
          <div className="space-y-8">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#212121]">
                Danh sách bài viết {filteredCategoryArticles.length > 0 && `(${filteredCategoryArticles.length})`}
              </h2>
              {selectedTag && (
                <span className="text-xs text-[#2E7D32] font-semibold bg-[#E8F8EA] px-2.5 py-1 rounded-md">
                  Đang lọc thẻ: #{selectedTag}
                </span>
              )}
            </div>

            {/* Skeleton Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="bg-white border border-gray-200 rounded-2xl p-4 space-y-4 animate-pulse">
                    <div className="bg-gray-200 aspect-16/10 rounded-xl"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-100 rounded w-full"></div>
                    <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                    <div className="h-8 bg-gray-200 rounded-lg w-1/3 pt-2"></div>
                  </div>
                ))}
              </div>
            ) : filteredCategoryArticles.length === 0 ? (
              <div className="text-center py-16 bg-[#F8F9FA] rounded-2xl space-y-3 border border-gray-200">
                <Leaf className="w-12 h-12 text-[#2E7D32] mx-auto opacity-40" />
                <p className="text-gray-700 font-medium">Không tìm thấy bài viết nào phù hợp với bộ lọc hiện tại.</p>
                <button
                  onClick={() => {
                    setSelectedTag(null);
                    setSearchFilter('');
                  }}
                  className="text-xs text-[#2E7D32] hover:underline font-bold cursor-pointer"
                >
                  Xóa tất cả bộ lọc để xem toàn bộ bài viết
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedArticles.map((art) => (
                    <article
                      key={art.id}
                      onClick={() => onSelectArticle(art)}
                      className="bg-white border border-gray-200 hover:border-[#2E7D32] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                          <img
                            src={art.imageUrl}
                            alt={art.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3 bg-[#2E7D32] text-white text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider">
                            {art.categoryName}
                          </div>
                        </div>

                        <div className="p-6 space-y-3">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{art.publishedAt}</span>
                            <span className="flex items-center gap-1 font-semibold text-[#2E7D32]">
                              <Clock className="w-3 h-3" /> {art.readTime}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-[#212121] group-hover:text-[#2E7D32] transition-colors line-clamp-2 leading-snug">
                            {art.title}
                          </h3>

                          <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                            {art.excerpt}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 pt-2">
                            {art.tags.slice(0, 3).map((t, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-700">
                          {art.author.name}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#E8F8EA] text-[#2E7D32] flex items-center justify-center group-hover:bg-[#2E7D32] group-hover:text-white transition-colors">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination Controls */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={filteredCategoryArticles.length}
                  itemsPerPage={itemsPerPage}
                />
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
