# Plan — Tái Cấu Trúc Cơ Chế Tra Cứu: Bộ Gợi Ý & Xếp Nguyện Vọng Thông Minh (Thay Thế 3 Vùng Điểm)

- Classification: feature
- Description: Thay thế phần 3 vùng điểm rời rạc bằng Bảng Gợi Ý & Xếp Nguyện Vọng Thông Minh: tính độ lệch điểm (+/-), đánh giá xác suất cơ hội theo thời gian thực và cho phép thí sinh gán thứ tự nguyện vọng dự kiến (NV1, NV2, NV3...).

---

## Approach Summary / Goal

- **Tối ưu hóa bảng tính điểm**: Thí sinh nhập điểm 3 môn thi, điểm ưu tiên để hệ thống tự tính Tổng điểm xét tuyển.
- **Bảng gợi ý danh sách ngành hợp nhất (Unified Recommendation Table)**: Thay vì chia thành 3 cột riêng, tất cả các ngành của các trường phù hợp với tổ hợp môn sẽ được hiển thị trong một bảng duy nhất:
  - Hiển thị rõ **Điểm chuẩn năm gần nhất (2024)** và **Độ lệch điểm** (ví dụ: `+1.25 đ` màu xanh lá nếu bạn dư điểm, `-0.50 đ` màu cam nếu thiếu ít điểm).
  - Đánh giá cơ hội trúng tuyển trực quan bằng Badge phân cấp: 🟢 **Cơ hội rất cao** (Dư ≥ 1.0đ), 🟡 **Cạnh tranh sát sao** (Chênh lệch trong khoảng ±0.5đ), 🔴 **Thử thách / Ước mơ** (Thấp hơn 0.5 - 1.5đ).
- **Khối Quản lý Nguyện Vọng Dự Kiến (Aspirations Drafter)**:
  - Cho phép thí sinh bấm nút **"+ Thêm vào Nguyện Vọng"** để tự động xếp vào danh sách: `Nguyện vọng 1`, `Nguyện vọng 2`, `Nguyện vọng 3`...
  - Cho phép sắp xếp lại thứ tự (đẩy lên / hạ xuống) và lưu toàn bộ danh sách nguyện vọng vào Tủ hồ sơ cá nhân.
- **Mục tiêu**: Cung cấp công cụ tra cứu sát thực tế 100% với kỳ thi tuyển sinh đại học, giúp thí sinh xây dựng chiến lược đặt nguyện vọng an toàn và hiệu quả nhất.

## Functional Requirements

1. **Thanh nhập điểm & Bộ lọc thông minh**:
   - Chọn Tổ hợp môn thi (A00, A01, B00, D01, D07...).
   - Nhập Điểm thi 3 môn & Điểm ưu tiên (tự động cộng dồn ra Tổng điểm thực tế).
   - Bộ lọc phụ: Khu vực (Bắc / Trung / Nam) và Khối ngành đào tạo.
2. **Bảng Gợi Ý Ngành Xét Tuyển Thông Minh**:
   - Cột 1: Trường & Mã trường, Tên ngành & Mã ngành.
   - Cột 2: Tổ hợp môn & Chỉ tiêu ngành.
   - Cột 3: Điểm chuẩn 2024 & Xu hướng 3 năm (↗ ↘ ↔).
   - Cột 4: **Độ lệch điểm so với điểm thí sinh** (`+X.XX đ` hoặc `-X.XX đ`).
   - Cột 5: **Mức độ cơ hội trúng tuyển** (Huy hiệu màu sắc chuẩn SaaS).
   - Cột 6: Nút thao tác **"+ Thêm vào NV"** hoặc **"✓ Đã thêm (NV1)"**.
3. **Khối Bảng Danh Sách Nguyện Vọng Dự Kiến (Aspirations Sheet)**:
   - Hiển thị danh sách các nguyện vọng thí sinh đã lựa chọn theo thứ tự ưu tiên (NV1, NV2, NV3...).
   - Cho phép xóa hoặc đảo thứ tự nguyện vọng.
   - Nút "Lưu toàn bộ danh sách nguyện vọng vào Tủ hồ sơ" (hiển thị Toast thành công).

## Non-Functional Requirements

- Phong cách Clean Light Mode, Bento Grid, Frosted Glass sắc nét.
- 100% SVG icons cao cấp, responsive mượt mà trên desktop và tablet.
- Tính toán độ lệch điểm và lọc bảng tức thì (real-time) ở client-side mà không cần tải lại trang.

## Files in Scope

- [MODIFY] `search.html`: Thay thế section `#scoreCalculatorSection` và 3 cột vùng điểm bằng giao diện Bảng Gợi Ý & Khối Xếp Nguyện Vọng Dự Kiến.
- [MODIFY] `assets/js/guest.js`: Viết lại logic tính điểm sang cơ chế tính độ lệch `scoreDiff = studentScore - benchmarkScore`, render bảng gợi ý ngành và quản lý danh sách nguyện vọng dự kiến.
- [MODIFY] `assets/css/styles.css`: Bổ sung CSS cho bảng gợi ý nguyện vọng, badge độ lệch điểm (+/-) và danh sách nguyện vọng dự kiến.

## Risks & Assumptions

- Giữ nguyên các hàm Modal chi tiết trường và Bàn cân so sánh (Comparison Dock) đã chạy ổn định.
- Danh sách nguyện vọng dự kiến lưu trữ an toàn trên `GuestState` và đồng bộ với LocalStorage.

## Open Questions / Blockers

- Không có.

## Status

- [x] Ready to execute

## Task List (100% Developer Tasks - No Tester Tasks)

| # | Status | Task | Responsible Role | Dependencies | Acceptance Criteria | Skills |
|---|---|---|---|---|---|---|
| 1 | TODO | Cập nhật cấu trúc HTML trong `search.html`: Dựng form nhập điểm + Bảng Gợi Ý Ngành + Khối Nguyện Vọng Dự Kiến | developer | none | Thay thế hoàn toàn 3 cột cũ; cấu trúc Bento Grid chuẩn chỉ, có các cột độ lệch điểm và nút xếp NV | `clean-code` |
| 2 | TODO | Tái cấu trúc logic trong `assets/js/guest.js`: Xử lý tính độ lệch điểm `+/-`, lọc tổ hợp, xếp thứ tự NV1, NV2, NV3 | developer | task 1 | Nhập điểm lập tức hiển thị độ lệch điểm chính xác, gán và đảo thứ tự nguyện vọng mượt mà | `clean-code` |
| 3 | TODO | Bổ sung styling trong `assets/css/styles.css` cho bảng gợi ý thông minh, badge cơ hội và dock nguyện vọng | developer | task 1, 2 | Giao diện Clean Light Mode, độ lệch điểm xanh/cam/đỏ trực quan, typography sắc nét | `clean-code` |
| 4 | TODO | Kiểm tra code, hoàn thiện giao diện và cập nhật tài liệu walkthrough | developer | task 3 | Tất cả thao tác nhập điểm, đối chiếu độ lệch điểm, thêm/xóa nguyện vọng chạy hoàn hảo | `clean-code` |
