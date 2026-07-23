import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { FeaturedNews } from './components/FeaturedNews';
import { LatestNews } from './components/LatestNews';
import { CategoriesSection } from './components/CategoriesSection';
import { AiIntroSection } from './components/AiIntroSection';
import { CategoryView } from './components/CategoryView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { AiTramTruongView } from './components/AiTramTruongView';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { NotFoundView } from './components/NotFoundView';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ARTICLES, EVENTS, CATEGORIES } from './data/mockData';
import { Article, CategoryId } from './types';
import { updateSEO } from './utils/seo';
import { SearchX } from 'lucide-react';

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<CategoryId>('trang-chu');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiInitialQuestion, setAiInitialQuestion] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [is404, setIs404] = useState(false);

  // Sync initial URL path on page load & popstate history navigation
  useEffect(() => {
    const handleLocationChange = () => {
      const pathSegments = window.location.pathname
        .split('/')
        .filter(Boolean)
        .map((s) => decodeURIComponent(s));

      setIs404(false);

      if (pathSegments.length === 0 || pathSegments[0] === 'trang-chu') {
        setCurrentCategory('trang-chu');
        setSelectedArticle(null);
      } else if (pathSegments[0] === 'ai-tram-truong') {
        setCurrentCategory('ai-tram-truong');
        setSelectedArticle(null);
      } else if (pathSegments[0] === 'gioi-thieu') {
        setCurrentCategory('gioi-thieu');
        setSelectedArticle(null);
      } else if (pathSegments[0] === 'lien-he') {
        setCurrentCategory('lien-he');
        setSelectedArticle(null);
      } else {
        const validCats: CategoryId[] = [
          'tin-tuc',
          'song-xanh',
          'cong-nghe-xanh',
          'cau-chuyen-xanh',
          'su-kien',
        ];

        const cat = pathSegments[0] as CategoryId;
        if (validCats.includes(cat)) {
          setCurrentCategory(cat);

          // Check if article slug is present: e.g., /tin-tuc/phan-loai-rac-tai-gia-dinh
          if (pathSegments.length > 1) {
            const articleSlugOrId = pathSegments[1];
            const foundArt = ARTICLES.find(
              (a) => a.slug === articleSlugOrId || a.id === articleSlugOrId
            );

            if (foundArt) {
              setSelectedArticle(foundArt);
            } else {
              setIs404(true);
            }
          } else {
            setSelectedArticle(null);
          }
        } else {
          setIs404(true);
        }
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Dynamically update SEO meta tags based on view or selected article
  useEffect(() => {
    if (is404) {
      updateSEO({
        title: 'Không tìm thấy trang',
        description: 'Trang bạn tìm kiếm không tồn tại trên Trạm Xanh.',
      });
      return;
    }

    if (selectedArticle) {
      updateSEO({
        title: selectedArticle.title,
        description: selectedArticle.excerpt,
        image: selectedArticle.imageUrl,
        type: 'article',
      });
      return;
    }

    if (currentCategory === 'trang-chu') {
      updateSEO({
        title: 'Tạp chí Tin tức Môi trường & Lối sống xanh',
        description:
          'Trạm Xanh - Điểm dừng để hiểu hơn, sống xanh hơn. Tạp chí tin tức sinh thái, công nghệ xanh, phát triển bền vững và trợ lý AI Trạm Trưởng.',
      });
    } else if (currentCategory === 'ai-tram-truong') {
      updateSEO({
        title: 'AI Trạm Trưởng - Trợ lý Môi trường & Sống Xanh',
        description:
          'Hỏi đáp trực tiếp với AI Trạm Trưởng về phân loại rác, năng lượng mặt trời, lối sống xanh và biến đổi khí hậu.',
      });
    } else if (currentCategory === 'gioi-thieu') {
      updateSEO({
        title: 'Giới thiệu về Trạm Xanh',
        description:
          'Sứ mệnh và tầm nhìn của Trạm Xanh - Tạp chí điện tử môi trường và lối sống xanh hàng đầu Việt Nam.',
      });
    } else if (currentCategory === 'lien-he') {
      updateSEO({
        title: 'Liên hệ với Tòa soạn Trạm Xanh',
        description: 'Gửi thông tin, góp ý hoặc liên hệ hợp tác với Tạp chí Trạm Xanh.',
      });
    } else {
      const catObj = CATEGORIES.find((c) => c.id === currentCategory);
      updateSEO({
        title: catObj ? `${catObj.name}` : 'Chuyên mục',
        description: catObj ? catObj.description : 'Trạm Xanh',
      });
    }
  }, [currentCategory, selectedArticle, is404]);

  // Filter articles by search query across titles, tags, category names, and excerpts
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return ARTICLES;
    const q = searchQuery.toLowerCase();
    return ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.categoryName.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Featured and latest subsets
  const featuredArticles = useMemo(
    () => ARTICLES.filter((a) => a.featured || a.trending),
    []
  );

  const categoryFilteredArticles = useMemo(() => {
    if (
      currentCategory === 'trang-chu' ||
      currentCategory === 'gioi-thieu' ||
      currentCategory === 'lien-he' ||
      currentCategory === 'ai-tram-truong'
    ) {
      return ARTICLES;
    }
    return ARTICLES.filter((a) => a.category === currentCategory);
  }, [currentCategory]);

  const handleOpenAiModal = (question?: string) => {
    setAiInitialQuestion(question);
    setIsAiModalOpen(true);
  };

  const handleSelectCategory = (id: CategoryId) => {
    setCurrentCategory(id);
    setSelectedArticle(null);
    setSearchQuery('');
    setIs404(false);

    // Push state to browser location bar
    if (id === 'ai-tram-truong') {
      window.history.pushState({}, '', '/ai-tram-truong');
    } else if (id === 'trang-chu') {
      window.history.pushState({}, '', '/');
    } else {
      window.history.pushState({}, '', `/${id}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    window.history.pushState(
      {},
      '',
      `/${article.category}/${article.slug || article.id}`
    );
  };

  const handleCloseArticleModal = () => {
    setSelectedArticle(null);
    if (currentCategory === 'trang-chu') {
      window.history.pushState({}, '', '/');
    } else {
      window.history.pushState({}, '', `/${currentCategory}`);
    }
  };

  const handleReadLatest = () => {
    const latestSection = document.getElementById('latest-news-section');
    if (latestSection) {
      latestSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleSelectCategory('tin-tuc');
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white flex flex-col font-sans text-[#212121] selection:bg-[#E8F8EA] selection:text-[#2E7D32]">
        
        {/* Sticky Top Header Navigation */}
        <Header
          currentCategory={currentCategory}
          onSelectCategory={handleSelectCategory}
          onOpenAiModal={() => handleOpenAiModal()}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Main View Area */}
        <main className="flex-1">
          
          {/* 404 View */}
          {is404 ? (
            <NotFoundView onGoHome={() => handleSelectCategory('trang-chu')} />
          ) : searchQuery.trim() !== '' ? (
            /* Search Filter Active Banner */
            <div className="py-10 bg-[#F8F9FA] min-h-[60vh]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#212121]">
                    Kết quả tìm kiếm cho: <span className="text-[#2E7D32]">"{searchQuery}"</span>
                  </h1>
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Xóa bộ lọc"
                    className="px-3 py-1.5 bg-white border border-gray-200 hover:border-red-500 hover:text-red-600 rounded-xl text-xs font-semibold text-gray-600 transition-colors cursor-pointer"
                  >
                    Xóa bộ lọc
                  </button>
                </div>

                {filteredArticles.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 shadow-xs space-y-4 max-w-lg mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
                      <SearchX className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-bold text-gray-900">
                        Không tìm thấy bài viết phù hợp.
                      </p>
                      <p className="text-xs text-gray-500">
                        Thử tìm với từ khóa khác như "rác", "pin", "cây", "môi trường".
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => setSearchQuery('')}
                        aria-label="Xóa bộ lọc"
                        className="px-5 py-2.5 bg-[#2E7D32] hover:bg-[#1b5e20] text-white rounded-xl text-xs font-bold transition-colors shadow-xs cursor-pointer"
                      >
                        Xóa bộ lọc
                      </button>
                    </div>
                  </div>
                ) : (
                  <LatestNews
                    articles={filteredArticles}
                    onSelectArticle={handleSelectArticle}
                  />
                )}
              </div>
            </div>
          ) : (
            <>
              {/* View Switching */}
              {currentCategory === 'trang-chu' && (
                <>
                  <HeroSection
                    onReadLatest={handleReadLatest}
                    onOpenAiModal={() => handleOpenAiModal()}
                  />
                  
                  <FeaturedNews
                    articles={featuredArticles}
                    onSelectArticle={handleSelectArticle}
                  />

                  <div id="latest-news-section">
                    <LatestNews
                      articles={ARTICLES.slice(0, 9)}
                      onSelectArticle={handleSelectArticle}
                    />
                  </div>

                  <CategoriesSection onSelectCategory={handleSelectCategory} />

                  <AiIntroSection onOpenAiModal={() => handleOpenAiModal()} />
                </>
              )}

              {currentCategory === 'ai-tram-truong' && (
                <AiTramTruongView initialQuestion={aiInitialQuestion} />
              )}

              {currentCategory === 'gioi-thieu' && (
                <AboutView onOpenAiModal={() => handleOpenAiModal()} />
              )}

              {currentCategory === 'lien-he' && <ContactView />}

              {currentCategory !== 'trang-chu' &&
                currentCategory !== 'ai-tram-truong' &&
                currentCategory !== 'gioi-thieu' &&
                currentCategory !== 'lien-he' && (
                  <CategoryView
                    category={currentCategory}
                    articles={categoryFilteredArticles}
                    events={EVENTS}
                    onSelectArticle={handleSelectArticle}
                    onOpenAiModal={() => handleOpenAiModal()}
                    onSelectCategory={handleSelectCategory}
                  />
                )}
            </>
          )}

        </main>

        {/* Footer */}
        <Footer
          onSelectCategory={handleSelectCategory}
          onOpenAiModal={() => handleOpenAiModal()}
        />

        {/* Article Full Detail View Modal */}
        <ArticleDetailModal
          article={selectedArticle}
          onClose={handleCloseArticleModal}
          onSelectArticle={handleSelectArticle}
          onSelectCategory={handleSelectCategory}
          relatedArticles={ARTICLES.filter(
            (a) => a.id !== selectedArticle?.id && a.category === selectedArticle?.category
          )}
        />

        {/* AI Assistant Modal */}
        <AiAssistantModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          initialQuestion={aiInitialQuestion}
        />

      </div>
    </ErrorBoundary>
  );
}
