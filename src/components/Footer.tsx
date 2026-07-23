import React from 'react';
import { Leaf, Mail, Phone, MapPin, Bot, Facebook } from 'lucide-react';
import { CategoryId } from '../types';

interface FooterProps {
  onSelectCategory: (id: CategoryId) => void;
  onOpenAiModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenAiModal,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1C2C1E] text-gray-300 pt-16 pb-8 border-t border-emerald-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white font-bold shadow-xs">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  TRẠM XANH
                </span>
                <span className="block text-[11px] text-[#66BB6A] font-semibold italic -mt-0.5">
                  "Điểm dừng để hiểu hơn, sống xanh hơn."
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Tạp chí điện tử tin tức về môi trường và lối sống xanh dành cho cộng đồng Việt Nam. Lan tỏa giải pháp bền vững và nâng cao nhận thức sinh thái.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenAiModal}
                aria-label="Trò chuyện với AI Trạm Trưởng"
                className="inline-flex items-center gap-2 bg-[#2E7D32] hover:bg-[#236326] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <Bot className="w-4 h-4 text-[#66BB6A]" />
                <span>Trò chuyện với AI Trạm Trưởng</span>
              </button>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Theo dõi Trạm Xanh trên Facebook"
                className="p-2 rounded-lg bg-emerald-900/40 hover:bg-[#2E7D32] text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Chuyên mục
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCategory('tin-tuc')} className="hover:text-[#66BB6A] transition-colors cursor-pointer">
                  Tin tức Môi trường
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('song-xanh')} className="hover:text-[#66BB6A] transition-colors cursor-pointer">
                  Cẩm nang Sống Xanh
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cong-nghe-xanh')} className="hover:text-[#66BB6A] transition-colors cursor-pointer">
                  Đột phá Công nghệ Xanh
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('cau-chuyen-xanh')} className="hover:text-[#66BB6A] transition-colors cursor-pointer">
                  Câu chuyện Truyền cảm hứng
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('su-kien')} className="hover:text-[#66BB6A] transition-colors cursor-pointer">
                  Sự kiện &amp; Chiến dịch
                </button>
              </li>
            </ul>
          </div>

          {/* Info & Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Thông tin
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCategory('trang-chu')} className="hover:text-[#66BB6A] transition-colors cursor-pointer">
                  Trang chủ
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('gioi-thieu')} className="hover:text-[#66BB6A] transition-colors cursor-pointer">
                  Giới thiệu Trạm Xanh
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('lien-he')} className="hover:text-[#66BB6A] transition-colors cursor-pointer">
                  Tòa soạn &amp; Liên hệ
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Liên hệ tòa soạn
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#66BB6A] shrink-0 mt-0.5" />
                <span>Hà Nội, Việt Nam</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#66BB6A] shrink-0" />
                <span>banbientap@tramxanh.vn</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#66BB6A] shrink-0" />
                <span>+84 (0) 24 3822 9999</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {currentYear} Trạm Xanh. Bản quyền thuộc về Tạp chí điện tử Trạm Xanh.</p>
          <p className="flex items-center gap-1">
            Vì một Việt Nam <span className="text-[#66BB6A] font-bold">Xanh - Bền Vững</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

