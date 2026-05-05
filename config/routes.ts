export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
    ],
  },

  ///////////////////////////////////
  // DEFAULT MENU
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: './TrangChu',
    icon: 'HomeOutlined',
  },
  {
    path: '/home',
    name: 'Home',
    component: './Home/home',
    icon: 'HomeOutlined',
  },
  {
    path: '/gioi-thieu',
    name: 'About',
    component: './TienIch/GioiThieu',
    hideInMenu: true,
  },
  {
    path: '/random-user',
    name: 'RandomUser',
    component: './RandomUser',
    icon: 'ArrowsAltOutlined',
  },
  {
    path: '/todo-list',
    name: 'TodoList',
    icon: 'OrderedListOutlined',
    component: './TodoList',
  },
  {
    path: '/quan-ly-san-pham',
    name: 'Quản lý sản phẩm',
    icon: 'ShoppingOutlined',
    component: './QuanLySanPham',
  },
  {
    path: '/quan-ly-don-hang',
    name: 'Quản lý đơn hàng',
    icon: 'ShoppingCartOutlined',
    component: './QuanLyDonHang/quanlydonhang',
  },
  {
    path: '/game-doan-so',
    name: 'Guess Game',
    icon: 'TrophyOutlined',
    component: './GameDoanSo',
  },
  {
    path: '/hoctap',
    name: 'Quản lý học tập',
    icon: 'BookOutlined',
    component: './QuanLyHocTap',
  },
  {
    path: '/game',
    name: 'Oẳn Tù Tì',
    icon: 'smile',
    component: './GameOanTuTi',
  },
  {
    path: '/ngan-hang-cau-hoi',
    name: 'Ngân hàng câu hỏi',
    icon: 'BookOutlined',
    component: './NganHangCauHoi',
  },

  // ================= TH03 =================
  {
    path: '/th03',
    name: 'Quản lý lịch hẹn',
    icon: 'AppstoreOutlined',
    routes: [
      {
        path: '/th03/dashboard',
        name: 'Dashboard',
        icon: 'DashboardOutlined',
        component: './TH03/dashboard',
      },
      {
        path: '/th03/appointments',
        name: 'Lịch hẹn',
        icon: 'CalendarOutlined',
        component: './TH03/appointments',
      },
      {
        path: '/th03/employees',
        name: 'Nhân viên',
        icon: 'UserOutlined',
        component: './TH03/employees',
      },
      {
        path: '/th03/services',
        name: 'Dịch vụ',
        icon: 'AppstoreOutlined',
        component: './TH03/services',
      },
      {
        path: '/th03/reviews',
        name: 'Đánh giá',
        icon: 'StarOutlined',
        component: './TH03/reviews',
      },
    ],
  },

  // ================= TH04 =================
  {
    path: '/th04',
    name: 'Quản lý văn bằng',
    icon: 'book',
    routes: [
      {
        path: '/th04/so-van-bang',
        name: 'Sổ văn bằng',
        component: './TH04/SoVanBang',
      },
      {
        path: '/th04/quyet-dinh',
        name: 'Quyết định tốt nghiệp',
        component: './TH04/QuyetDinh',
      },
      {
        path: '/th04/cau-hinh-phu-luc',
        name: 'Cấu hình phụ lục',
        component: './TH04/CauHinhPhuLuc',
      },
      {
        path: '/th04/thong-tin-van-bang',
        name: 'Thông tin văn bằng',
        component: './TH04/ThongTinVanBang',
      },
      {
        path: '/th04/tra-cuu',
        name: 'Tra cứu văn bằng',
        component: './TH04/TraCuu',
      },
    ],
  },

  // ================= TH05 =================
  {
    path: '/th05',
    name: 'Quản lý CLB',
    icon: 'TeamOutlined',
    routes: [
      {
        path: '/th05/dashboard',
        name: 'Dashboard',
        icon: 'DashboardOutlined',
        component: './TH05/DashBoard',
      },
      {
        path: '/th05/clb',
        name: 'Quản lý CLB',
        icon: 'AppstoreOutlined',
        component: './TH05/QuanLyCLB',
      },
      {
        path: '/th05/don-dang-ky',
        name: 'Đơn đăng ký',
        icon: 'FormOutlined',
        component: './TH05/DonDangKy',
      },
      {
        path: '/th05/thanh-vien',
        name: 'Thành viên',
        icon: 'UserOutlined',
        component: './TH05/ThanhVien',
      },
    ],
  },

  // ================= TH06 =================
  {
    path: '/th06',
    name: 'Kế Hoạch Du Lịch',
    icon: 'global',
    routes: [
      {
        path: '/th06',
        redirect: '/th06/trang-chu',
      },
      {
        path: '/th06/trang-chu',
        name: 'Trang Chủ',
        component: './TH06/TrangChu',
      },
      {
        path: '/th06/lich-trinh',
        name: 'Lịch Trình',
        component: './TH06/LichTrinh',
      },
      {
        path: '/th06/ngan-sach',
        name: 'Ngân Sách',
        component: './TH06/NganSach',
      },
      {
        path: '/th06/admin',
        name: 'Quản Trị',
        component: './TH06/Admin',
      },
    ],
  },
  {
    path: '/quan-ly-khoa-hoc',
    name: 'Quản lý khóa học',
    icon: 'ReadOutlined',
    component: './KTGK/QuanLyKhoaHoc',
  },

  // ================= TH07 =================
  {
    path: '/th07',
    name: 'Blog cá nhân',
    icon: 'ReadOutlined',
    routes: [
      {
        path: '/th07',
        redirect: '/th07/trang-chu',
      },
      {
        path: '/th07/trang-chu',
        name: 'Trang chủ',
        component: './TH07/trang/TrangChu',
      },
      {
        path: '/th07/bai-viet/:slug',
        name: 'Chi tiết bài viết',
        component: './TH07/trang/ChiTietBaiViet',
        hideInMenu: true,
      },
      {
        path: '/th07/gioi-thieu',
        name: 'Giới thiệu',
        component: './TH07/trang/GioiThieu',
      },
      {
        path: '/th07/quan-ly-bai-viet',
        name: 'Quản lý bài viết',
        component: './TH07/trang/QuanLyBaiViet',
      },
      {
        path: '/th07/quan-ly-the',
        name: 'Quản lý thẻ',
        component: './TH07/trang/QuanLyThe',
      },
    ],
  },
{
    path: '/th08',
    name: 'Ứng dụng sức khỏe',
    icon: 'HeartOutlined',
    routes: [
      {
        path: '/th08',
        redirect: '/th08/trang-chu',
      },
      {
        path: '/th08/trang-chu',
        name: 'Trang chủ',
        component: './TH08/TrangChu',
      },
      {
        path: '/th08/nhat-ky-tap-luyen',
        name: 'Nhật ký tập luyện',
        component: './TH08/NhatKyTapLuyen',
      },
      {
        path: '/th08/chi-so-suc-khoe',
        name: 'Chỉ số sức khỏe',
        component: './TH08/ChiSoSucKhoe',
      },
      {
        path: '/th08/muc-tieu',
        name: 'Mục tiêu',
        component: './TH08/MucTieu',
      },
      {
        path: '/th08/thu-vien-bai-tap',
        name: 'Thư viện bài tập',
        component: './TH08/ThuVienBaiTap',
      },
    ],
  },

  {
    path: '/th09',
    name: 'Quản lý công việc',
    icon: 'ProjectOutlined',
    routes: [
      {
        path: '/th09',
        redirect: '/th09/dashboard',
      },
      {
        path: '/th09/dashboard',
        name: 'Dashboard',
        component: './TH09/Dashboard',
      },
      {
        path: '/th09/kanban-board',
        name: 'Kanban Board',
        component: './TH09/Kanban',
      },
      {
        path: '/th09/danh-sach-task',
        name: 'Danh sách task',
        component: './TH09/TaskList',
      },
    ],
  },


  // ================= KHÁC =================
  {
    path: '/notification',
    routes: [
      {
        path: './subscribe',
        exact: true,
        component: './ThongBao/Subscribe',
      },
      {
        path: './check',
        exact: true,
        component: './ThongBao/Check',
      },
      {
        path: './',
        exact: true,
        component: './ThongBao/NotifOneSignal',
      },
    ],
    layout: false,
    hideInMenu: true,
  },
  {
    path: '/',
  },
  {
    path: '/403',
    component: './exception/403/403Page',
    layout: false,
  },
  {
    path: '/hold-on',
    component: './exception/DangCapNhat',
    layout: false,
  },
  {
    component: './exception/404',
  },
];