import React from 'react';
import { Leaf, Target, Users, BookOpen, Bot, ShieldCheck, HeartHandshake } from 'lucide-react';

interface AboutViewProps {
  onOpenAiModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenAiModal }) => {
  const audiences = [
    { title: 'Học sinh & Sinh viên', desc: 'Học hỏi kiến thức sinh thái, tìm kiếm đề tài nghiên cứu & tham gia chiến dịch cộng đồng.', icon: BookOpen },
    { title: 'Giáo viên & Nhà giáo dục', desc: 'Tài liệu chuẩn mực phục vụ giảng dạy ngoại khóa và phong trào Trường Học Xanh.', icon: Target },
    { title: 'Gia đình Việt', desc: 'Cẩm nang thực hành phân loại rác, tiết kiệm năng lượng và xây dựng thói quen sống lành mạnh.', icon: HeartHandshake },
    { title: 'Cộng đồng yêu Môi trường', desc: 'Kết nối những dự án khởi nghiệp xanh, trao đổi sáng kiến tuần hoàn và lan tỏa thông điệp.', icon: Users },
  ];

  return (
    <div className="py-12 bg-white min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F8EA] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5" />
            <span>Về Trạm Xanh</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#212121] tracking-tight">
            Điểm dừng để hiểu hơn, sống xanh hơn.
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Trạm Xanh là tạp chí điện tử báo chí &amp; thông tin chuyên sâu về môi trường, phát triển bền vững và lối sống xanh dành riêng cho cộng đồng Việt Nam.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#F8F9FA] border border-gray-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F8EA] text-[#2E7D32] flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#212121]">Sứ mệnh</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Cung cấp nguồn tin tức môi trường chính xác, khách quan và dễ tiếp cận. Chúng tôi biến những khái niệm sinh thái phức tạp thành bài học hành động thiết thực cho từng gia đình và cá nhân.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#E8F8EA]/50 border border-[#66BB6A]/30 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2E7D32] text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#212121]">Tầm nhìn</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Trở thành cổng thông tin sinh thái &amp; môi trường hàng đầu Việt Nam, góp phần thúc đẩy lộ trình chuyển đổi xanh quốc gia và bảo tồn tài nguyên thiên nhiên cho các thế hệ tương lai.
            </p>
          </div>
        </div>

        {/* Target Audience */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-bold text-[#212121]">Đối tượng độc giả</h2>
            <p className="text-sm text-gray-500">Trạm Xanh được thiết kế hướng tới đa dạng tầng lớp trong xã hội</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((aud, index) => {
              const Icon = aud.icon;
              return (
                <div key={index} className="p-6 rounded-2xl bg-[#F8F9FA] border border-gray-100 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#2E7D32] shadow-xs flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-[#212121]">{aud.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{aud.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Assistant Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#2E7D32] to-[#1b5e20] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold flex items-center gap-2 justify-center md:justify-start">
              <Bot className="w-6 h-6 text-[#66BB6A]" /> AI Trạm Trưởng 24/7
            </h3>
            <p className="text-emerald-100 text-sm max-w-xl">
              Trợ lý tri thức môi trường tích hợp sẵn sàng trả lời mọi câu hỏi của học sinh, sinh viên và gia đình.
            </p>
          </div>

          <button
            onClick={onOpenAiModal}
            className="bg-[#66BB6A] hover:bg-[#52a656] text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors shadow-md whitespace-nowrap cursor-pointer"
          >
            Trải nghiệm AI Trạm Trưởng
          </button>
        </div>

      </div>
    </div>
  );
};
