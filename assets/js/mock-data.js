/**
 * MOCK DATABASE - CỔNG THÔNG TIN TUYỂN SINH & QUẢN TRỊ 2026
 * Chuẩn hóa dữ liệu Enterprise, loại bỏ emoji, sử dụng Monogram và mã nhận diện chuẩn
 */

const MOCK_DATA = {
  // Cấu hình mốc đếm ngược (Countdown)
  countdowns: [
    {
      id: 'thpt',
      title: 'Kỳ thi Tốt nghiệp THPT 2026',
      targetDate: '2026-06-26T07:30:00',
      description: 'Ngày thi chính thức trên toàn quốc',
      badge: 'Trọng tâm',
      type: 'exam'
    },
    {
      id: 'nguyenvong',
      title: 'Hạn đăng ký nguyện vọng',
      targetDate: '2026-07-30T17:00:00',
      description: 'Cổng trực tuyến Bộ GD&ĐT đóng hệ thống',
      badge: 'Cấp bách',
      type: 'deadline'
    },
    {
      id: 'nhaphoc',
      title: 'Xác nhận nhập học Đợt 1',
      targetDate: '2026-08-20T17:00:00',
      description: 'Hạn hoàn thành thủ tục tại trường đại học',
      badge: 'Hoàn tất',
      type: 'admission'
    }
  ],

  // Danh mục bộ lọc
  regions: [
    { id: 'all', name: 'Tất cả' },
    { id: 'north', name: 'Miền Bắc' },
    { id: 'central', name: 'Miền Trung' },
    { id: 'south', name: 'Miền Nam' }
  ],

  categories: [
    { id: 'all', name: 'Tất cả ngành' },
    { id: 'tech', name: 'Kỹ thuật - CNTT' },
    { id: 'econ', name: 'Kinh tế - Kinh doanh' },
    { id: 'med', name: 'Y Dược - Sức khỏe' },
    { id: 'edu', name: 'Sư phạm - Xã hội' }
  ],

  scoreRanges: [
    { id: 'all', name: 'Mọi mức điểm' },
    { id: 'under_20', name: 'Dưới 20 điểm', min: 0, max: 20 },
    { id: '20_24', name: '20 - 24 điểm', min: 20, max: 24 },
    { id: '24_27', name: '24 - 27 điểm', min: 24, max: 27 },
    { id: 'over_27', name: 'Trên 27 điểm', min: 27, max: 30 }
  ],

  // Danh sách trường đại học tiêu biểu (Dùng Monogram thay vì emoji)
  universities: [
    {
      id: 'bka',
      code: 'BKA',
      name: 'Đại học Bách Khoa Hà Nội',
      shortName: 'HUST',
      monogram: 'BK',
      gradient: 'linear-gradient(135deg, #b91c1c, #991b1b)',
      city: 'Hà Nội',
      region: 'north',
      category: 'tech',
      tuition: 30,
      tuitionRange: '28 - 65 triệu/năm',
      campuses: ['Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội'],
      description: 'Đại học kỹ thuật đa ngành hàng đầu Việt Nam, tiên phong trong đào tạo công nghệ cao, bán dẫn, vi mạch và trí tuệ nhân tạo.',
      admissionUrl: 'https://ts.hust.edu.vn',
      planHighlights: 'Chỉ tiêu 9.260 sinh viên, xét tuyển 3 phương thức: Tài năng, Đánh giá tư duy (TSA), và Điểm thi tốt nghiệp THPT.',
      rating: 4.9,
      majorsCount: 65,
      status: 'active',
      majors: [
        {
          code: 'IT1',
          name: 'Khoa học Máy tính (IT1)',
          subjectGroups: ['A00', 'A01'],
          methods: ['Điểm thi THPT', 'Đánh giá tư duy', 'Xét tuyển tài năng'],
          quota: 300,
          benchmarks: { '2022': 28.29, '2023': 29.42, '2024': 29.15, '2025': 29.20 },
          subCriteria: 'Toán >= 9.0; Ưu tiên IELTS >= 6.5',
          trend: 'up'
        },
        {
          code: 'IT2',
          name: 'Kỹ thuật Máy tính (IT2)',
          subjectGroups: ['A00', 'A01'],
          methods: ['Điểm thi THPT', 'Đánh giá tư duy'],
          quota: 250,
          benchmarks: { '2022': 27.50, '2023': 28.25, '2024': 28.10, '2025': 28.30 },
          subCriteria: 'Toán x2',
          trend: 'stable'
        },
        {
          code: 'ET-E9',
          name: 'Kỹ thuật Vi mạch & Bán dẫn',
          subjectGroups: ['A00', 'A01'],
          methods: ['Điểm thi THPT', 'Đánh giá tư duy'],
          quota: 120,
          benchmarks: { '2022': 26.80, '2023': 27.65, '2024': 28.05, '2025': 28.25 },
          subCriteria: 'Toán >= 8.5',
          trend: 'up'
        },
        {
          code: 'ME1',
          name: 'Kỹ thuật Cơ điện tử',
          subjectGroups: ['A00', 'A01'],
          methods: ['Điểm thi THPT', 'Đánh giá tư duy'],
          quota: 280,
          benchmarks: { '2022': 26.20, '2023': 26.90, '2024': 26.75, '2025': 26.85 },
          subCriteria: 'Toán >= 8.0',
          trend: 'stable'
        }
      ]
    },
    {
      id: 'nth',
      code: 'NTH',
      name: 'Trường Đại học Ngoại Thương',
      shortName: 'FTU',
      monogram: 'FTU',
      gradient: 'linear-gradient(135deg, #1e3a8a, #1e40af)',
      city: 'Hà Nội & TP.HCM',
      region: 'north',
      category: 'econ',
      tuition: 28,
      tuitionRange: '25 - 60 triệu/năm',
      campuses: ['91 Chùa Láng, Đống Đa, Hà Nội', '15 Đường D5, P.25, Bình Thạnh, TP.HCM'],
      description: 'Cơ sở đào tạo kinh tế đối ngoại, kinh doanh quốc tế và tài chính chất lượng cao hàng đầu khu vực.',
      admissionUrl: 'https://tuyensinh.ftu.edu.vn',
      planHighlights: 'Chỉ tiêu 4.100 sinh viên. Xét tuyển kết hợp chứng chỉ quốc tế, học bạ học sinh giỏi và kết quả thi THPT.',
      rating: 4.9,
      majorsCount: 42,
      status: 'active',
      majors: [
        {
          code: 'NTH01',
          name: 'Kinh tế Đối ngoại',
          subjectGroups: ['A00', 'A01', 'D01', 'D07'],
          methods: ['Điểm thi THPT', 'Xét học bạ + IELTS'],
          quota: 400,
          benchmarks: { '2022': 28.40, '2023': 28.50, '2024': 28.60, '2025': 28.65 },
          subCriteria: 'Tiếng Anh >= 8.5',
          trend: 'up'
        },
        {
          code: 'NTH02',
          name: 'Logistics & Quản lý Chuỗi cung ứng',
          subjectGroups: ['A00', 'A01', 'D01'],
          methods: ['Điểm thi THPT', 'Xét kết hợp'],
          quota: 220,
          benchmarks: { '2022': 28.10, '2023': 28.30, '2024': 28.45, '2025': 28.50 },
          subCriteria: 'Toán >= 8.6',
          trend: 'up'
        }
      ]
    },
    {
      id: 'kha',
      code: 'KHA',
      name: 'Trường Đại học Kinh Tế Quốc Dân',
      shortName: 'NEU',
      monogram: 'NEU',
      gradient: 'linear-gradient(135deg, #0369a1, #0284c7)',
      city: 'Hà Nội',
      region: 'north',
      category: 'econ',
      tuition: 24,
      tuitionRange: '20 - 45 triệu/năm',
      campuses: ['207 Giải Phóng, Đồng Tâm, Hai Bà Trưng, Hà Nội'],
      description: 'Trường trọng điểm quốc gia hàng đầu về kinh tế, tài chính và quản trị kinh doanh với cơ sở vật chất chuẩn quốc tế.',
      admissionUrl: 'https://neu.edu.vn',
      planHighlights: 'Tuyển sinh 60 mã ngành, mở rộng chương trình tiên tiến và đào tạo hoàn toàn bằng tiếng Anh.',
      rating: 4.8,
      majorsCount: 60,
      status: 'active',
      majors: [
        {
          code: 'KHA12',
          name: 'Thương mại Điện tử (E-Commerce)',
          subjectGroups: ['A00', 'A01', 'D01', 'D07'],
          methods: ['Điểm thi THPT', 'ĐGNL HSA', 'Xét học bạ'],
          quota: 220,
          benchmarks: { '2022': 28.10, '2023': 28.10, '2024': 28.25, '2025': 28.30 },
          subCriteria: 'Tiếng Anh hoặc Toán điểm cao hơn',
          trend: 'up'
        },
        {
          code: 'KHA02',
          name: 'Marketing số & Truyền thông',
          subjectGroups: ['A00', 'A01', 'D01'],
          methods: ['Điểm thi THPT', 'Xét kết hợp'],
          quota: 300,
          benchmarks: { '2022': 28.00, '2023': 28.00, '2024': 28.15, '2025': 28.20 },
          subCriteria: 'Toán >= 8.2',
          trend: 'stable'
        }
      ]
    },
    {
      id: 'qsb',
      code: 'QSB',
      name: 'Trường ĐH Bách Khoa - ĐHQG TP.HCM',
      shortName: 'HCMUT',
      monogram: 'BK-SG',
      gradient: 'linear-gradient(135deg, #0284c7, #0369a1)',
      city: 'TP. Hồ Chí Minh',
      region: 'south',
      category: 'tech',
      tuition: 32,
      tuitionRange: '30 - 70 triệu/năm',
      campuses: ['268 Lý Thường Kiệt, Q.10, TP.HCM', 'Khu Đô thị ĐHQG TP.HCM, Dĩ An, Bình Dương'],
      description: 'Trung tâm đào tạo kỹ thuật - công nghệ hàng đầu tại khu vực phía Nam với chất lượng kiểm định quốc tế ABET, AUN-QA.',
      admissionUrl: 'https://hcmut.edu.vn',
      planHighlights: 'Xét tuyển tổng hợp đa tiêu chí: ĐGNL ĐHQG-HCM, Điểm thi THPT, Hoạt động xã hội và Học bạ THPT.',
      rating: 4.8,
      majorsCount: 50,
      status: 'active',
      majors: [
        {
          code: '7480201',
          name: 'Công nghệ Thông tin',
          subjectGroups: ['A00', 'A01'],
          methods: ['Xét tuyển kết hợp', 'ĐGNL HCM', 'Điểm thi THPT'],
          quota: 350,
          benchmarks: { '2022': 27.75, '2023': 27.90, '2024': 28.00, '2025': 28.15 },
          subCriteria: 'ĐGNL >= 880 / 1200',
          trend: 'up'
        },
        {
          code: '7520216',
          name: 'Thiết kế Vi mạch (Bán dẫn)',
          subjectGroups: ['A00', 'A01'],
          methods: ['Xét tuyển kết hợp', 'ĐGNL HCM'],
          quota: 100,
          benchmarks: { '2022': 26.00, '2023': 27.10, '2024': 27.80, '2025': 28.00 },
          subCriteria: 'Toán >= 8.4',
          trend: 'up'
        }
      ]
    },
    {
      id: 'ksa',
      code: 'KSA',
      name: 'Đại học Kinh Tế TP. Hồ Chí Minh',
      shortName: 'UEH',
      monogram: 'UEH',
      gradient: 'linear-gradient(135deg, #b45309, #d97706)',
      city: 'TP. Hồ Chí Minh',
      region: 'south',
      category: 'econ',
      tuition: 30,
      tuitionRange: '28 - 55 triệu/năm',
      campuses: ['59C Nguyễn Đình Chiểu, Q.3, TP.HCM', 'Nguyễn Văn Linh, Bình Chánh, TP.HCM'],
      description: 'Đại học đa ngành và bền vững, dẫn đầu phía Nam về Kinh doanh số, Fintech và Quản trị đổi mới sáng tạo.',
      admissionUrl: 'https://tuyensinh.ueh.edu.vn',
      planHighlights: 'Chỉ tiêu 7.900, mở rộng các chương trình liên kết quốc tế và đào tạo song ngành.',
      rating: 4.8,
      majorsCount: 55,
      status: 'active',
      majors: [
        {
          code: 'UEH01',
          name: 'Quản trị Kinh doanh Quốc tế',
          subjectGroups: ['A00', 'A01', 'D01', 'D07'],
          methods: ['Điểm thi THPT', 'ĐGNL HCM', 'Học bạ THPT'],
          quota: 320,
          benchmarks: { '2022': 27.50, '2023': 27.70, '2024': 27.80, '2025': 27.90 },
          subCriteria: 'Tiếng Anh >= 8.0',
          trend: 'up'
        }
      ]
    },
    {
      id: 'yhb',
      code: 'YHB',
      name: 'Trường Đại học Y Hà Nội',
      shortName: 'HMU',
      monogram: 'HMU',
      gradient: 'linear-gradient(135deg, #059669, #047857)',
      city: 'Hà Nội',
      region: 'north',
      category: 'med',
      tuition: 35,
      tuitionRange: '27 - 55 triệu/năm',
      campuses: ['Số 1 Tôn Thất Tùng, Đống Đa, Hà Nội'],
      description: 'Cơ sở đào tạo bác sĩ và cán bộ y tế hàng đầu cả nước, lịch sử hơn 120 năm với tiêu chuẩn học thuật nghiêm ngặt nhất.',
      admissionUrl: 'https://hmu.edu.vn',
      planHighlights: 'Xét tuyển kết quả thi THPT tổ hợp B00 và xét kết hợp chứng chỉ ngoại ngữ quốc tế.',
      rating: 5.0,
      majorsCount: 16,
      status: 'active',
      majors: [
        {
          code: '7720101',
          name: 'Y khoa (Bác sĩ đa khoa)',
          subjectGroups: ['B00'],
          methods: ['Điểm thi THPT', 'Xét kết hợp Tiếng Anh/Pháp'],
          quota: 400,
          benchmarks: { '2022': 28.15, '2023': 27.73, '2024': 28.25, '2025': 28.30 },
          subCriteria: 'Sinh học >= 8.75',
          trend: 'up'
        }
      ]
    },
    {
      id: 'ddk',
      code: 'DDK',
      name: 'Trường ĐH Bách Khoa - ĐH Đà Nẵng',
      shortName: 'DUT',
      monogram: 'DUT',
      gradient: 'linear-gradient(135deg, #0891b2, #0e7490)',
      city: 'Đà Nẵng',
      region: 'central',
      category: 'tech',
      tuition: 22,
      tuitionRange: '20 - 38 triệu/năm',
      campuses: ['54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng'],
      description: 'Trung tâm đào tạo kỹ sư công nghệ lớn nhất miền Trung - Tây Nguyên, đối tác chiến lược của các tập đoàn bán dẫn.',
      admissionUrl: 'https://dut.udn.vn',
      planHighlights: 'Xét học bạ, ĐGNL ĐHQG-HCM, Đánh giá tư duy Bách Khoa và Điểm thi tốt nghiệp THPT.',
      rating: 4.7,
      majorsCount: 38,
      status: 'active',
      majors: [
        {
          code: 'DDK01',
          name: 'Công nghệ Thông tin (Đặc thù)',
          subjectGroups: ['A00', 'A01'],
          methods: ['Điểm thi THPT', 'Học bạ', 'ĐGNL'],
          quota: 260,
          benchmarks: { '2022': 26.65, '2023': 26.45, '2024': 26.80, '2025': 26.90 },
          subCriteria: 'Toán >= 8.0',
          trend: 'up'
        }
      ]
    },
    {
      id: 'sph',
      code: 'SPH',
      name: 'Trường Đại học Sư Phạm Hà Nội',
      shortName: 'HNUE',
      monogram: 'HNUE',
      gradient: 'linear-gradient(135deg, #4f46e5, #4338ca)',
      city: 'Hà Nội',
      region: 'north',
      category: 'edu',
      tuition: 0,
      tuitionRange: 'Miễn 100% học phí + trợ cấp sinh hoạt',
      campuses: ['136 Xuân Thủy, Cầu Giấy, Hà Nội'],
      description: 'Trường đại học trọng điểm quốc gia về đào tạo giáo viên và nghiên cứu khoa học cơ bản, miễn hoàn toàn học phí theo NĐ 116.',
      admissionUrl: 'https://tuyensinh.hnue.edu.vn',
      planHighlights: 'Tổ chức kỳ thi đánh giá năng lực độc lập (HSPT) cùng xét điểm thi tốt nghiệp THPT.',
      rating: 4.8,
      majorsCount: 45,
      status: 'active',
      majors: [
        {
          code: '7140209',
          name: 'Sư phạm Toán học',
          subjectGroups: ['A00'],
          methods: ['Điểm thi THPT', 'Kỳ thi ĐGNL Sư Phạm'],
          quota: 180,
          benchmarks: { '2022': 27.70, '2023': 27.83, '2024': 28.00, '2025': 28.10 },
          subCriteria: 'Toán >= 9.0',
          trend: 'up'
        }
      ]
    }
  ],

  // Danh mục ngành đào tạo tổng hợp
  majorCatalog: [
    {
      id: 'cntt',
      name: 'Công nghệ Thông tin / Khoa học Máy tính',
      code: '7480201',
      field: 'tech',
      description: 'Đào tạo kỹ sư phần mềm, kiến trúc hệ thống, điện toán đám mây và an ninh mạng.',
      avgSalary: '15 - 35 triệu/tháng',
      jobDemand: 'Rất cao (98% có việc sau tốt nghiệp)',
      schools: [
        { schoolCode: 'BKA', schoolName: 'ĐH Bách Khoa Hà Nội', benchmark2024: 29.15, groups: 'A00, A01', tuition: '30 tr/năm' },
        { schoolCode: 'QSB', schoolName: 'ĐH Bách Khoa ĐHQG TP.HCM', benchmark2024: 28.00, groups: 'A00, A01', tuition: '32 tr/năm' },
        { schoolCode: 'DDK', schoolName: 'ĐH Bách Khoa Đà Nẵng', benchmark2024: 26.80, groups: 'A00, A01', tuition: '22 tr/năm' }
      ]
    },
    {
      id: 'ban_dan',
      name: 'Kỹ thuật Vi mạch & Bán dẫn',
      code: '7520216',
      field: 'tech',
      description: 'Lĩnh vực chiến lược quốc gia về thiết kế vi mạch tích hợp, đóng gói kiểm thử chip và vật liệu bán dẫn.',
      avgSalary: '20 - 45 triệu/tháng',
      jobDemand: 'Chiến lược quốc gia (Dự kiến thiếu 50.000 kỹ sư)',
      schools: [
        { schoolCode: 'BKA', schoolName: 'ĐH Bách Khoa Hà Nội', benchmark2024: 28.05, groups: 'A00, A01', tuition: '30 tr/năm' },
        { schoolCode: 'QSB', schoolName: 'ĐH Bách Khoa ĐHQG TP.HCM', benchmark2024: 27.80, groups: 'A00, A01', tuition: '32 tr/năm' }
      ]
    },
    {
      id: 'logistics',
      name: 'Logistics & Quản lý Chuỗi cung ứng',
      code: '7510605',
      field: 'econ',
      description: 'Quản trị chuỗi cung ứng toàn cầu, vận tải đa phương thức và trung tâm logistics thông minh.',
      avgSalary: '14 - 30 triệu/tháng',
      jobDemand: 'Tăng trưởng ổn định (15%/năm)',
      schools: [
        { schoolCode: 'NTH', schoolName: 'Đại học Ngoại Thương', benchmark2024: 28.45, groups: 'A00, A01, D01', tuition: '28 tr/năm' },
        { schoolCode: 'KSA', schoolName: 'ĐH Kinh Tế TP.HCM (UEH)', benchmark2024: 27.80, groups: 'A00, A01, D01', tuition: '30 tr/năm' }
      ]
    }
  ],

  // Bảng tin nổi bật
  articles: [
    {
      id: 'art1',
      title: 'Bộ GD&ĐT ban hành quy chế tuyển sinh đại học chính thức năm 2026',
      category: 'Thông tư - Quy chế',
      date: '15/03/2026',
      author: 'Vụ Giáo dục Đại học',
      status: 'published',
      summary: 'Quy chuẩn rút ngắn thời gian lọc ảo toàn quốc, bảo đảm quyền tự chủ tuyển sinh cho các cơ sở giáo dục đại học.',
      badge: 'Chính thức',
      readTime: '4 phút',
      officialDoc: 'Thông tư số 04/2026/TT-BGDĐT',
      fullContent: `
        <p class="lead-text">Ngày 15/03/2026, Bộ Giáo dục và Đào tạo đã chính thức ban hành Thông tư số 04/2026/TT-BGDĐT sửa đổi, bổ sung một số điều của Quy chế tuyển sinh đại học, tuyển sinh cao đẳng ngành Giáo dục Mầm non.</p>
        
        <h3>1. Điểm mới cốt lõi về thời gian lọc ảo</h3>
        <p>Quy chế năm nay tập trung vào việc số hóa 100% các khâu đăng ký và xử lý nguyện vọng. Thời gian lọc ảo toàn quốc được rút ngắn từ 10 ngày xuống còn 6 ngày làm việc nhờ ứng dụng thuật toán phân bổ tải phân tán trên nền tảng điện toán đám mây quốc gia.</p>
        
        <div class="content-callout-box">
          <div class="callout-title">Quy định bắt buộc đối với thí sinh:</div>
          <p>Tất cả thí sinh tham gia xét tuyển sớm (học bạ, đánh giá năng lực, chứng chỉ quốc tế) khi đã có thông báo trúng tuyển có điều kiện <strong>bắt buộc phải đăng ký nguyện vọng đó lên Cổng thông tin của Bộ</strong> trong đợt đăng ký chung từ 18/07 đến 30/07/2026. Nếu không đăng ký, kết quả trúng tuyển sớm sẽ bị hủy bỏ.</p>
        </div>

        <h3>2. Cơ chế bảo lưu và chuyển đổi điểm tương đương</h3>
        <p>Các chứng chỉ ngoại ngữ quốc tế (IELTS, TOEFL, VSTEP) được quy đổi theo khung chuẩn thống nhất giữa các trường công lập. Không cho phép các cơ sở đào tạo tự ý hạ chuẩn ngưỡng đầu vào đối với nhóm ngành Sức khỏe và Sư phạm.</p>

        <h3>3. Lời khuyên từ Ban soạn thảo</h3>
        <p>Thí sinh cần kiểm tra kỹ thông tin nhân thân, mã trường, mã tổ hợp và mã phương thức trước khi bấm nút "Xác nhận và Thanh toán lệ phí". Hệ thống sẽ gửi mã OTP xác thực qua số điện thoại chính chủ đã đăng ký thi tốt nghiệp THPT.</p>
      `
    },
    {
      id: 'art2',
      title: 'Phân tích nhu cầu nhân lực ngành Thiết kế Vi mạch & Trí tuệ nhân tạo',
      category: 'Dự báo nhân lực',
      date: '12/03/2026',
      author: 'Trung tâm Dự báo Nhân lực Quốc gia',
      status: 'published',
      summary: 'Báo cáo toàn cảnh mức thu nhập khởi điểm và lộ trình thăng tiến cho kỹ sư công nghệ cao giai đoạn 2026 - 2030.',
      badge: 'Báo cáo',
      readTime: '6 phút',
      officialDoc: 'Báo cáo khảo sát số 18/BC-TTDB',
      fullContent: `
        <p class="lead-text">Theo đề án phát triển nguồn nhân lực ngành công nghiệp bán dẫn đến năm 2030, định hướng đến năm 2050 của Chính phủ, Việt Nam đặt mục tiêu đào tạo ít nhất 50.000 kỹ sư phục vụ chuỗi cung ứng vi mạch bán dẫn và công nghệ cao.</p>

        <h3>1. Nhu cầu tuyển dụng thực tế từ doanh nghiệp FDI</h3>
        <p>Các tập đoàn công nghệ hàng đầu như Synopsys, Marvell, Cadence, Intel và Amkor đang đẩy mạnh đầu tư các trung tâm R&D tại Hà Nội, TP.HCM và Đà Nẵng. Mức lương khởi điểm cho sinh viên mới tốt nghiệp ngành Vi mạch đạt từ <strong>18 - 25 triệu VNĐ/tháng</strong>, và tăng lên trên 45 triệu sau 3-4 năm kinh nghiệm.</p>

        <div class="content-callout-box">
          <div class="callout-title">Khung kỹ năng cốt lõi được săn đón:</div>
          <ul>
            <li>Kiến thức nền tảng vững chắc về Logic Design, RTL Coding (Verilog/SystemVerilog), FPGA synthesis.</li>
            <li>Kỹ năng kiểm thử xác minh (Functional Verification with UVM).</li>
            <li>Năng lực sử dụng tiếng Anh kỹ thuật chuyên ngành lưu loát (tương đương TOEIC 700+ hoặc IELTS 6.0+).</li>
          </ul>
        </div>

        <h3>2. Top trường đào tạo trọng điểm</h3>
        <p>Các trường đại học đi đầu gồm: Đại học Bách Khoa Hà Nội, ĐH Bách Khoa - ĐHQG TP.HCM, ĐH Công Nghệ - ĐHQGHN, và Trường ĐH Công Nghệ Thông Tin ĐHQG-HCM. Hầu hết các đơn vị đều liên kết tài trợ phòng lab thực hành tiêu chuẩn từ các hãng thiết kế chip quốc tế.</p>
      `
    },
    {
      id: 'art3',
      title: 'Chiến thuật phân bổ nguyện vọng 3 tầng: Tối ưu xác suất trúng tuyển',
      category: 'Tư vấn hướng nghiệp',
      date: '08/03/2026',
      author: 'Ban Tư vấn Tuyển sinh',
      status: 'published',
      summary: 'Mô hình phân bổ nguyện vọng theo 3 vùng điểm: An toàn, Vừa sức và Thử thách giúp thí sinh nắm chắc cơ hội.',
      badge: 'Cẩm nang',
      readTime: '5 phút',
      officialDoc: 'Tài liệu hướng dẫn thí sinh 2026',
      fullContent: `
        <p class="lead-text">Trong cơ chế lọc ảo thông minh của Bộ GD&ĐT, thí sinh được đăng ký không giới hạn số lượng nguyện vọng và hệ thống sẽ tự động xét tuyển từ nguyện vọng 1 xuống đến nguyện vọng cuối cùng. Khi đã trúng tuyển ở một nguyện vọng, tất cả các nguyện vọng xếp sau sẽ tự động bị loại.</p>

        <h3>1. Mô hình Kim Tự Tháp 3 Tầng Nguyện Vọng</h3>
        <p>Chiến thuật được các chuyên gia khuyến nghị phân chia danh sách nguyện vọng theo tỷ lệ vàng <strong>20% - 50% - 30%</strong>:</p>

        <div class="content-callout-box">
          <div class="callout-title">3 Tầng phân bổ thông minh:</div>
          <p><strong>Tầng 1 (Thử thách - 20%):</strong> Đặt các ngành/trường mà bạn cực kỳ yêu thích, có điểm chuẩn năm ngoái cao hơn điểm thi của bạn từ 0.5 đến 1.5 điểm. Xếp ở vị trí NV1, NV2.</p>
          <p><strong>Tầng 2 (Vừa sức - 50%):</strong> Các ngành có điểm chuẩn năm ngoái bằng hoặc chênh lệch trong khoảng ±0.5 điểm so với điểm thi. Đây là nhóm có khả năng trúng tuyển cao nhất. Xếp ở NV3 đến NV6.</p>
          <p><strong>Tầng 3 (An toàn tuyệt đối - 30%):</strong> Các ngành có điểm chuẩn năm ngoái thấp hơn điểm thi từ 1.5 đến 3 điểm để làm lưới an toàn, tránh nguy cơ trượt đại học đáng tiếc. Xếp ở các NV cuối.</p>
        </div>

        <h3>2. Những sai lầm kinh điển cần tránh</h3>
        <p>Không nên chỉ đăng ký 1-2 nguyện vọng vì quá tự tin. Đồng thời, không đặt nguyện vọng mà bản thân không sẵn sàng theo học chỉ để "cho vui", vì một khi đã trúng tuyển, bạn không thể xin hủy để xét các nguyện vọng thấp hơn.</p>
      `
    }
  ],

  // Danh mục học bổng
  scholarships: [
    {
      id: 'sch1',
      title: 'Quỹ Học bổng Tài năng Trẻ TechGenius Toàn phần',
      sponsor: 'Tập đoàn Công nghệ Bán dẫn Quốc tế',
      amount: '100% học phí + Trợ cấp sinh hoạt (250 triệu)',
      quota: '50 suất toàn quốc',
      deadline: '15/05/2026',
      target: 'Thí sinh đạt giải Nhất/Nhì QG hoặc điểm thi THPT >= 28.5 khối A00/A01',
      status: 'Đang mở đơn',
      category: 'Toàn phần',
      benefits: [
        'Tài trợ 100% học phí toàn bộ 4.5 năm học đại học.',
        'Trợ cấp sinh hoạt phí 5,000,000 VNĐ/tháng.',
        'Cấp laptop chuyên dụng phục vụ lập trình & mô phỏng vi mạch.',
        'Cơ hội thực tập có lương và cam kết việc làm sau khi tốt nghiệp.'
      ],
      requirements: [
        'Học sinh lớp 12 tốt nghiệp THPT loại Giỏi.',
        'Đạt giải Nhất/Nhì trong kỳ thi HSG Quốc gia môn Toán, Lý, Tin hoặc điểm thi THPT >= 28.5.',
        'Trình độ tiếng Anh tối thiểu IELTS 6.5 hoặc tương đương.',
        'Vượt qua vòng phỏng vấn chuyên môn với hội đồng chuyên gia tập đoàn.'
      ],
      dossier: [
        'Đơn đăng ký học bổng theo mẫu trực tuyến.',
        'Bản sao công chứng học bạ 3 năm THPT.',
        'Bản sao chứng nhận giải thưởng và chứng chỉ ngoại ngữ quốc tế.',
        'Bài luận cá nhân (Personal Statement) dài 800 từ chia sẻ về định hướng công nghệ.'
      ]
    },
    {
      id: 'sch2',
      title: 'Chương trình Học bổng Doanh nhân Tương lai FTU',
      sponsor: 'Quỹ Phát triển Tài năng Trẻ Quốc gia',
      amount: '50% - 100% học phí toàn khóa (120 triệu)',
      quota: '100 suất',
      deadline: '20/05/2026',
      target: 'Tân sinh viên khối ngành Kinh tế, IELTS >= 7.5 và có bài luận xuất sắc',
      status: 'Đang mở đơn',
      category: 'Doanh nghiệp',
      benefits: [
        'Hỗ trợ 50% đến 100% học phí các chương trình tiên tiến / chất lượng cao.',
        'Được cố vấn 1-1 bởi các CEO và chuyên gia tài chính hàng đầu.',
        'Tài trợ vé tham dự các hội nghị thương mại quốc tế tại Singapore/Hàn Quốc.'
      ],
      requirements: [
        'Trúng tuyển vào các ngành Kinh tế đối ngoại, Tài chính, Logistics.',
        'Chứng chỉ tiếng Anh IELTS >= 7.5 hoặc TOEFL iBT >= 100.',
        'Có thành tích nổi bật trong hoạt động ngoại khóa, khởi nghiệp hoặc dự án xã hội.'
      ],
      dossier: [
        'Hồ sơ đăng ký xét tuyển học bổng trực tuyến.',
        'Video clip 3 phút giới thiệu bản thân và ý tưởng kinh doanh/dự án cộng đồng.',
        'Thư giới thiệu từ Ban giám hiệu hoặc giáo viên chủ nhiệm THPT.'
      ]
    },
    {
      id: 'sch3',
      title: 'Học bổng Vươn cao Ước mơ Bác sĩ Đa khoa',
      sponsor: 'Quỹ Hỗ trợ Y tế & Sức khỏe Cộng đồng',
      amount: 'Toàn bộ học phí 6 năm đào tạo (300 triệu)',
      quota: '30 suất',
      deadline: '30/06/2026',
      target: 'Tân sinh viên ngành Y khoa có hoàn cảnh khó khăn đạt điểm chuẩn chính thức',
      status: 'Chuẩn bị mở',
      category: 'Tài trợ',
      benefits: [
        'Hỗ trợ toàn bộ 100% học phí trong suốt 6 năm học y khoa.',
        'Hỗ trợ mua giáo trình y khoa, trang thiết bị thực hành và áo blouse.',
        'Được ưu tiên tham gia các chương trình trao đổi lâm sàng tại bệnh viện trung ương.'
      ],
      requirements: [
        'Trúng tuyển vào ngành Y khoa (Bác sĩ đa khoa) của các trường ĐH Y trọng điểm.',
        'Gia đình thuộc hộ nghèo, cận nghèo hoặc có hoàn cảnh đặc biệt khó khăn.',
        'Điểm thi tốt nghiệp THPT khối B00 đạt từ 27.5 điểm trở lên.'
      ],
      dossier: [
        'Giấy chứng nhận hộ nghèo/cận nghèo hoặc xác nhận hoàn cảnh khó khăn từ UBND xã/phường.',
        'Giấy báo trúng tuyển đại học ngành Y khoa.',
        'Đơn xin cấp học bổng có xác nhận của gia đình.'
      ]
    }
  ],

  // Lịch trình mùa tuyển sinh
  timelineEvents: [
    {
      id: 'time1',
      month: 'Tháng 03 - 04/2026',
      title: 'Công bố Đề án Tuyển sinh & Mở cổng thi ĐGNL',
      details: 'Các trường đại học công bố chỉ tiêu, phương thức tuyển sinh. Tổ chức các đợt thi ĐGNL, ĐGTD.',
      status: 'done',
      authority: 'Bộ GD&ĐT và Các Đại học tự chủ',
      procedures: [
        'Tra cứu đề án tuyển sinh chi tiết của từng trường đại học mục tiêu.',
        'Đăng ký tài khoản và dự thi các kỳ thi ĐGNL (ĐHQGHN, ĐHQG-HCM, Bách Khoa, Sư phạm).',
        'Thu thập phiếu điểm chứng nhận kết quả bài thi đánh giá năng lực.'
      ],
      mandatoryDocs: [
        'Căn cước công dân gắn chip bản gốc.',
        'Tài khoản định danh điện tử VNeID mức 2.',
        'Ảnh thẻ 4x6 chuẩn quốc tế chụp trong 6 tháng gần nhất.'
      ],
      note: 'Thí sinh cần lưu ý số đợt thi tối đa được phép đăng ký để phân bổ thời gian ôn tập hợp lý.'
    },
    {
      id: 'time2',
      month: 'Tháng 05 - 06/2026',
      title: 'Nộp hồ sơ Xét tuyển sớm (Học bạ, Chứng chỉ quốc tế)',
      details: 'Thí sinh thực hiện đăng ký và nộp minh chứng trực tuyến theo đề án của từng cơ sở đào tạo.',
      status: 'active',
      authority: 'Các Trường Đại học',
      procedures: [
        'Đăng ký trực tuyến trên cổng tuyển sinh riêng của từng trường đại học.',
        'Tải lên bản scan học bạ 5-6 học kỳ THPT và chứng chỉ ngoại ngữ (IELTS/VSTEP/SAT).',
        'Theo dõi danh sách trúng tuyển sớm có điều kiện được các trường công bố.'
      ],
      mandatoryDocs: [
        'Bản sao công chứng học bạ THPT có đầy đủ xác nhận của nhà trường.',
        'Bản sao chứng chỉ ngoại ngữ quốc tế (còn hạn sử dụng tính đến ngày nộp).',
        'Giấy chứng nhận ưu tiên đối tượng hoặc khu vực (nếu có).'
      ],
      note: 'Trúng tuyển sớm chỉ là trúng tuyển CÓ ĐIỀU KIỆN; thí sinh bắt buộc phải đỗ tốt nghiệp THPT và đăng ký lên cổng của Bộ.'
    },
    {
      id: 'time3',
      month: '26 - 28/06/2026',
      title: 'Kỳ thi Tốt nghiệp THPT 2026',
      details: 'Kỳ thi chính thức toàn quốc với các bài thi môn độc lập và tổ hợp môn tự chọn.',
      status: 'upcoming',
      authority: 'Bộ Giáo dục và Đào tạo',
      procedures: [
        'Nhận giấy báo dự thi tại trường THPT hoặc điểm tiếp nhận hồ sơ.',
        'Làm thủ tục dự thi, đính chính sai sót (nếu có) vào chiều ngày 25/06/2026.',
        'Dự thi các môn: Ngữ văn, Toán (26/06) và Bài thi KHTN/KHXH, Ngoại ngữ (27/06).'
      ],
      mandatoryDocs: [
        'Thẻ căn cước công dân và Giấy báo dự thi tốt nghiệp THPT.',
        'Dụng cụ học tập được phép mang vào phòng thi theo quy chế (bút chì, thước kẻ, máy tính cầm tay theo danh mục cho phép).'
      ],
      note: 'Tuyệt đối không mang điện thoại, đồng hồ thông minh hoặc thiết bị truyền phát sóng vào phòng thi.'
    },
    {
      id: 'time4',
      month: '17/07/2026',
      title: 'Công bố Điểm thi Tốt nghiệp THPT',
      details: 'Bộ GD&ĐT công bố dữ liệu điểm thi và phổ điểm toàn quốc trên cổng tra cứu.',
      status: 'upcoming',
      authority: 'Bộ Giáo dục và Đào tạo',
      procedures: [
        'Truy cập cổng thông tin quản lý thi của Bộ hoặc cổng của các Sở GD&ĐT để tra cứu điểm.',
        'Nộp đơn xin phúc khảo bài thi (nếu có nguyện vọng) trong vòng 10 ngày kể từ ngày công bố điểm.',
        'Nhận Giấy chứng nhận kết quả thi tạm thời tại trường THPT.'
      ],
      mandatoryDocs: [
        'Mã số thí sinh và mã đăng nhập đã được cấp khi đăng ký thi.'
      ],
      note: 'Dữ liệu phổ điểm là căn cứ quan trọng nhất để dự đoán xu hướng biến động điểm chuẩn.'
    },
    {
      id: 'time5',
      month: '18/07 - 30/07/2026',
      title: 'Đăng ký & Điều chỉnh Nguyện vọng trực tuyến',
      details: 'Thời gian chính thức thí sinh đăng ký, điều chỉnh và nộp lệ phí xét tuyển trên hệ thống của Bộ.',
      status: 'upcoming',
      authority: 'Bộ GD&ĐT và Cổng Dịch vụ công Quốc gia',
      procedures: [
        'Đăng nhập Cổng tuyển sinh của Bộ: https://thisinh.thitotnghiepthpt.edu.vn',
        'Thêm, sửa đổi hoặc sắp xếp thứ tự ưu tiên của các nguyện vọng xét tuyển.',
        'Thực hiện thanh toán lệ phí xét tuyển trực tuyến qua cổng thanh toán tích hợp.'
      ],
      mandatoryDocs: [
        'Mã OTP gửi về số điện thoại đã xác thực.',
        'Tài khoản thanh toán trực tuyến (ngân hàng hoặc ví điện tử).'
      ],
      note: 'Hệ thống đóng cổng tự động lúc 17h00 ngày 30/07/2026. Thí sinh tuyệt đối không chờ đến giờ chót mới nộp.'
    },
    {
      id: 'time6',
      month: '10/08 - 20/08/2026',
      title: 'Xử lý Nguyện vọng & Công bố Điểm chuẩn Đợt 1',
      details: 'Quy trình lọc ảo toàn quốc kết thúc. Các trường đồng loạt công bố điểm chuẩn và danh sách trúng tuyển.',
      status: 'upcoming',
      authority: 'Bộ GD&ĐT và Hội đồng Tuyển sinh các Trường',
      procedures: [
        'Hệ thống thực hiện 6 vòng lọc ảo toàn quốc kết hợp giữa các cơ sở đào tạo.',
        'Các trường công bố điểm chuẩn chính thức và danh sách thí sinh trúng tuyển.',
        'Thí sinh thực hiện "Xác nhận nhập học trực tuyến" trên hệ thống của Bộ trước hạn quy định.'
      ],
      mandatoryDocs: [
        'Bản chính Giấy chứng nhận kết quả thi THPT (mã vạch).',
        'Hồ sơ nhập học theo hướng dẫn riêng của từng trường trúng tuyển.'
      ],
      note: 'Nếu không xác nhận nhập học trực tuyến đúng hạn, thí sinh bị coi như từ chối nhập học.'
    }
  ]
};

if (typeof window !== 'undefined') {
  window.MOCK_DATA = MOCK_DATA;
}
