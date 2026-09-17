# Title: Plan — Tách Trang Chủ Landing Page & Xây Dựng 3 Trang Chuyên Biệt

- Classification: feature
- Description: Tái cấu trúc thành Landing Page trung tâm (`index.html`) với các Bento action buttons dẫn tới 3 trang chuyên biệt: Tra cứu & Điểm chuẩn (`search.html`, bỏ đếm ngược), Lịch tuyển sinh & Học bổng (`schedule.html`), và Tin tức & Cẩm nang (`news.html`).

---

## Approach Summary / Goal

- **Mục tiêu**: Nâng cấp kiến trúc trang web từ mô hình One-Page tổng hợp thành một hệ thống đa trang chuyên nghiệp (Multi-page App):
  - **Trang chủ (`index.html`)**: Đóng vai trò Landing Page định hướng người dùng, làm nổi bật giá trị cốt lõi với Bento Navigation Cards dẫn trực tiếp đến các tính năng.
  - **Trang Tra cứu (`search.html`)**: Tập trung 100% vào nghiệp vụ tra cứu trường, ngành, điểm chuẩn các năm, phân tích 3 vùng điểm và công cụ so sánh song song. **Bỏ phần đếm ngược** để tối ưu hóa sự tập trung.
  - **Trang Lịch & Học bổng (`schedule.html`)**: Trình bày dòng thời gian các mốc sự kiện của Bộ GD&ĐT và danh mục các gói học bổng giá trị.
  - **Trang Tin tức (`news.html`)**: Hiển thị bảng tin quy chế mới, dự báo nhân lực và cẩm nang hướng nghiệp.
- **Phong cách & Thẩm mỹ**: Tiếp tục duy trì chuẩn **Bento Grid & Apple Frosted Glassmorphism (Clean Light Mode)** với vector SVG tối giản và typography sắc nét.

---

## Functional Requirements

### 1. Trang Chủ Landing Page (`index.html`)
- **Hero Showcase**:
  - Tiêu đề định vị thương hiệu, mô tả cô đọng, nút Call-to-Action chính "Bắt đầu tra cứu".
  - Thanh tìm kiếm nhanh gợi ý tức thì (Quick launch search).
- **Bento Action Hub (Điều hướng trực quan)**:
  - **Card 1 (Chính - Tra cứu chuyên sâu)**: Giới thiệu tính năng tra cứu trường/ngành theo điểm, điểm chuẩn 3 năm, phân tích 3 vùng cơ hội -> Nút bấm chuyển sang `search.html`.
  - **Card 2 (So sánh song song)**: Giới thiệu bàn cân đối chiếu 3-4 trường -> Nút bấm chuyển thẳng đến `search.html#compare`.
  - **Card 3 (Lịch trình & Học bổng)**: Giới thiệu các mốc tuyển sinh và quỹ học bổng -> Nút bấm chuyển sang `schedule.html`.
  - **Card 4 (Tin tức & Cẩm nang)**: Giới thiệu báo cáo nhân lực và thông tư tuyển sinh -> Nút bấm chuyển sang `news.html`.
- **Thống kê & Uy tín (Metrics Strip)**: Hiển thị các chỉ số ấn tượng (500+ Ngành đào tạo, 63 Tỉnh thành, 100% Khách quan).

### 2. Trang Tra Cứu & Điểm Chuẩn (`search.html`)
- **Loại bỏ đồng hồ đếm ngược** theo yêu cầu người dùng.
- Thanh tìm kiếm thông minh với cơ chế autocomplete gợi ý tức thì.
- Bộ lọc nhanh theo Miền và Khối ngành.
- Công cụ tính điểm và phân tích 3 vùng cơ hội (An toàn, Vừa sức, Thử thách).
- Danh sách trường đại học với modal Profile chi tiết và bảng điểm chuẩn 3 năm (2022 - 2025).
- Danh mục tra cứu theo Ngành đào tạo.
- Thanh dock so sánh song song và modal đối chiếu.
- Tủ hồ sơ cá nhân LocalStorage (Wishlist).

### 3. Trang Lịch Tuyển Sinh & Học Bổng (`schedule.html`)
- Dòng thời gian (Timeline) các mốc quan trọng của Bộ GD&ĐT.
- Danh mục các gói học bổng toàn phần, học bổng doanh nghiệp với thông tin giá trị, điều kiện, hạn nộp và nút ứng tuyển.

### 4. Trang Tin Tức & Cẩm Nang (`news.html`)
- Bộ lọc theo chuyên mục (Thông tư - Quy chế, Dự báo nhân lực, Tư vấn hướng nghiệp).
- Grid thẻ bài viết Bento hiện đại với tác giả, ngày đăng, thời gian đọc, tóm tắt và nút xem chi tiết.

---

## Files in Scope

- `index.html`: [MODIFY] Thiết kế thành Landing Page với Bento Action Hub.
- `search.html`: [NEW] Trang Tra cứu trường/ngành & điểm số (bỏ đếm ngược, giữ nguyên logic cốt lõi).
- `schedule.html`: [NEW] Trang Lịch tuyển sinh & Học bổng chuyên biệt.
- `news.html`: [NEW] Trang Tin tức & Cẩm nang hướng nghiệp chuyên biệt.
- `assets/js/guest.js`: [MODIFY] Tối ưu script để phục vụ cho cả 4 trang mà không bị lỗi element null.

---

## Task List

| # | Status | Task | Responsible Role | Dependencies | Acceptance Criteria | Skills |
|---|---|---|---|---|---|---|
| 1 | TODO | Tối ưu hóa `assets/js/guest.js` để chạy an toàn trên từng trang độc lập | developer | none | Hàm kiểm tra phần tử tồn tại trước khi thao tác, không có exception null | `clean-code` |
| 2 | TODO | Xây dựng Trang Chủ Landing Page `index.html` với Bento Action Hub | developer | task 1 | Hero ấn tượng, 4 thẻ Bento dẫn tới 4 tính năng, số liệu thống kê | `clean-code` |
| 3 | TODO | Xây dựng Trang Tra Cứu `search.html` (bỏ đếm ngược, đầy đủ tìm kiếm, 3 vùng điểm, so sánh, wishlist) | developer | task 1 | Đầy đủ tính năng tra cứu, bỏ đếm ngược, modal điểm chuẩn 3 năm hoạt động hoàn hảo | `clean-code` |
| 4 | TODO | Xây dựng Trang Lịch & Học Bổng `schedule.html` và Trang Tin Tức `news.html` | developer | task 1 | Timeline chi tiết, danh mục học bổng, bộ lọc tin tức chuyên nghiệp | `clean-code` |
