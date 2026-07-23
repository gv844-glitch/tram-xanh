import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Trash2,
  Sparkles,
  ShieldCheck,
  Leaf,
  ArrowRight,
  Copy,
  Check,
  RotateCcw,
  Share2,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  HelpCircle,
  Clock,
  History,
} from 'lucide-react';
import { askTramTruongAI, ChatMessage } from '../services/gemini';

interface AiTramTruongViewProps {
  initialQuestion?: string;
}

export const AiTramTruongView: React.FC<AiTramTruongViewProps> = ({ initialQuestion }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sharedId, setSharedId] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'ready' | 'error'>('ready');
  const [showNewChatConfirm, setShowNewChatConfirm] = useState(false);
  const [ratings, setRatings] = useState<Record<string, 'up' | 'down'>>({});
  const [feedbackInputs, setFeedbackInputs] = useState<Record<string, string>>({});
  const [submittedFeedback, setSubmittedFeedback] = useState<Record<string, boolean>>({});

  // 5 Initial prompt suggestions
  const INITIAL_5_QUESTIONS = [
    '🌱 Tôi muốn sống xanh từ đâu?',
    '♻️ Hướng dẫn phân loại rác.',
    '🌍 Biến đổi khí hậu là gì?',
    '🔋 Làm sao tiết kiệm điện?',
    '🚲 Đi xe đạp có giúp giảm phát thải không?',
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('tram_truong_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      // ignore
    }
    return [
      {
        id: 'init-1',
        sender: 'ai',
        text: 'Xin chào! Tôi là **AI Trạm Trưởng** 🌿 - trợ lý chính thức của website Trạm Xanh.\n\nTôi sẵn sàng hỗ trợ bạn giải đáp mọi thắc mắc về phân loại rác, tiết kiệm năng lượng, lối sống xanh, biến đổi khí hậu và phát triển bền vững tại Việt Nam. Hôm nay bạn muốn tìm hiểu điều gì?',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [recentQuestions, setRecentQuestions] = useState<string[]>(() => {
    try {
      const saved = sessionStorage.getItem('tram_truong_recent_questions');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.slice(-5);
      }
    } catch (e) {
      // ignore
    }
    return [];
  });

  const [inputQuestion, setInputQuestion] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [lastFailedQuestion, setLastFailedQuestion] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dynamic context-based follow-up generator
  const getFollowUpSuggestions = (lastQuestion: string): string[] => {
    const q = lastQuestion.toLowerCase();
    if (q.includes('rác') || q.includes('phân loại') || q.includes('tái chế')) {
      return [
        '♻️ Rác hữu cơ là gì?',
        '🗑️ Rác điện tử xử lý như thế nào?',
        '🌱 Làm phân compost tại nhà',
      ];
    }
    if (q.includes('điện') || q.includes('năng lượng') || q.includes('mặt trời')) {
      return [
        '☀️ Chi phí lắp điện mặt trời áp mái?',
        '💡 Mẹo tiết kiệm điện mùa hè',
        '⚡ Pin lưu trữ năng lượng là gì?',
      ];
    }
    if (q.includes('khí hậu') || q.includes('biến đổi') || q.includes('nóng lên')) {
      return [
        '🌊 Mực nước biển dâng ảnh hưởng ra sao?',
        '🌲 Tác dụng của rừng đối với khí hậu',
        '📉 Tín chỉ carbon là gì?',
      ];
    }
    if (q.includes('sống xanh') || q.includes('bắt đầu') || q.includes('túi')) {
      return [
        '🛍️ Thay thế túi nilon bằng gì?',
        '🚲 Đi xe đạp giảm bao nhiêu khí thải?',
        '🪴 Cây cảnh lọc không khí trong nhà',
      ];
    }
    return [
      '🌱 Làm phân compost tại nhà',
      '♻️ Cách tái chế chai nhựa',
      '🌍 Tại sao nên tiết kiệm điện',
    ];
  };

  // Persist history to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('tram_truong_chat_history', JSON.stringify(messages));
      sessionStorage.setItem('tram_truong_recent_questions', JSON.stringify(recentQuestions));
    } catch (e) {
      // ignore
    }
  }, [messages, recentQuestions]);

  // Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Initial question trigger
  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion);
    }
  }, [initialQuestion]);

  const handleSendMessage = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isThinking) return;

    // Track recent questions (max 5)
    setRecentQuestions((prev) => {
      const filtered = prev.filter((item) => item !== trimmed);
      return [...filtered, trimmed].slice(-5);
    });

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsThinking(true);
    setConnectionStatus('ready');
    setLastFailedQuestion(null);

    try {
      const responseText = await askTramTruongAI(trimmed, messages);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setConnectionStatus('ready');
    } catch (error) {
      setConnectionStatus('error');
      setLastFailedQuestion(trimmed);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: '🔴 Không thể kết nối. Xin lỗi, Trạm Trưởng đang gặp sự cố kết nối. Bạn vui lòng kiểm tra lại mạng hoặc bấm "Thử lại".',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleRetryLast = () => {
    if (lastFailedQuestion) {
      handleSendMessage(lastFailedQuestion);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShareMessage = async (id: string, text: string) => {
    const shareData = {
      title: 'AI Trạm Trưởng - Trạm Xanh',
      text: `[AI Trạm Trưởng tư vấn môi trường]: ${text.slice(0, 150)}...`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // Fallback to copy
      }
    }

    navigator.clipboard.writeText(`${text}\n\nNguồn: ${window.location.href}`);
    setSharedId(id);
    setTimeout(() => setSharedId(null), 2500);
  };

  const handleConfirmNewChat = () => {
    const defaultMsg: ChatMessage = {
      id: `init-${Date.now()}`,
      sender: 'ai',
      text: 'Bắt đầu cuộc trò chuyện mới! Tôi là **AI Trạm Trưởng** 🌿. Bạn muốn hỏi điều gì về môi trường hôm nay?',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([defaultMsg]);
    sessionStorage.removeItem('tram_truong_chat_history');
    setShowNewChatConfirm(false);
  };

  const handleRateMsg = (msgId: string, type: 'up' | 'down') => {
    setRatings((prev) => ({ ...prev, [msgId]: type }));
  };

  const handleSubmitFeedback = (msgId: string) => {
    if (!feedbackInputs[msgId]?.trim()) return;
    setSubmittedFeedback((prev) => ({ ...prev, [msgId]: true }));
  };

  // Extract last user question for context follow-ups
  const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user');
  const currentFollowUps = getFollowUpSuggestions(lastUserMsg ? lastUserMsg.text : '');

  return (
    <div className="py-8 bg-[#F8F9FA] min-h-[85vh] flex flex-col justify-between">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
        
        {/* Top Header Banner */}
        <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-4 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#E8F8EA] rounded-l-full opacity-50 pointer-events-none hidden md:block"></div>

          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F8EA] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5" />
              <span>Trợ lý AI chính thức của Trạm Xanh</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#212121] tracking-tight flex items-center gap-3">
              <span>🤖</span> AI Trạm Trưởng
            </h1>

            <p className="text-gray-700 text-sm sm:text-base max-w-2xl leading-relaxed">
              Tư vấn môi trường, sống xanh, phân loại rác và năng lượng bền vững 24/7 bằng trí tuệ nhân tạo Gemini.
            </p>
          </div>
        </div>

        {/* 5 Initial Suggestion Questions */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>Gợi ý câu hỏi bắt đầu:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {INITIAL_5_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isThinking}
                aria-label={`Hỏi gợi ý: ${q}`}
                className="p-3 bg-white hover:bg-[#E8F8EA] border border-gray-200 hover:border-[#2E7D32] rounded-2xl text-left text-xs sm:text-sm font-semibold text-gray-800 hover:text-[#2E7D32] shadow-2xs transition-all duration-200 flex items-center justify-between group cursor-pointer disabled:opacity-50 min-h-[44px]"
              >
                <span className="line-clamp-1">{q}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#2E7D32] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>

        {/* Recent Questions List (If any) */}
        {recentQuestions.length > 0 && (
          <div className="space-y-1.5 bg-white border border-gray-200 p-3.5 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <History className="w-3.5 h-3.5 text-emerald-700" />
              <span>Câu hỏi vừa đặt gần đây:</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {recentQuestions.map((rq, rIdx) => (
                <button
                  key={rIdx}
                  onClick={() => handleSendMessage(rq)}
                  disabled={isThinking}
                  aria-label={`Hỏi lại câu: ${rq}`}
                  className="px-3 py-1.5 bg-[#F8F9FA] hover:bg-[#E8F8EA] border border-gray-200 hover:border-[#2E7D32] rounded-xl text-xs font-medium text-gray-700 hover:text-[#2E7D32] transition-colors cursor-pointer"
                >
                  {rq}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Interface Container */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden flex flex-col h-[650px] max-h-[80vh]">
          
          {/* Chat Control Bar with Status & New Chat Button */}
          <div className="bg-[#2E7D32] text-white p-4 sm:p-5 flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-xl shadow-xs">
                🌿
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-extrabold tracking-tight">Trạm Trưởng</h2>
                  
                  {/* Status Badge */}
                  {connectionStatus === 'ready' ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#66BB6A] text-white text-[10px] font-bold uppercase tracking-wider shadow-2xs inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      🟢 Trạm Trưởng sẵn sàng
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-2xs inline-flex items-center gap-1">
                      🔴 Không thể kết nối
                    </span>
                  )}
                </div>
                <p className="text-xs text-emerald-100/90 flex items-center gap-1 mt-0.5">
                  Tư vấn môi trường &amp; sống xanh 24/7
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNewChatConfirm(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-emerald-50 transition-colors cursor-pointer min-h-[38px]"
                title="Cuộc trò chuyện mới"
                aria-label="➕ Cuộc trò chuyện mới"
                id="new-chat-btn"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">➕ Cuộc trò chuyện mới</span>
              </button>
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#F8F9FA]/60">
            {messages.map((msg, index) => {
              const isLastAi = msg.sender === 'ai' && index === messages.length - 1;

              return (
                <div key={msg.id} className="space-y-3">
                  <div
                    className={`flex gap-3 max-w-[90%] sm:max-w-[82%] transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${
                      msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                    }`}
                  >
                    {/* Avatar AI */}
                    {msg.sender === 'ai' && (
                      <div className="w-9 h-9 rounded-2xl bg-[#2E7D32] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs text-base">
                        🌿
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed relative group ${
                        msg.sender === 'user'
                          ? 'bg-[#2E7D32] text-white rounded-tr-2xs shadow-xs font-medium'
                          : 'bg-white border border-gray-200 text-gray-800 rounded-tl-2xs shadow-xs'
                      }`}
                    >
                      <p className="whitespace-pre-line font-sans">{msg.text}</p>

                      {/* Message Footer: Timestamp, Copy, Share */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 text-[10px] gap-2 flex-wrap">
                        <span
                          className={`flex items-center gap-1 ${
                            msg.sender === 'user' ? 'text-emerald-200' : 'text-gray-400 font-medium'
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          {msg.time}
                        </span>

                        {msg.sender === 'ai' && (
                          <div className="flex items-center gap-3">
                            {/* Copy button */}
                            <button
                              onClick={() => handleCopyMessage(msg.id, msg.text)}
                              aria-label="📋 Sao chép câu trả lời"
                              className="inline-flex items-center gap-1 text-[11px] text-[#2E7D32] hover:underline font-semibold cursor-pointer min-h-[30px]"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-green-600" />
                                  <span className="text-green-600">Đã sao chép.</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-gray-400 group-hover:text-[#2E7D32]" />
                                  <span className="text-gray-600 group-hover:text-[#2E7D32]">📋 Sao chép</span>
                                </>
                              )}
                            </button>

                            {/* Share button */}
                            <button
                              onClick={() => handleShareMessage(msg.id, msg.text)}
                              aria-label="🔗 Chia sẻ câu trả lời"
                              className="inline-flex items-center gap-1 text-[11px] text-[#2E7D32] hover:underline font-semibold cursor-pointer min-h-[30px]"
                            >
                              {sharedId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-green-600" />
                                  <span className="text-green-600">Đã sao chép liên kết!</span>
                                </>
                              ) : (
                                <>
                                  <Share2 className="w-3 h-3 text-gray-400 group-hover:text-[#2E7D32]" />
                                  <span className="text-gray-600 group-hover:text-[#2E7D32]">🔗 Chia sẻ</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Feedback rating section for AI messages */}
                      {msg.sender === 'ai' && msg.id !== 'init-1' && (
                        <div className="mt-3 pt-2 border-t border-gray-100 flex flex-col gap-2">
                          <div className="flex items-center justify-between text-[11px] text-gray-500">
                            <span>Phản hồi này có ích cho bạn không?</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleRateMsg(msg.id, 'up')}
                                aria-label="👍 Hữu ích"
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
                                  ratings[msg.id] === 'up'
                                    ? 'bg-emerald-100 text-[#2E7D32]'
                                    : 'bg-gray-100 hover:bg-emerald-50 text-gray-600'
                                }`}
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span>👍 Hữu ích</span>
                              </button>

                              <button
                                onClick={() => handleRateMsg(msg.id, 'down')}
                                aria-label="👎 Chưa hữu ích"
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
                                  ratings[msg.id] === 'down'
                                    ? 'bg-rose-100 text-rose-700'
                                    : 'bg-gray-100 hover:bg-rose-50 text-gray-600'
                                }`}
                              >
                                <ThumbsDown className="w-3 h-3" />
                                <span>👎 Chưa hữu ích</span>
                              </button>
                            </div>
                          </div>

                          {ratings[msg.id] === 'up' && (
                            <p className="text-[10px] font-semibold text-[#2E7D32]">
                              Cảm ơn bạn đã đánh giá tốt! 💚
                            </p>
                          )}

                          {ratings[msg.id] === 'down' && !submittedFeedback[msg.id] && (
                            <div className="p-2 bg-rose-50 border border-rose-200 rounded-xl space-y-1.5 animate-in fade-in">
                              <p className="text-[10px] font-bold text-rose-800">
                                Bạn muốn AI cải thiện điều gì?
                              </p>
                              <div className="flex gap-1.5">
                                <input
                                  type="text"
                                  value={feedbackInputs[msg.id] || ''}
                                  onChange={(e) =>
                                    setFeedbackInputs((prev) => ({
                                      ...prev,
                                      [msg.id]: e.target.value,
                                    }))
                                  }
                                  placeholder="Nhập ý kiến góp ý..."
                                  aria-label="Bạn muốn AI cải thiện điều gì?"
                                  className="flex-1 bg-white border border-rose-200 rounded-lg px-2.5 py-1 text-[11px] focus:outline-hidden"
                                />
                                <button
                                  onClick={() => handleSubmitFeedback(msg.id)}
                                  className="bg-rose-700 hover:bg-rose-800 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer"
                                >
                                  Gửi
                                </button>
                              </div>
                            </div>
                          )}

                          {submittedFeedback[msg.id] && (
                            <p className="text-[10px] font-semibold text-rose-700">
                              Cảm ơn góp ý của bạn! Trạm Trưởng sẽ tiếp tục học hỏi 🌿
                            </p>
                          )}
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Contextual Follow-up Suggestions after AI response */}
                  {isLastAi && !isThinking && (
                    <div className="pl-12 pt-2 space-y-1.5 animate-in fade-in duration-300">
                      <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
                        <span>Bạn có thể hỏi tiếp:</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentFollowUps.map((fu, fIdx) => (
                          <button
                            key={fIdx}
                            onClick={() => handleSendMessage(fu)}
                            aria-label={`Hỏi tiếp: ${fu}`}
                            className="px-3.5 py-2 bg-white hover:bg-[#E8F8EA] border border-gray-200 hover:border-[#2E7D32] rounded-xl text-xs font-semibold text-gray-800 hover:text-[#2E7D32] transition-all shadow-2xs cursor-pointer min-h-[38px]"
                          >
                            {fu}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking / AI Bouncing Status Animation */}
            {isThinking && (
              <div className="flex items-center gap-3 max-w-[80%] mr-auto animate-pulse">
                <div className="w-9 h-9 rounded-2xl bg-[#2E7D32] text-white flex items-center justify-center shrink-0 text-base">
                  🌿
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-2xs shadow-xs flex items-center gap-2 text-xs font-semibold text-[#2E7D32]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] animate-bounce"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] animate-bounce [animation-delay:0.4s]"></span>
                  <span className="ml-1 text-gray-800 font-bold">🌿 Trạm Trưởng đang suy nghĩ...</span>
                </div>
              </div>
            )}

            {/* Error Retry Banner */}
            {connectionStatus === 'error' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-semibold">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  🔴 Lỗi kết nối máy chủ AI.
                </span>
                <button
                  onClick={handleRetryLast}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs cursor-pointer"
                >
                  Thử lại
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Question Input Box */}
          <div className="p-3 sm:p-4 bg-white border-t border-gray-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputQuestion);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                placeholder="Nhập câu hỏi cho Trạm Trưởng về môi trường, lối sống xanh..."
                disabled={isThinking}
                aria-label="Nhập câu hỏi cho Trạm Trưởng"
                className="flex-1 bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-hidden focus:border-[#2E7D32] focus:bg-white transition-all placeholder-gray-400 disabled:opacity-50 min-h-[44px]"
                id="ai-page-chat-input"
              />

              <button
                type="submit"
                disabled={!inputQuestion.trim() || isThinking}
                aria-label="Gửi câu hỏi"
                className="bg-[#2E7D32] hover:bg-[#1b5e20] disabled:bg-gray-300 text-white p-3 sm:px-5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer shrink-0 flex items-center gap-2 shadow-xs min-h-[44px]"
                id="ai-page-send-btn"
              >
                <span>Gửi</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Disclaimer & Footer Info */}
            <div className="mt-2.5 pt-2 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-500 gap-1.5">
              <p className="leading-tight text-gray-400 max-w-2xl">
                ⚠️ AI Trạm Trưởng cung cấp thông tin tham khảo về môi trường và lối sống xanh. Đối với các vấn đề pháp lý, y tế hoặc tình huống khẩn cấp, hãy tham khảo cơ quan hoặc chuyên gia phù hợp.
              </p>

              <span className="flex items-center gap-1 text-[#2E7D32] font-semibold shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" /> Trạm Xanh Official AI
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Modal for New Conversation */}
      {showNewChatConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 border border-gray-200 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F8EA] text-[#2E7D32] flex items-center justify-center mx-auto text-2xl">
              🌿
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-gray-900">Bắt đầu cuộc trò chuyện mới?</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Bạn có muốn bắt đầu cuộc trò chuyện mới không? Lịch sử trong phiên này sẽ được làm mới.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowNewChatConfirm(false)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmNewChat}
                className="flex-1 py-2.5 bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
