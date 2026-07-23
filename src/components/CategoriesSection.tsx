import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { CategoryId } from '../types';
import { Newspaper, Leaf, Cpu, HeartHandshake, Calendar, ArrowRight } from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory: (id: CategoryId) => void;
}

const CATEGORY_IMAGES: Record<string, string> = {
  'tin-tuc': 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop&q=80',
  'song-xanh': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
  'cong-nghe-xanh': 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80',
  'cau-chuyen-xanh': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
  'su-kien': 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
};

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Newspaper': return <Newspaper className="w-5 h-5 text-[#2E7D32]" />;
      case 'Leaf': return <Leaf className="w-5 h-5 text-[#2E7D32]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#2E7D32]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-[#2E7D32]" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-[#2E7D32]" />;
      default: return <Leaf className="w-5 h-5 text-[#2E7D32]" />;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-[#E8F8EA] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
            Chuyên mục tin tức
          </div>
          <h2 className="text-3xl font-bold text-[#212121] tracking-tight">
            Khám phá 5 chuyên mục chính
          </h2>
          <p className="text-gray-600 text-sm">
            Tất cả bài viết được phân loại khoa học, cập nhật thông tin chuẩn xác và truyền cảm hứng sống xanh.
          </p>
        </div>

        {/* 5 Thẻ Chuyên mục */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="bg-[#F8F9FA] hover:bg-white border border-gray-200 hover:border-[#2E7D32] rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:shadow-md"
            >
              <div>
                {/* Illustrative image */}
                <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                  <img
                    src={CATEGORY_IMAGES[cat.id] || CATEGORY_IMAGES['tin-tuc']}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 p-1.5 rounded-lg shadow-xs">
                    {getCategoryIcon(cat.icon)}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-[#212121] group-hover:text-[#2E7D32] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs font-bold text-[#2E7D32]">
                <span>Xem chuyên mục</span>
                <div className="w-7 h-7 rounded-full bg-[#E8F8EA] flex items-center justify-center group-hover:bg-[#2E7D32] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
