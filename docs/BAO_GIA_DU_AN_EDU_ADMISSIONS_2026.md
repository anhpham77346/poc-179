# 📑 BẢNG BÁO GIÁ DỰ ÁN — EDU ADMISSIONS 2026
**Dự án:** Nền tảng Tra Cứu Tuyển Sinh & Định Hướng Nguyện Vọng Đại Học  
**Đơn giá ngày công nội bộ:** 500.000 VNĐ / ngày công (Man-day)  
**Ngày lập:** 17/09/2026  

---

## 👨‍💻 BẢNG 1: DÀNH CHO NỘI BỘ / DEVELOPER (CHI TIẾT ĐẦY ĐỦ CÁC CỘT)

### A. CÁC HẠNG MỤC CỐT LÕI (CORE MODULES)

| STT | Hạng mục / Chức năng | Mô tả phạm vi công việc chi tiết | Yêu cầu Trang Quản Trị (Admin) | Số ngày công | Thành tiền (VNĐ) |
| :---: | :--- | :--- | :---: | :---: | :---: |
| **1** | **Trang Chủ (Landing Page Hub)** | **• Người dùng:** Giao diện banner, slogan, thanh tìm kiếm nhanh, các thẻ Bento dẫn link trực tiếp vào từng phân hệ. | ❌ **Không cần Admin**<br>*(Giao diện tĩnh & link)* | **1 ngày** | **500.000 đ** |
| **2** | **Tra Cứu Hồ Sơ Trường & Ngành** | **• Người dùng:** Tìm kiếm trường/ngành theo từ khóa (gợi ý tự động), bộ lọc Miền & Khối ngành; Màn xem chi tiết thông tin trường, đề án, học phí và bảng điểm chuẩn 4 năm (2022 - 2025).<br>**• Quản trị:** Trang Admin quản lý danh mục Trường (thêm/sửa thông tin, học phí, logo) và Bảng cập nhật Điểm chuẩn các năm theo ngành/tổ hợp. | 🟢 **Cần Admin**<br>*(Quản lý Trường, Ngành & Điểm chuẩn)* | **5 ngày** | **2.500.000 đ** |
| **3** | **Bộ Gợi Ý & Xếp Nguyện Vọng Thông Minh** | **• Người dùng:** Nhập thẳng Tổng điểm xét tuyển (0-30đ) + Chọn tổ hợp môn. Hệ thống tự tính **Độ lệch điểm (+/-)** so với năm trước và đánh giá cơ hội (*Khả năng cao / Cạnh tranh / Thử thách*). Nút `+ Chọn NV` tự gán vào NV1, NV2, NV3...; nút mũi tên đảo thứ tự ưu tiên xét tuyển (↑ / ↓).<br>**• Quản trị:** Dùng chung dữ liệu điểm chuẩn từ Chức năng 2, không cần làm thêm trang Admin. | ❌ **Không cần Admin riêng**<br>*(Tận dụng data Chức năng 2)* | **2 ngày** | **1.000.000 đ** |
| **4** | **Bàn Cân So Sánh Chỉ Số Song Song** | **• Người dùng:** Thanh Dock ghim góc màn hình cho phép chọn tối đa 4 trường; Bảng đối chiếu song song: Học phí, Địa điểm, Quy mô ngành, Điểm chuẩn cao nhất, Đề án tuyển sinh.<br>**• Quản trị:** Sử dụng trực tiếp dữ liệu trường học đã có. | ❌ **Không cần Admin riêng**<br>*(Tự động đối chiếu data có sẵn)* | **1 ngày** | **500.000 đ** |
| **5** | **Lịch Tuyển Sinh & Quỹ Học Bổng** | **• Người dùng:** Lưới Bento Card hiển thị Mốc thời gian Bộ GD&ĐT và Danh mục Học bổng; Thanh tìm kiếm & lọc chuyên mục; **Màn Detail chi tiết** xem quy trình mốc thi hoặc quyền lợi, tiêu chuẩn nộp học bổng.<br>**• Quản trị:** Module Admin quản lý Mốc lộ trình thi và Danh mục Học bổng. | 🟢 **Cần Admin**<br>*(Quản lý Mốc tuyển sinh & Học bổng)* | **2 ngày** | **1.000.000 đ** |
| **6** | **Tin Tức & Cẩm Nang Tuyển Sinh (CMS)** | **• Người dùng:** Danh mục bài viết (Thông tư quy chế, dự báo nhân lực, hướng nghiệp); Tìm kiếm bài viết; **Màn Detail chi tiết** đọc toàn văn bài viết, trích dẫn văn bản Bộ GD&ĐT, lưu ý quy chế.<br>**• Quản trị:** Trình soạn thảo bài viết (WYSIWYG), chọn chuyên mục, đăng ảnh đại diện, chuyển đổi trạng thái Xuất bản / Bản nháp. | 🟢 **Cần Admin**<br>*(Module CMS Soạn thảo & Quản lý bài viết)* | **1 ngày** | **500.000 đ** |
| **7** | **Tủ Hồ Sơ Cá Nhân (Lưu Nguyện Vọng & Bài Viết)** | **• Người dùng:** Nút "Đã lưu" trên Header kèm popup xem lại các trường đã bookmark, bài viết quan tâm và toàn bộ Danh sách Nguyện vọng (NV1 - NV10) đã xếp.<br>**• Quản trị:** Dữ liệu lưu cục bộ trên trình duyệt học sinh (LocalStorage), không cần cơ sở dữ liệu quản trị. | ❌ **Không cần Admin**<br>*(Lưu cục bộ tại trình duyệt)* | **1 ngày** | **500.000 đ** |
| **8** | **Dựng Môi Trường & Hạ Tầng (DevOps)** | **• Phạm vi kỹ thuật:**<br>- Cài đặt & cấu hình máy chủ Web Server (Nginx / Linux VPS).<br>- Thiết lập Cơ sở dữ liệu (Database) & Cấu hình sao lưu (Backup) tự động.<br>- Cấu hình trỏ tên miền (Domain DNS) & Cài chứng chỉ bảo mật **SSL/HTTPS**.<br>- Thiết lập luồng triển khai mã nguồn tự động (**CI/CD** hoặc Docker Container) để cập nhật code 1 chạm.<br>- Tối ưu hóa bảo mật tường lửa (Firewall, giới hạn cổng truy cập). | ⚙️ **Hạ tầng & Vận hành**<br>*(Bắt buộc khi đưa web lên Internet)* | **2 ngày** | **1.000.000 đ** |
| **TỔNG** | **GÓI CỐT LÕI (FULL CORE SUITE)** | **Triển khai trọn gói 8 hạng mục cốt lõi & hạ tầng** | **3 phân hệ Admin + DevOps** | **15 ngày** | **7.500.000 đ** |

---

### B. CÁC HẠNG MỤC TÙY CHỌN NÂNG CAO (OPTIONAL ADD-ONS)

| STT | Hạng mục tùy chọn | Mô tả phạm vi công việc chi tiết | Yêu cầu Trang Quản Trị (Admin) | Số ngày công | Thành tiền (VNĐ) |
| :---: | :--- | :--- | :---: | :---: | :---: |
| **OP1** | **Landing Page Chuyên Sâu & Tối Ưu Hóa SEO Google** | **• Người dùng:** Thiết kế trang Landing Page hoàn chỉnh tối ưu tỷ lệ chuyển đổi (CTA, giới thiệu giá trị nền tảng, số liệu nổi bật, feedback, FAQ).<br>**• Tối ưu SEO:** Cấu hình chuẩn On-page SEO: Meta title/description động, OpenGraph (ảnh thumbnail hiển thị đẹp khi chia sẻ link lên Facebook/Zalo), Sitemap.xml tự động, Robots.txt, Thẻ cấu trúc dữ liệu Schema.org (JSON-LD cho tổ chức giáo dục), tối ưu tốc độ Core Web Vitals chuẩn Google PageSpeed 90+. | 🟢 **Cần Admin**<br>*(Cấu hình thẻ Meta SEO & Mã theo dõi Analytics / Pixel)* | **2 ngày** | **1.000.000 đ** |
| **OP2** | **Đăng Ký / Đăng Nhập (Học Sinh & Phụ Huynh) + Thanh Toán Trực Tuyến** | **• Xác thực người dùng (Auth):** Đăng ký, đăng nhập tài khoản bằng Email / SĐT hoặc Google Login (OAuth2); Quên/đổi mật khẩu; Phân quyền Học sinh & Phụ huynh.<br>**• Cổng thông tin cá nhân (Dashboard):** Đồng bộ dữ liệu đa thiết bị (Cloud database) thay vì chỉ lưu local, lưu lịch sử tra cứu, lưu hồ sơ học tập.<br>**• Cổng thanh toán trực tuyến (Payment Gateway):** Tích hợp cổng thanh toán tự động (VietQR / MoMo / VNPay) có Webhook xác nhận giao dịch tự động nạp tiền hoặc mở khóa gói dịch vụ VIP (tư vấn nguyện vọng 1-1, xuất PDF báo cáo phân tích cơ hội).<br>**• Quản trị:** Module Quản lý Danh sách Người dùng và Báo cáo Doanh thu Lịch sử Giao dịch. | 🟢 **Cần Admin**<br>*(Quản lý Thành viên & Lịch sử Giao dịch Doanh thu)* | **5 ngày** | **2.500.000 đ** |

---

## 💼 BẢNG 2: DÀNH CHO KHÁCH HÀNG (TINH GỌN)

### A. DANH MỤC CÁC CHỨC NĂNG CỐT LÕI
| STT | Hạng mục / Chức năng | Thành tiền (VNĐ) |
| :---: | :--- | :---: |
| **1** | Trang Chủ (Landing Page Hub) | **500.000 đ** |
| **2** | Phân hệ Tra Cứu Hồ Sơ Trường & Ngành *(kèm Trang Quản Trị Admin)* | **2.500.000 đ** |
| **3** | Bộ Gợi Ý & Xếp Nguyện Vọng Thông Minh (NV1 - NV10) | **1.000.000 đ** |
| **4** | Bàn Cân So Sánh Chỉ Số Trường Song Song | **500.000 đ** |
| **5** | Cổng Lịch Tuyển Sinh & Quỹ Học Bổng *(kèm Trang Quản Trị Admin)* | **1.000.000 đ** |
| **6** | Cổng Tin Tức & Cẩm Nang Tuyển Sinh *(kèm Trang Quản Trị CMS)* | **500.000 đ** |
| **7** | Tủ Hồ Sơ Cá Nhân (Lưu trữ Nguyện vọng & Bài viết) | **500.000 đ** |
| **8** | Dựng Môi Trường Máy Chủ & Triển Khai Hạ Tầng (DevOps) | **1.000.000 đ** |
| **TỔNG** | **TRỌN GÓI 8 HẠNG MỤC CỐT LÕI** | **7.500.000 đ** |

### B. CÁC HẠNG MỤC TÙY CHỌN NÂNG CAO (OPTIONAL)
*(Khách hàng có thể linh hoạt chọn thêm hoặc không chọn)*

| STT | Hạng mục tùy chọn nâng cao (Optional) | Thành tiền (VNĐ) |
| :---: | :--- | :---: |
| **OP1** | **Landing Page Chuyên Sâu & Tối Ưu Hóa SEO Google** *(Tăng thứ hạng tìm kiếm & share mạng xã hội)* | **1.000.000 đ** |
| **OP2** | **Đăng Ký / Đăng Nhập (Học sinh/Phụ huynh) + Cổng Thanh Toán Trực Tuyến** *(VietQR / MoMo / VNPay)* | **2.500.000 đ** |

---

### 🎁 GỢI Ý CÁC PHƯƠNG ÁN ĐÓNG GÓI CHO KHÁCH HÀNG

* **Phương án 1 — Cơ bản tiết kiệm (MVP Đã gồm DevOps):**
  * Bao gồm: **[1]** Trang chủ + **[2]** Tra cứu trường/ngành & Admin + **[8]** Dựng môi trường DevOps.
  * Tổng chi phí: **4.000.000 VNĐ** *(Thời gian: 8 ngày)*

* **Phương án 2 — Tuyển sinh Thông minh (Khuyên dùng nhiều nhất):**
  * Bao gồm: **[1]** Trang chủ + **[2]** Tra cứu & Admin + **[3]** Gợi ý & Xếp NV + **[4]** So sánh + **[7]** Tủ hồ sơ + **[8]** DevOps dựng môi trường.
  * Tổng chi phí: **6.000.000 VNĐ** *(Thời gian: 12 ngày)*

* **Phương án 3 — Trọn gói Nền tảng Tuyển sinh (Full Core Suite):**
  * Triển khai toàn bộ cả **8 hạng mục cốt lõi** từ [1] đến [8].
  * Tổng chi phí: **7.500.000 VNĐ** *(Thời gian: 15 ngày)*

* **Phương án 4 — Hệ sinh thái Toàn diện Cao cấp (Full Core + 2 Optionals):**
  * Triển khai toàn bộ 8 hạng mục cốt lõi + **[OP1] SEO Google** + **[OP2] Đăng nhập & Thanh toán**.
  * Tổng chi phí: 7.500.000 + 1.000.000 + 2.500.000 = **11.000.000 VNĐ** *(Thời gian: 22 ngày)*

---
*Ghi chú: Chi phí thuê máy chủ (VPS/Cloud) và phí duy trì Tên miền hàng năm do khách hàng thanh toán trực tiếp cho nhà cung cấp dịch vụ hạ tầng.*
