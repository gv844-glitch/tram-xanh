import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Leaf } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Gửi bài viết / Sáng kiến xanh',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-white min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F8EA] text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5" />
            <span>Liên hệ tòa soạn</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#212121]">
            Kết nối cùng Trạm Xanh
          </h1>
          <p className="text-gray-600 text-sm">
            Bạn có câu hỏi, đề xuất đóng góp bài viết hay mong muốn hợp tác chiến dịch môi trường? Hãy gửi tin nhắn cho Ban biên tập.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#F8F9FA] p-8 rounded-3xl border border-gray-100 space-y-6">
              <h3 className="text-xl font-bold text-[#212121]">Thông tin tòa soạn</h3>

              <div className="space-y-5 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F8EA] text-[#2E7D32] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Địa chỉ tòa soạn</div>
                    <div className="text-gray-600 text-xs mt-0.5">Tầng 6, Tòa nhà Truyền thông Xanh, Hà Nội</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F8EA] text-[#2E7D32] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Email nhận bài &amp; Thông tin</div>
                    <div className="text-gray-600 text-xs mt-0.5">banbientap@tramxanh.vn</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F8EA] text-[#2E7D32] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Hotline hỗ trợ độc giả</div>
                    <div className="text-gray-600 text-xs mt-0.5">+84 (0) 24 3822 9999 (Giờ hành chính)</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 text-xs text-gray-500">
                Thời gian phản hồi thông thường trong vòng 24 giờ làm việc.
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle className="w-16 h-16 text-[#2E7D32] mx-auto animate-bounce" />
                  <h3 className="text-2xl font-bold text-gray-900">Cảm ơn bạn đã liên hệ!</h3>
                  <p className="text-gray-600 text-sm max-w-md mx-auto">
                    Ban biên tập Trạm Xanh đã nhận được thông tin và sẽ phản hồi qua email <span className="font-bold text-gray-800">{formData.email}</span> sớm nhất.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 bg-[#2E7D32] text-white px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#1b5e20] transition-colors"
                  >
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold text-[#212121]">Gửi thư đóng góp / Liên hệ</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Họ và tên *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-hidden focus:border-[#2E7D32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@vidu.vn"
                        className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-hidden focus:border-[#2E7D32]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Chủ đề liên hệ</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-hidden focus:border-[#2E7D32]"
                    >
                      <option>Gửi bài viết / Sáng kiến xanh</option>
                      <option>Đóng góp ý kiến cho Tạp chí</option>
                      <option>Hợp tác sự kiện truyền thông</option>
                      <option>Hỏi đáp cùng AI Trạm Trưởng</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nội dung *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Viết nội dung thắc mắc hoặc thông tin muốn chia sẻ cùng Trạm Xanh..."
                      className="w-full bg-[#F8F9FA] border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-hidden focus:border-[#2E7D32]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi tin nhắn</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
