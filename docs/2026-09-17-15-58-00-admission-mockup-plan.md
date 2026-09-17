# Title: Plan — Dựng Mockup Cổng Thông Tin Tuyển Sinh & Quản Trị RBAC

- Classification: feature
- Description: Xây dựng mockup giao diện web tương tác cao gồm Cổng Thí sinh (Guest Portal) và Hệ thống Quản trị (Admin Portal) độc lập, thuần HTML5/CSS3/JavaScript với trải nghiệm Glassmorphism hiện đại và dữ liệu demo phong phú.

---

## Approach Summary / Goal

- **Mục tiêu**: Cung cấp một bộ UI mockup hoàn chỉnh, thẩm mỹ cao (Modern Glassmorphism & EdTech aesthetic), giàu tính tương tác và trực quan để bạn demo trực tiếp cho khách hàng xem và duyệt luồng nghiệp vụ mà không phụ thuộc vào backend hay database phức tạp.
- **Kiến trúc**: 
  - Tách bạch 2 trang độc lập: `index.html` (Cổng Thí sinh) và `admin.html` (Bảng Quản trị RBAC) kèm liên kết điều hướng qua lại thuận tiện.
  - Sử dụng CSS thuần với Design System đồng bộ: biến màu CSS, thẻ kính mờ (glassmorphism), typography hiện đại, animation mượt mà và responsive trên mọi thiết bị.
  - Dữ liệu demo tập trung trong `assets/js/mock-data.js` mô phỏng đầy đủ dữ liệu trường đại học lớn, các tổ hợp A00, B00, D01, điểm chuẩn 3-5 năm, học phí, đề án tuyển sinh, học bổng và lịch trình tuyển sinh.

---

## Functional Requirements

### 1. Cổng Thí Sinh (Guest Portal - `index.html`)
- **Trang chủ & Header**:
  - Thanh tìm kiếm thông minh với cơ chế gợi ý tức thì (autocomplete theo tên trường, mã trường, tên ngành).
  - Bộ lọc nhanh: Khu vực (Bắc, Trung, Nam), Khối ngành (Kinh tế, Kỹ thuật, Y dược, Sư phạm...), Khoảng điểm chuẩn.
  - Đồng hồ đếm ngược (Countdown timer) đến các mốc: Hạn nộp hồ sơ, Ngày thi THPT, Đăng ký nguyện vọng.
  - Bảng tin nổi bật: Cập nhật tin tuyển sinh nóng, bài viết hướng nghiệp và danh sách học bổng.
- **Tra cứu nâng cao**:
  - **Tra cứu theo điểm số**: Nhập điểm số & tổ hợp môn, thuật toán tự động phân loại 3 nhóm: *Vùng an toàn* (xanh lá), *Vùng với tới* (vàng/cam), *Vùng rủi ro* (đỏ/tím).
  - **Tra cứu theo Trường**: Profile chi tiết từng trường (mã trường, học phí trung bình, cơ sở đào tạo, đề án tuyển sinh, biểu đồ/bảng điểm chuẩn 3-5 năm qua các phương thức: Thi THPT, Học bạ, ĐGNL).
  - **Tra cứu theo Ngành**: Danh sách các trường đào tạo ngành, tổ hợp xét tuyển, biến động điểm qua các năm.
- **Công cụ So sánh song song (Comparison Tool)**:
  - Chọn tối đa 3-4 trường hoặc ngành cùng lúc đưa lên so sánh.
  - Hiển thị bảng đối chiếu trực quan: Mã trường, học phí, điểm chuẩn 3 năm, phương thức xét tuyển, ghi chú đặc biệt.
- **Tủ hồ sơ cá nhân tạm thời (Local Wishlist)**:
  - Nút lưu yêu thích (Bookmark/Trái tim) ở mỗi trường và ngành.
  - Lưu và đồng bộ trực tiếp với `LocalStorage` của trình duyệt.
  - Xem danh sách đã lưu, xóa mục, chuyển nhanh vào bảng so sánh.
- **Lịch Tuyển sinh & Học bổng**:
  - Dòng thời gian (Timeline) các mốc quan trọng của Bộ GD&ĐT.
  - Danh mục các gói học bổng (toàn phần, doanh nghiệp, điều kiện xét tuyển, chỉ tiêu).

### 2. Hệ thống Quản Trị (Admin Dashboard - `admin.html`)
- **Quản lý Xác thực & Phân quyền nội bộ (RBAC)**:
  - Màn hình đăng nhập bảo mật mô phỏng.
  - Thanh chuyển đổi nhanh vai trò để demo: *Super Admin* (toàn quyền), *Data Operator* (nhập điểm, trường/ngành), *Content Editor* (biên tập tin tức/học bổng).
  - Ẩn/hiện và phân quyền giao diện động theo vai trò đang chọn.
- **Quản lý Dữ liệu Tuyển sinh**:
  - CRUD Trường & Ngành: Danh sách, bộ lọc, modal thêm mới / chỉnh sửa, bật/tắt trạng thái ẩn/hiện.
  - Quản lý Điểm chuẩn: Cập nhật điểm theo năm, phương thức, tổ hợp môn, tiêu chí phụ.
  - Modal giả lập Import/Export Excel/CSV: Kéo thả file demo, xem trước bảng dữ liệu (preview modal), xuất file demo.
- **Quản lý Nội dung & Truyền thông (CMS)**:
  - Trình soạn thảo văn bản trực quan (WYSIWYG Editor giả lập với thanh công cụ: Bold, Italic, H1, H2, Danh sách, Link, Chèn ảnh).
  - Quản lý bài viết và chuyển trạng thái: Nháp (Draft), Đã xuất bản (Published), Gỡ xuống (Unpublished).

---

## Non-Functional Requirements

- Giao diện đạt tính thẩm mỹ cao: Giao diện hiện đại, sạch sẽ, chuẩn UI/UX EdTech, phối màu hài hòa, có micro-animations.
- Không cần cài đặt node_modules hay phụ thuộc máy chủ, có thể mở trực tiếp tệp `.html` hoặc chạy với bất kỳ local static server nào.
- Đáp ứng tốt trên máy tính để bàn, máy tính bảng và thiết bị di động.

---

## Files in Scope

- `index.html`: Cổng Thí sinh (Guest Portal)
- `admin.html`: Bảng Quản trị Tuyển sinh (Admin Portal)
- `assets/css/styles.css`: CSS Design System chung và style cho Guest Portal
- `assets/css/admin.css`: CSS chuyên dụng cho Admin Dashboard & CMS
- `assets/js/mock-data.js`: Cơ sở dữ liệu mẫu phong phú
- `assets/js/guest.js`: Logic xử lý tương tác phía Thí sinh
- `assets/js/admin.js`: Logic xử lý tương tác phía Quản trị

---

## Task List

| # | Status | Task | Responsible Role | Dependencies | Acceptance Criteria | Skills |
|---|---|---|---|---|---|---|
| 1 | TODO | Xây dựng bộ dữ liệu mẫu phong phú trong `assets/js/mock-data.js` | developer | none | Cung cấp danh sách trường, ngành, điểm 3 năm, học phí, học bổng, tin tức, lịch trình | `clean-code` |
| 2 | TODO | Xây dựng Design System & CSS Stylesheet trong `assets/css/styles.css` và `assets/css/admin.css` | developer | none | Giao diện hiện đại, responsive, biến màu CSS, glassmorphism, badge, modal | `clean-code` |
| 3 | TODO | Xây dựng Cổng Thí Sinh `index.html` và tương tác `assets/js/guest.js` | developer | task 1, 2 | Đầy đủ tìm kiếm autocomplete, bộ lọc, đếm ngược, phân 3 vùng điểm, tra cứu trường/ngành, so sánh song song, wishlist LocalStorage, timeline | `clean-code` |
| 4 | TODO | Xây dựng Bảng Quản Trị `admin.html` và tương tác `assets/js/admin.js` | developer | task 1, 2 | Đầy đủ màn hình login demo, RBAC switcher 3 vai trò, CRUD trường/ngành, bảng điểm chuẩn, import/export Excel modal, WYSIWYG CMS | `clean-code` |
| 5 | TODO | Kiểm thử toàn diện giao diện và xác minh các luồng trải nghiệm trên trình duyệt | tester | task 3, 4 | Mọi tương tác hoạt động mượt mà, không có lỗi console, giao diện trực quan sinh động | `aaa-testing` |
