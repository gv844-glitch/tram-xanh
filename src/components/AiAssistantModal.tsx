import React, { useState, useEffect } from 'react';
import { X, Bot, Send, Sparkles, RefreshCw, ShieldCheck } from 'lucide-react';
import { askTramTruongAI, ChatMessage } from '../services/gemini';
import { AI_SAMPLE_QUESTIONS } from '../data/mockData';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  initialQuestion,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Xin chào! Tôi là AI Trạm Trưởng 🌿. Tôi có thể giúp bạn tìm hiểu về quy trình phân loại rác, giải pháp sống xanh, công nghệ năng lượng tái tạo và kiến thức môi trường. Bạn muốn tìm hiểu về chủ đề gì hôm nay?',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (initialQuestion) {
      handleAskQuestion(initialQuestion);
    }
  }, [initialQuestion]);

  if (!isOpen) return null;

  const handleAskQuestion = async (questionText: string) => {
    if (!questionText.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: questionText.trim(),
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsTyping(true);

    try {
      const responseText = await askTramTruongAI(questionText.trim(), messages);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Xin lỗi, Trạm Trưởng đang gặp sự cố kết nối. Bạn vui lòng thử lại sau ít phút.',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: 'Đã làm mới cuộc hội thoại. Bạn có thắc mắc gì mới về môi trường không?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center items-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[85vh] max-h-[720px]">
        
        {/* Header Bar */}
        <div className="bg-[#2E7D32] text-white p-4 sm:p-5 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#66BB6A] flex items-center justify-center text-white font-bold shadow-xs">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold tracking-tight">AI Trạm Trưởng</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#66BB6A]/40 text-emerald-100 text-[10px] font-bold uppercase tracking-wider">
                  Trợ lý Môi Trường
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 flex items-center gap-1 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#66BB6A] inline-block animate-pulse"></span>
                Sẵn sàng giải đáp 24/7
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 transition-colors cursor-pointer"
              title="Làm mới trò chuyện"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              id="ai-modal-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="bg-[#F8F9FA] px-4 py-2.5 border-b border-gray-200 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <Sparkles className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
          <span className="text-[11px] font-bold text-gray-500 shrink-0">Chủ đề gợi ý:</span>
          {AI_SAMPLE_QUESTIONS.slice(0, 3).map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAskQuestion(q)}
              className="text-[11px] font-medium bg-white hover:bg-[#E8F8EA] text-gray-700 hover:text-[#2E7D32] border border-gray-200 hover:border-[#66BB6A]/50 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F8F9FA]/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[88%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <Bot className="w-4 h-4 text-[#66BB6A]" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#2E7D32] text-white rounded-tr-xs shadow-xs'
                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-xs shadow-xs'
                }`}
              >
                <p className="whitespace-pre-line font-sans">{msg.text}</p>
                <span
                  className={`block text-[10px] mt-2 ${
                    msg.sender === 'user' ? 'text-emerald-200 text-right' : 'text-gray-400'
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-gray-400 text-xs p-2">
              <Bot className="w-4 h-4 text-[#2E7D32]" />
              <span>AI Trạm Trưởng đang tổng hợp câu trả lời...</span>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="p-3 sm:p-4 bg-white border-t border-gray-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskQuestion(inputQuestion);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder="Nhập câu hỏi về môi trường, lối sống xanh..."
              className="flex-1 bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-[#2E7D32] focus:bg-white transition-all placeholder-gray-400"
              id="ai-chat-input"
            />
            <button
              type="submit"
              disabled={!inputQuestion.trim()}
              className="bg-[#2E7D32] hover:bg-[#1b5e20] disabled:bg-gray-300 text-white p-3 rounded-xl transition-colors cursor-pointer shrink-0"
              id="ai-chat-send-btn"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-gray-400 mt-2 px-1">
            <span>Mẹo: Hãy hỏi về phân loại rác, tiết kiệm năng lượng hoặc cây xanh.</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#2E7D32]" /> Trạm Xanh AI Interface
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
