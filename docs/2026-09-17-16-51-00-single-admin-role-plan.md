# Title: Plan — Đơn Giản Hóa Quản Trị: Chỉ Sử Dụng 1 Vai Trò Admin Duy Nhất (Loại Bỏ RBAC)

- Classification: feature
- Description: Loại bỏ cơ chế phân quyền đa vai trò (Super Admin, Data Operator, Content Editor), quy về 1 vai trò Quản Trị Viên (Administrator) duy nhất với toàn quyền quản lý hệ thống.

---

## Approach Summary / Goal

- **Mục tiêu**: Đơn giản hóa bảng điều khiển Quản trị viên theo đúng yêu cầu:
  - Loại bỏ các nút chọn vai trò tại màn hình đăng nhập giả lập.
  - Loại bỏ thanh dropdown chuyển đổi vai trò (RBAC Switcher) trên thanh Topbar.
  - Cố định 1 vai trò duy nhất: **Quản Trị Viên Hệ Thống (Administrator)** với toàn quyền truy cập tất cả các phân hệ (Tổng quan, Trường & Ngành, Điểm chuẩn, Nhập/Xuất Excel, CMS).
  - Cập nhật các nhãn điều hướng từ "Quản trị RBAC" thành "Trang Quản Trị" trên toàn bộ các trang (`index.html`, `search.html`, `schedule.html`, `news.html`).

---

## Functional Requirements

### 1. Bảng Quản Trị (`admin.html` & `assets/js/admin.js`)
- **Màn hình Đăng Nhập**:
  - Loại bỏ lưới nút chọn vai trò (Super Admin / Data Operator / Content Editor).
  - Giữ lại form đăng nhập gọn gàng với nút bấm: "Đăng nhập vào Hệ thống Quản trị".
- **Thanh Topbar**:
  - Loại bỏ thanh chọn vai trò `topbarRoleSelect`.
  - Hiển thị thông tin người dùng: **Quản Trị Viên** (Administrator).
- **Phân Quyền & Menu**:
  - Mở toàn quyền cho tất cả các menu điều hướng bên sidebar: Tổng quan, Quản lý Trường & Ngành (CRUD), Quản lý Điểm chuẩn, Nhập/Xuất Excel, Quản lý Nội dung (CMS).
  - Loại bỏ logic ẩn/hiện menu trong `assets/js/admin.js`.
- **Đổi tên nhận diện**: Đổi từ "EDU ADMIN RBAC" thành "EDU ADMIN".

### 2. Đồng Bộ Nhãn Điều Hướng Trên Toàn Hệ Thống
- Đổi nhãn nút bấm trên header từ "Quản trị RBAC" thành "Trang Quản Trị" tại:
  - `index.html`
  - `search.html`
  - `schedule.html`
  - `news.html`

---

## Task List

| # | Status | Task | Responsible Role | Dependencies | Acceptance Criteria | Skills |
|---|---|---|---|---|---|---|
| 1 | TODO | Đơn giản hóa `admin.html`: loại bỏ role buttons trên login overlay và dropdown role switcher trên topbar | developer | none | Login overlay và topbar chỉ hiển thị 1 vai trò Quản Trị Viên duy nhất | `clean-code` |
| 2 | TODO | Tối ưu hóa `assets/js/admin.js`: loại bỏ toàn bộ code phân quyền RBAC | developer | task 1 | Luôn mở toàn quyền cho tất cả phân hệ, không còn logic ẩn/hiện menu | `clean-code` |
| 3 | TODO | Cập nhật nhãn CTA trên header các trang khách thành "Trang Quản Trị" | developer | none | Đồng bộ tên gọi chuẩn xác trên toàn bộ 4 trang | `clean-code` |
