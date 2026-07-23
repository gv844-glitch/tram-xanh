# Trạm Xanh — Tạp chí Điện tử Môi trường & Lối sống xanh

> **Khẩu hiệu:** "Điểm dừng để hiểu hơn, sống xanh hơn."

**Trạm Xanh** là nền tảng tạp chí điện tử tin tức sinh thái chuyên sâu về môi trường, phát triển bền vững, công nghệ xanh, phân loại rác và lối sống xanh tại Việt Nam, tích hợp trợ lý ảo thông minh **AI Trạm Trưởng** (hỗ trợ bởi Gemini API).

---

## 🚀 Tính năng cốt lõi

1. **Đọc tin tức & Tạp chí sinh thái**:
   - Hệ thống bài viết phân loại theo 5 chuyên mục: *Tin tức*, *Sống xanh*, *Công nghệ xanh*, *Câu chuyện xanh*, *Sự kiện*.
   - Giao diện đọc tạp chí chuyên nghiệp, tối ưu typography (Be Vietnam Pro), hỗ trợ breadcrumb, thời gian đọc, tác giả, bài viết liên quan và chia sẻ bài viết qua liên kết ngắn.
   - Tìm kiếm thời gian thực theo tiêu đề, danh mục, tóm tắt và thẻ bài viết (tags) với giao diện Empty State thân thiện.

2. **AI Trạm Trưởng (Trợ lý Môi trường 24/7)**:
   - Hỏi đáp trực tuyến về phân loại rác, năng lượng mặt trời, lối sống xanh và biến đổi khí hậu bằng tiếng Việt tự nhiên.
   - Hiệu ứng "🌿 Trạm Trưởng đang suy nghĩ..." mượt mà.
   - Gợi ý 3 câu hỏi tiếp theo theo ngữ cảnh câu trả lời.
   - Gợi ý 5 câu hỏi nhanh khi bắt đầu phiên trò chuyện.
   - Danh sách lưu 5 câu hỏi vừa đặt gần nhất trong phiên.
   - Nút sao chép câu trả lời, chia sẻ nội dung, tạo cuộc trò chuyện mới với hộp thoại xác nhận.
   - Đánh giá phản hồi (👍 Hữu ích / 👎 Chưa hữu ích) kèm ô góp ý trực tiếp.
   - Trạng thái kết nối trực quan (🟢 Trạm Trưởng sẵn sàng / 🔴 Không thể kết nối) kèm nút Thử lại.
   - Tuyên bố miễn trừ trách nhiệm (Disclaimer) hiển thị rõ ràng bên dưới khung chat.

---

## 🛠️ Công nghệ sử dụng

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS.
- **Biểu tượng:** Lucide React.
- **AI Engine:** @google/genai (Gemini API server-side logic).
- **SEO & Meta:** Tự động điều chỉnh HTML Document Title, Open Graph, Twitter Cards, Canonical Links và Slug tiếng Việt thân thiện (`/category/slug-title`).
- **Khả năng truy cập (Accessibility):** Tuân thủ WCAG cơ bản (Aria-labels, alt images, Keyboard focus, minimum 44px touch targets).

---

## 📂 Cấu trúc thư mục dự án

```
/
├── index.html                # Entry point HTML & Default SEO tags
├── metadata.json             # Metadata cấu hình AI Studio Applet
├── package.json              # Khai báo dependencies & npm scripts
├── vite.config.ts            # Cấu hình Vite & Tailwind plugin
├── src/
│   ├── main.tsx              # Entry point React application
│   ├── App.tsx               # Component chính điều hướng views & state
│   ├── types.ts              # Interface TypeScript (Article, Category, ChatMessage,...)
│   ├── components/           # Danh sách các UI components
│   │   ├── Header.tsx        # Sticky Header, menu navigation & search
│   │   ├── HeroSection.tsx   # Banner Hero trang chủ
│   │   ├── FeaturedNews.tsx  # Tin nổi bật / Tiêu điểm
│   │   ├── LatestNews.tsx    # Tin tức mới nhất
│   │   ├── CategoriesSection.tsx # Danh mục bài viết
│   │   ├── AiIntroSection.tsx # Khối giới thiệu AI Trạm Trưởng trên trang chủ
│   │   ├── AiTramTruongView.tsx # Trang giao diện chat AI Trạm Trưởng chính
│   │   ├── AiAssistantModal.tsx # Popup chat nhanh AI Trạm Trưởng
│   │   ├── ArticleDetailModal.tsx # Xem chi tiết bài viết (Clean typography & SEO)
│   │   ├── CategoryView.tsx  # Xem danh sách theo chuyên mục
│   │   ├── AboutView.tsx     # Trang giới thiệu Trạm Xanh
│   │   ├── ContactView.tsx   # Trang liên hệ
│   │   ├── NotFoundView.tsx  # Trang 404 thân thiện
│   │   ├── ErrorBoundary.tsx # Bắt lỗi ứng dụng toàn cục
│   │   ├── Breadcrumb.tsx    # Điều hướng vị trí trang
│   │   └── Footer.tsx        # Chân trang tự động cập nhật năm
│   ├── data/
│   │   └── mockData.ts       # Dữ liệu bài viết, chuyên mục & câu hỏi mẫu
│   ├── services/
│   │   └── gemini.ts         # Tích hợp Gemini API & System Prompt bảo mật
│   └── utils/
│       ├── seo.ts            # Utility cập nhật SEO & Open Graph meta tags
│       └── slug.ts           # Utility chuyển đổi tiêu đề tiếng Việt sang slug URL
```

---

## 💻 Hướng dẫn chạy & Triển khai

### 1. Cài đặt Dependencies
```bash
npm install
```

### 2. Khởi chạy môi trường phát triển (Dev)
```bash
npm run dev
```
Ứng dụng sẽ chạy tại địa chỉ local: `http://localhost:3000`

### 3. Kiểm tra mã nguồn (Linter & Typecheck)
```bash
npm run lint
```

### 4. Đóng gói cho Production (Build)
```bash
npm run build
```
Sản phẩm đóng gói tĩnh sẵn sàng cho Cloud Run / Vercel / Netlify / Firebase Hosting nằm ở thư mục `dist/`.

---

## 🛡️ Bảo mật & Tiêu chuẩn

- **API Key Security:** Key `GEMINI_API_KEY` được bảo mật server-side, không bao giờ lộ ra trình duyệt client.
- **System Prompt Protection:** AI Trạm Trưởng được huấn luyện từ chối lịch sự mọi yêu cầu tiết lộ instructions hoặc API key.
- **Fallback Error Handling:** Xử lý lỗi kết nối và dữ liệu bằng thông báo tiếng Việt thân thiện, không bao giờ hiển thị stack trace kỹ thuật cho người dùng cuối.

---

## 📄 Giấy phép (License)
Dự án được phát triển dưới giấy phép **MIT License** — Tự do phát triển và lan tỏa vì cộng đồng môi trường Việt Nam.

---

## 📧 Thông tin liên hệ
- **Tòa soạn:** Tạp chí Điện tử Trạm Xanh
- **Địa chỉ:** Tầng 5, Tòa nhà Sống Xanh, 88 Lý Thường Kiệt, Q. Hoàn Kiếm, Hà Nội
- **Email:** toasoan@tramxanh.vn
- **Hotline:** +84 (0) 24 3822 9999
