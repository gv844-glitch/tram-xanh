import React, { useState } from 'react';
import { Leaf, Search, Bot, Menu, X, Sparkles } from 'lucide-react';
import { CategoryId } from '../types';

interface HeaderProps {
  currentCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  onOpenAiModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenAiModal,
  searchQuery,
  onSearchChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const menuItems: { id: CategoryId; label: string; isAi?: boolean }[] = [
    { id: 'trang-chu', label: 'Trang chủ' },
    { id: 'tin-tuc', label: 'Tin tức' },
    { id: 'song-xanh', label: 'Sống xanh' },
    { id: 'cong-nghe-xanh', label: 'Công nghệ xanh' },
    { id: 'cau-chuyen-xanh', label: 'Câu chuyện xanh' },
    { id: 'su-kien', label: 'Sự kiện' },
    { id: 'ai-tram-truong', label: 'AI Trạm Trưởng', isAi: true },
    { id: 'gioi-thieu', label: 'Giới thiệu' },
    { id: 'lien-he', label: 'Liên hệ' },
  ];

  const handleNavClick = (id: CategoryId) => {
    onSelectCategory(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs transition-all duration-200">
      {/* Top Banner Tagline strip */}
      <div className="bg-[#2E7D32] text-white text-xs py-1.5 px-4 text-center font-medium tracking-wide">
        <span> Tạp chí tin tức môi trường & lối sống xanh cho cộng đồng Việt Nam</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('trang-chu')}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-hidden"
            id="header-logo-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E8F8EA] flex items-center justify-center text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-colors duration-200 shadow-xs">
              <Leaf className="w-6 h-6 transition-transform group-hover:rotate-12 duration-200" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#212121] flex items-center gap-1">
                TRẠM XANH
              </span>
              <span className="block text-[10px] text-gray-500 font-medium tracking-widest uppercase -mt-1">
                E-Magazine
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {menuItems.map((item) => {
              const isActive = currentCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-item-${item.id}`}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#E8F8EA] text-[#2E7D32] font-semibold'
                      : item.isAi
                      ? 'text-[#2E7D32] hover:bg-[#E8F8EA] font-semibold'
                      : 'text-gray-700 hover:text-[#2E7D32] hover:bg-gray-50'
                  }`}
                >
                  {item.isAi && <Sparkles className="w-3.5 h-3.5 text-[#66BB6A]" />}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Header Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Box */}
            <div className="relative flex items-center">
              <div className={`flex items-center rounded-full border transition-all duration-200 ${
                isSearchExpanded || searchQuery ? 'w-48 sm:w-64 border-[#2E7D32] bg-gray-50 px-3 py-1.5' : 'w-10 h-10 justify-center border-transparent hover:bg-gray-100'
              }`}>
                <Search 
                  className="w-4 h-4 text-gray-500 shrink-0 cursor-pointer" 
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                />
                {(isSearchExpanded || searchQuery) && (
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Tìm bài viết, chủ đề..."
                    className="w-full bg-transparent border-none text-xs text-gray-800 focus:outline-hidden ml-2 placeholder-gray-400"
                    autoFocus={isSearchExpanded && !searchQuery}
                    id="header-search-input"
                  />
                )}
                {searchQuery && (
                  <button 
                    onClick={() => onSearchChange('')}
                    className="text-gray-400 hover:text-gray-600 text-xs ml-1"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* AI Trạm Trưởng Quick Button */}
            <button
              onClick={onOpenAiModal}
              id="header-ai-assistant-btn"
              className="hidden sm:flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1b5e20] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-[#66BB6A]" />
              <span>AI Trạm Trưởng</span>
              <span className="w-2 h-2 rounded-full bg-[#66BB6A] animate-pulse"></span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-gray-600 hover:text-[#2E7D32] hover:bg-gray-100 focus:outline-hidden"
              aria-label="Toggle menu"
              id="mobile-menu-toggle-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          <div className="mb-3 px-2">
            <div className="relative mt-2">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Tìm kiếm tin tức môi trường..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-hidden focus:border-[#2E7D32]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                  currentCategory === item.id
                    ? 'bg-[#E8F8EA] text-[#2E7D32] font-semibold'
                    : item.isAi
                    ? 'bg-[#2E7D32] text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.isAi && <Bot className="w-4 h-4 text-[#66BB6A]" />}
                  {item.label}
                </span>
                {item.isAi && (
                  <span className="text-[10px] bg-[#66BB6A] text-white px-2 py-0.5 rounded-full uppercase font-bold">
                    Hỏi đáp
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 mt-2 px-2">
            <p className="text-xs text-gray-500">
              Trạm Xanh — Tạp chí điện tử tin tức &amp; lối sống xanh cho cộng đồng.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
