# Title: Plan — Tái Thiết Kế UI Glassmorphism Cao Cấp & Bento Grid (Linear/Apple Style)

- Classification: feature
- Description: Nâng cấp toàn diện giao diện Cổng Thí Sinh & Quản Trị theo phong cách Glassmorphism và xu hướng Bento Grid bất đối xứng chuẩn Linear/Apple, loại bỏ toàn bộ emoji, thay bằng SVG icons tối giản và nhãn Enterprise.

---

## Approach Summary / Goal

- **Mục tiêu**: Loại bỏ cảm giác "hoạt họa/demo sơ sài" do các emoji mang lại, nâng tầm dự án thành một sản phẩm EdTech Enterprise cao cấp, chân thực với phong cách thiết kế thời thượng được các hãng công nghệ lớn (Apple, Linear, Vercel) ưa chuộng: **Glassmorphism với specular highlight** và **Bento Grid bất đối xứng**.
- **Giải pháp thực hiện**:
  1. **Hệ màu & Hiệu ứng Glassmorphism**: Nền mesh gradient sâu thẳm, thẻ kính mờ nhiều lớp (`backdrop-filter: blur(24px)`), viền mỏng 1px với hiệu ứng phản quang (specular light border), bóng đổ phân tầng mềm mại.
  2. **Kiến trúc Bento Grid**: Tái cấu trúc Trang chủ, Hero, Bộ đếm Countdown, Bộ công cụ Phân tích 3 vùng điểm và Tin tức thành các khối Bento Grid lồng ghép linh hoạt (`col-span-2`, `row-span-2`).
  3. **Hệ thống SVG Icons Chuẩn hóa**: Loại bỏ 100% emoji, thay bằng vector SVG sắc nét phong cách Lucide/Feather (Search, Sliders, Bookmark, ArrowRight, ShieldCheck, Scale, Zap, Calendar, ExternalLink...).
  4. **Nhận diện Trường & Ngành**: Thay các emoji icon trường bằng huy hiệu Monogram tối giản với phối màu gradient chuyên nghiệp (BKA, FTU, NEU, HCMUT...).

---

## Functional Requirements

### 1. Cổng Thí Sinh (Guest Portal - `index.html`)
- **Bento Grid Hero & Core**:
  - Khối chính (Main Bento Card - span 2): Headline đẳng cấp, Smart search bar viền phát quang kính mờ, autocomplete dropdown thiết kế tối giản.
  - Khối phụ (Side Bento Card): Bộ đếm tuyển sinh Countdown tích hợp dạng widget đồng hồ kỹ thuật số thu nhỏ siêu nét.
  - Khối Quick Filters: Thiết kế dạng thanh pill kính mờ tinh tế.
- **Bento Grid Tra cứu 3 Vùng Điểm**:
  - Bố cục 3 thẻ Bento tương ứng 3 vùng (Safe, Reach, Risk) với chỉ báo chấm phát quang (Glowing Status Dot): Xanh lục ngọc (Emerald), Vàng hổ phách (Amber), Đỏ ruby (Crimson).
  - Thẻ trường & ngành hiển thị dạng danh sách nén tối ưu, nút bookmark SVG và nút so sánh chuẩn UI sản phẩm thật.
- **Danh mục Trường & Ngành**:
  - Chuyển đổi thẻ trường sang Bento Card với monogram badge, thông số học phí, chỉ tiêu và nút chi tiết.
- **Bảng So Sánh & Tủ Hồ Sơ**:
  - Giữ nguyên toàn bộ logic đã hoạt động mượt mà (LocalStorage & Frontend state), chỉ nâng cấp giao diện modal và thanh dock đáy thành kính mờ cao cấp với icon SVG.

### 2. Bảng Quản Trị Tuyển Sinh (Admin Dashboard - `admin.html`)
- **Màn hình Login & RBAC**:
  - Giao diện đăng nhập chuẩn Enterprise SSO / Auth Portal với thiết kế kính mờ sang trọng, loại bỏ emoji.
  - Thanh chọn vai trò RBAC bằng Switcher nút bấm cao cấp với badge định danh quyền hạn.
- **Bento Overview & Bảng dữ liệu**:
  - Các thẻ KPI chuyển sang Bento Stats Card với tỷ lệ hiển thị cân đối.
  - Bảng CRUD Trường, Điểm chuẩn, Excel Import và CMS chuyển nút thao tác từ emoji sang SVG icon sắc sảo (Edit, Lock/Unlock, Trash, Save, Download, Upload).

---

## Non-Functional Requirements

- Đảm bảo độ sắc nét cao (HiDPI), độ tương phản văn bản chuẩn WCAG 2.1 AA.
- Giữ nguyên toàn bộ tính năng và logic Javascript hiện có (không gây vỡ logic hay mất tính năng).
- Chạy siêu mượt trên trình duyệt, không cần thư viện ngoài nặng nề.

---

## Files in Scope

- `assets/css/styles.css`: Nâng cấp Design system tokens, Glassmorphism và hệ thống Bento Grid classes.
- `assets/css/admin.css`: Nâng cấp bảng quản trị theo phong cách Bento & Glassmorphism đồng bộ.
- `assets/js/mock-data.js`: Chuyển đổi logo trường học sang Monogram badges & Accent color, làm sạch emoji.
- `assets/js/guest.js`: Cập nhật logic render sang SVG icons sắc nét.
- `assets/js/admin.js`: Cập nhật logic render bảng quản trị sang SVG icons và badge chuẩn.
- `index.html`: Tái cấu trúc layout theo Bento Grid, loại bỏ toàn bộ emoji tĩnh.
- `admin.html`: Tái cấu trúc layout quản trị, loại bỏ toàn bộ emoji.

---

## Task List

| # | Status | Task | Responsible Role | Dependencies | Acceptance Criteria | Skills |
|---|---|---|---|---|---|---|
| 1 | TODO | Nâng cấp Design System tokens, Bento Grid classes và hiệu ứng Glassmorphism trong `assets/css/styles.css` và `assets/css/admin.css` | developer | none | Có hệ thống Bento Grid, border specular highlight, mesh gradient aura, không còn style thô | `clean-code` |
| 2 | TODO | Cập nhật dữ liệu monogram và loại bỏ emoji trong `assets/js/mock-data.js` | developer | none | Dữ liệu trường học, bài viết, mốc thời gian sạch bóng emoji, chuẩn Enterprise | `clean-code` |
| 3 | TODO | Cập nhật logic render HTML với SVG icons trong `assets/js/guest.js` và `assets/js/admin.js` | developer | task 1, 2 | Render danh sách thẻ, nút bấm, modal dùng SVG icons sắc nét | `clean-code` |
| 4 | TODO | Tái cấu trúc layout Bento Grid và hoàn thiện `index.html` cùng `admin.html` | developer | task 1, 2, 3 | Giao diện Bento Grid mượt mà, đậm chất Linear/Apple, chuyên nghiệp như hệ thống thật | `clean-code` |
