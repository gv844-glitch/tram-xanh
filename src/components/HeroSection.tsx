import React from 'react';
import { ArrowRight, Bot, Leaf, Globe, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onReadLatest: () => void;
  onOpenAiModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onReadLatest,
  onOpenAiModal,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8F9FA] via-[#E8F8EA]/40 to-white pt-8 pb-16 lg:py-20 border-b border-gray-100">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 -z-10 transform translate-x-1/3 -translate-y-1/4 w-[600px] h-[600px] bg-[#E8F8EA]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 transform -translate-x-1/3 translate-y-1/4 w-[500px] h-[500px] bg-green-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F8EA] border border-[#66BB6A]/30 text-[#2E7D32] text-xs font-semibold tracking-wide uppercase">
              <Leaf className="w-3.5 h-3.5 text-[#2E7D32]" />
              <span>Tạp chí tin tức môi trường Việt Nam</span>
            </div>

            {/* Main Title & Slogan */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#212121] tracking-tight leading-tight">
                TRẠM XANH
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-[#2E7D32] italic font-serif">
                "Điểm dừng để hiểu hơn, sống xanh hơn."
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
              Website tin tức về môi trường và lối sống xanh dành cho cộng đồng Việt Nam. Nơi cập nhật tri thức sinh thái, sáng kiến xanh và kết nối những trái tim trăn trở vì tương lai bền vững.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onReadLatest}
                id="hero-read-latest-btn"
                className="bg-[#2E7D32] hover:bg-[#1b5e20] text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <span>Đọc tin mới</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAiModal}
                id="hero-ask-ai-btn"
                className="bg-white hover:bg-[#E8F8EA] text-[#2E7D32] border border-[#2E7D32]/30 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Bot className="w-4 h-4 text-[#2E7D32]" />
                <span>Hỏi AI Trạm Trưởng</span>
              </button>
            </div>

            {/* Key stats / Trust chips */}
            <div className="pt-6 border-t border-gray-200/80 grid grid-cols-3 gap-4 max-w-lg text-gray-600">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span className="text-xs font-medium">100% Tin chọn lọc</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span className="text-xs font-medium">Kiểm chứng khoa học</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span className="text-xs font-medium">Cộng đồng Việt</span>
              </div>
            </div>

          </div>

          {/* Right Magazine Hero Image / Card Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="absolute inset-0 bg-[#2E7D32] rounded-3xl transform rotate-2 scale-105 opacity-10"></div>
              
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&auto=format&fit=crop&q=80"
                  alt="Thiên nhiên và môi trường Việt Nam xanh tươi"
                  loading="lazy"
                  className="w-full h-[380px] lg:h-[440px] object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Floating Magazine Overlay Box */}
                <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-2">
                  <div className="inline-block px-2.5 py-1 rounded-md bg-[#66BB6A] text-white text-[11px] font-bold tracking-wider uppercase">
                    Bài viết tiêu điểm
                  </div>
                  <h3 className="text-lg font-bold leading-snug line-clamp-2">
                    Hành trình phủ xanh các đô thị Việt Nam bằng cây bản địa
                  </h3>
                  <p className="text-xs text-gray-200 line-clamp-1 font-light">
                    Sáng kiến sinh thái mang rừng tự nhiên trở lại trái tim các thành phố lớn.
                  </p>
                </div>
              </div>

              {/* AI Badge Chip */}
              <div className="absolute -top-4 -left-4 bg-white p-3.5 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5 text-[#66BB6A]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">AI Trạm Trưởng</div>
                  <div className="text-[11px] text-gray-500">Trợ lý giải đáp môi trường</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
