import React from 'react';
import { Bot, Sparkles, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { AI_SAMPLE_QUESTIONS } from '../data/mockData';

interface AiIntroSectionProps {
  onOpenAiModal: (initialQuestion?: string) => void;
}

export const AiIntroSection: React.FC<AiIntroSectionProps> = ({
  onOpenAiModal,
}) => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#2E7D32] to-[#1b5e20] text-white relative overflow-hidden my-8">
      {/* Background circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#66BB6A]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-900/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#66BB6A]/30 text-emerald-100 border border-[#66BB6A]/40 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#66BB6A]" />
              <span>Tính năng đặc biệt</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Hỏi đáp cùng <span className="text-[#66BB6A]">AI Trạm Trưởng</span>
            </h2>

            <p className="text-emerald-100 text-base sm:text-lg leading-relaxed max-w-2xl">
              Bạn băn khoăn về quy trình phân loại rác tại địa phương? Muốn tìm giải pháp tiết kiệm điện cho căn hộ? Hay cần giải thích biến đổi khí hậu cho học sinh? AI Trạm Trưởng luôn sẵn sàng hỗ trợ bạn 24/7.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenAiModal()}
                id="ai-intro-start-btn"
                className="bg-[#66BB6A] hover:bg-[#52a656] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
              >
                <Bot className="w-5 h-5" />
                <span>Trò chuyện với AI Trạm Trưởng</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-emerald-200">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#66BB6A]" /> Dữ liệu chuẩn mực
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#66BB6A]" /> Phản hồi tức thì
              </span>
            </div>
          </div>

          {/* Right Question Prompt Box */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-4">
              <div className="flex items-center gap-3 text-emerald-100 text-sm font-bold">
                <Bot className="w-5 h-5 text-[#66BB6A]" />
                <span>Gợi ý câu hỏi phổ biến:</span>
              </div>

              <div className="space-y-2.5">
                {AI_SAMPLE_QUESTIONS.slice(0, 4).map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => onOpenAiModal(question)}
                    className="w-full text-left p-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-medium transition-all duration-200 flex items-center justify-between group cursor-pointer"
                  >
                    <span className="line-clamp-1">{question}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#66BB6A] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-emerald-200/80 text-center pt-2">
                Bấm vào câu hỏi bất kỳ để trò chuyện trực tiếp
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
