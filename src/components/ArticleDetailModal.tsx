import React, { useState, useEffect } from 'react';
import { Article, CategoryId } from '../types';
import { Breadcrumb } from './Breadcrumb';
import { X, Clock, Share2, Bookmark, Check, ArrowLeft, Tag, Leaf } from 'lucide-react';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (id: CategoryId) => void;
  relatedArticles: Article[];
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  onSelectArticle,
  onSelectCategory,
  relatedArticles,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Dynamic SEO Update for Title and Meta Description
  useEffect(() => {
    if (article) {
      const originalTitle = document.title;
      document.title = `${article.title} | Trạm Xanh - Tạp chí Môi trường`;

      // Update meta description tag
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      const previousDesc = metaDesc.getAttribute('content') || '';
      metaDesc.setAttribute('content', article.excerpt);

      return () => {
        document.title = originalTitle;
        if (metaDesc) {
          metaDesc.setAttribute('content', previousDesc);
        }
      };
    }
  }, [article]);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center items-start p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 border border-gray-200 flex flex-col max-h-[92vh]">
        
        {/* Sticky Article Header Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-[#2E7D32] transition-colors cursor-pointer bg-gray-100 hover:bg-[#E8F8EA] px-3 py-1.5 rounded-xl"
            id="article-modal-back-btn"
          >
            <ArrowLeft className="w-4 h-4 text-[#2E7D32]" />
            <span>Quay lại</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Font Size Toggle */}
            <div className="bg-gray-100 p-1 rounded-xl flex items-center text-xs font-semibold text-gray-600">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2.5 py-0.5 rounded-lg ${fontSize === 'normal' ? 'bg-white text-[#2E7D32] shadow-xs font-bold' : 'hover:text-gray-900'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-0.5 rounded-lg text-sm ${fontSize === 'large' ? 'bg-white text-[#2E7D32] shadow-xs font-bold' : 'hover:text-gray-900'}`}
              >
                A+
              </button>
            </div>

            {/* Bookmark */}
            <button
              onClick={() => setSaved(!saved)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                saved ? 'bg-[#E8F8EA] border-[#2E7D32] text-[#2E7D32]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
              title="Lưu bài viết"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer relative"
              title="Chia sẻ bài viết"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
              {copied && (
                <span className="absolute -bottom-8 right-0 bg-black text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap">
                  Đã chép liên kết!
                </span>
              )}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer ml-2"
              id="article-modal-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          
          {/* Breadcrumb inside Article */}
          <div className="max-w-3xl mx-auto pb-2 border-b border-gray-100">
            <Breadcrumb
              categoryName={article.categoryName}
              categoryId={article.category}
              articleTitle={article.title}
              onSelectCategory={(catId) => {
                onClose();
                onSelectCategory(catId);
              }}
            />
          </div>

          {/* Article Header Meta */}
          <div className="space-y-4 max-w-3xl mx-auto">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F8EA] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" />
              <span>{article.categoryName}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#212121] leading-tight tracking-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-y border-gray-200 text-xs text-gray-600">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-xs"
                />
                <div>
                  <div className="font-bold text-gray-900 text-sm">{article.author.name}</div>
                  <div className="text-[11px] text-[#2E7D32] font-semibold">{article.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-500 font-medium">
                <span>{article.publishedAt}</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-bold text-[#2E7D32] bg-[#E8F8EA] px-2.5 py-0.5 rounded-md">
                  <Clock className="w-3.5 h-3.5" /> {article.readTime}
                </span>
              </div>
            </div>

          </div>

          {/* Featured Large Image */}
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-auto max-h-[480px] object-cover"
            />
          </div>

          {/* Excerpt Lead Paragraph */}
          <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-[#F8F9FA] border-l-4 border-[#2E7D32] shadow-xs">
            <p className="text-base sm:text-lg font-medium text-gray-800 italic leading-relaxed font-serif">
              "{article.excerpt}"
            </p>
          </div>

          {/* Main Article Content Paragraphs */}
          <div className={`max-w-3xl mx-auto space-y-6 text-gray-800 leading-relaxed ${
            fontSize === 'large' ? 'text-lg sm:text-xl space-y-7' : 'text-base sm:text-lg'
          }`}>
            {article.content.map((paragraph, index) => (
              <p key={index} className="font-sans">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="max-w-3xl mx-auto pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-[#2E7D32]" />
            <span className="text-xs font-bold text-gray-700 mr-2">Từ khóa (tags):</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-[#F8F9FA] text-gray-800 text-xs font-medium border border-gray-200 hover:bg-[#E8F8EA] hover:text-[#2E7D32] hover:border-[#2E7D32] transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Card */}
          <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-[#E8F8EA] border border-[#66BB6A]/40 flex items-center gap-4">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
            />
            <div>
              <div className="text-sm font-bold text-gray-900">{article.author.name}</div>
              <div className="text-xs text-[#2E7D32] font-semibold">{article.author.role}</div>
              <p className="text-xs text-gray-700 mt-1">
                Tác giả chuyên sâu về chủ đề môi trường, phát triển bền vững và chuyển đổi xanh tại Trạm Xanh.
              </p>
            </div>
          </div>

          {/* Related Articles List */}
          {relatedArticles.length > 0 && (
            <div className="max-w-3xl mx-auto pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-[#212121] mb-4 flex items-center gap-2">
                <span className="w-2 h-5 bg-[#2E7D32] rounded-full"></span>
                Bài viết liên quan cùng chuyên mục
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.slice(0, 2).map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="p-4 rounded-xl border border-gray-200 hover:border-[#2E7D32] bg-white hover:bg-[#F8F9FA] transition-all cursor-pointer flex gap-3 group"
                  >
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-20 h-20 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-2 group-hover:text-[#2E7D32] transition-colors">
                        {rel.title}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2">
                        <span>{rel.publishedAt}</span>
                        <span className="text-[#2E7D32] font-semibold">Đọc bài</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
