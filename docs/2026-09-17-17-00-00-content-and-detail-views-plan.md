# Plan — Loại Bỏ Excel, Tách Module Quản Lý Nội Dung & Đồng Bộ Giao Diện Chi Tiết (Màn Detail)

- Classification: feature
- Description: Loại bỏ tính năng Excel/CSV, tách module Quản trị Nội dung thành Tuyển sinh/Học bổng & Tin tức, đồng thời thiết kế trang Lịch tuyển sinh/Học bổng chuẩn Bento Grid giống Tin tức và bổ sung màn Detail cho cả hai phía thí sinh.

---

## Approach Summary / Goal

- **Tối ưu hóa bảng Admin**: Xóa bỏ phân hệ Excel/CSV để tinh gọn thao tác vận hành; tạo 2 tab riêng biệt là "Tuyển sinh & Học bổng" và "Tin tức & Quy chế" trên Sidebar với đầy đủ bảng quản lý và modal cập nhật dữ liệu.
- **Đồng bộ hóa trải nghiệm Thí sinh**: Biến `schedule.html` thành trang duyệt thẻ thông tin trực quan theo phong cách `news.html` với bộ lọc chuyên mục (Mốc tuyển sinh, Học bổng toàn phần, Học bổng doanh nghiệp), thanh tìm kiếm nhanh.
- **Màn Detail tương tác**: Tích hợp Modal xem chi tiết bài viết (News Detail Modal) và Modal xem chi tiết mốc tuyển sinh / học bổng (Schedule/Scholarship Detail Modal) kèm đầy đủ thông tin hướng dẫn, tiêu chí và liên kết nộp hồ sơ.
- **Mục tiêu**: Hệ thống vận hành mạch lạc, giao diện phía thí sinh đồng bộ, người dùng click vào bất kỳ tin tức hay gói học bổng nào đều xem được màn Detail chi tiết như ứng dụng thật.

## Functional Requirements

1. **Admin - Loại bỏ Excel/CSV**:
   - Gỡ bỏ mục menu `Nhập/Xuất Excel` trên Sidebar của `admin.html`.
   - Gỡ bỏ section `section_excel` và modal xem trước Excel.
   - Loại bỏ các hàm xử lý file Excel/CSV trong `assets/js/admin.js`.
2. **Admin - Tách Quản lý Tuyển sinh & Học bổng**:
   - Sidebar bổ sung mục `Tuyển sinh & Học bổng` (`data-section="admissions_scholarships"`).
   - Panel hiển thị bảng danh sách các mốc thời gian tuyển sinh và các gói học bổng (thời gian, cơ quan, trị giá, đối tượng).
   - Hỗ trợ modal thêm/sửa mốc sự kiện và học bổng.
3. **Admin - Tách Quản lý Tin tức**:
   - Sidebar bổ sung mục `Quản lý Tin tức` (`data-section="news_cms"`).
   - Panel hiển thị bảng bài viết quy chế, cẩm nang với thao tác Sửa/Xóa/Xuất bản qua trình soạn thảo WYSIWYG.
4. **Guest - Trang Lịch tuyển sinh & Học bổng (`schedule.html`)**:
   - Chuyển đổi giao diện sang dạng lưới Card đồng bộ với `news.html`.
   - Bộ lọc Pill chuyên mục: "Tất cả", "Mốc tuyển sinh 2026", "Học bổng toàn phần", "Học bổng tài trợ".
   - Ô tìm kiếm nhanh sự kiện / học bổng theo từ khóa.
5. **Guest - Màn Detail cho cả 2 trang**:
   - `news.html`: Click vào card bài viết mở Modal Full Detail (tiêu đề, chuyên mục, ngày đăng, tác giả, nội dung phân đoạn chi tiết, văn bản đính kèm).
   - `schedule.html`: Click vào card mốc thời gian hoặc học bổng mở Modal Full Detail (thông tin mốc thời gian, hồ sơ chuẩn bị, giá trị học bổng, điều kiện xét tuyển, nút nộp hồ sơ trực tuyến).

## Non-Functional Requirements

- Phong cách Bento Grid, Frosted Glass trên nền sáng (Clean Light Mode), độ tương phản cao chuẩn WCAG.
- Sử dụng 100% SVG icons tinh xảo, tuyệt đối không dùng emoji hay icon hoạt hình.
- Phản hồi tức thì, mượt mà trên trình duyệt mà không cần tải lại trang.

## Files in Scope

- [MODIFY] `assets/js/mock-data.js`: Bổ sung trường nội dung chi tiết (`fullContent`, `requirements`, `documents`, `steps`, `benefits`) cho các bài viết, mốc tuyển sinh và học bổng.
- [MODIFY] `admin.html`: Bỏ menu & panel Excel; thêm menu & panel `admissions_scholarships` và `news_cms`.
- [MODIFY] `assets/js/admin.js`: Xóa code Excel; thêm code render và CRUD cho Tuyển sinh/Học bổng và Tin tức.
- [MODIFY] `schedule.html`: Tái cấu trúc theo phong cách `news.html` (thanh lọc chuyên mục, thẻ Bento Grid, Modal Detail).
- [MODIFY] `news.html`: Tích hợp Modal Detail bài viết tương tác khi click vào card.
- [MODIFY] `assets/js/guest.js`: Bổ sung logic render thẻ tuyển sinh/học bổng, bộ lọc, mở Modal Detail cho bài viết và học bổng.
- [MODIFY] `assets/css/styles.css`: Bổ sung CSS cho màn Detail (Detail Modal typography, layout callout, badge).

## Risks & Assumptions

- Giữ nguyên mock data trong LocalStorage/Memory, không phá vỡ các chức năng Tra cứu điểm chuẩn hay Tủ hồ sơ đã làm trước đó.
- Không cần backend thực tế, mọi thao tác CRUD và xem detail đều chạy client-side mượt mà để demo cho khách hàng.

## Open Questions / Blockers

- Không có.

## Status

- [x] Ready to execute

## Task List (100% Developer Tasks - No Tester Tasks)

| # | Status | Task | Responsible Role | Dependencies | Acceptance Criteria | Skills |
|---|---|---|---|---|---|---|
| 1 | TODO | Cập nhật `assets/js/mock-data.js` bổ sung dữ liệu chi tiết cho sự kiện tuyển sinh, học bổng và bài viết | developer | none | Dữ liệu có đầy đủ nội dung toàn văn, điều kiện, hướng dẫn cho màn detail | `clean-code` |
| 2 | TODO | Tái cấu trúc `admin.html` & `assets/js/admin.js`: Bỏ Excel, tách 2 module Tuyển sinh/Học bổng & Tin tức | developer | task 1 | Sidebar có 2 mục rõ ràng; xóa hoàn toàn Excel; các bảng dữ liệu hoạt động chuẩn chỉ | `clean-code` |
| 3 | TODO | Cập nhật `schedule.html` và `assets/js/guest.js`: Chuyển sang Bento cards + bộ lọc + Màn Detail | developer | task 1, 2 | Giao diện đẹp như `news.html`, có lọc chuyên mục và modal xem chi tiết mốc/học bổng | `clean-code` |
| 4 | TODO | Cập nhật `news.html` và `assets/js/guest.js`: Tích hợp Màn Detail toàn văn bài viết | developer | task 1, 3 | Click bất kỳ bài viết nào đều hiển thị modal chi tiết đẹp mắt, đóng/mở mượt mà | `clean-code` |
| 5 | TODO | Tinh chỉnh CSS trong `assets/css/styles.css` và `assets/css/admin.css` cho màn Detail & Bento cards | developer | task 3, 4 | Giao diện chuẩn Light Frosted Glass, typography sắc nét, responsive | `clean-code` |
