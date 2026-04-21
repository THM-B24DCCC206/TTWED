const KHOA_BAI_VIET = 'blog_bai_viet';
const KHOA_THE = 'blog_the';

export const layDanhSachBaiViet = () => {
  const duLieu = localStorage.getItem(KHOA_BAI_VIET);
  return duLieu ? JSON.parse(duLieu) : [];
};

export const luuDanhSachBaiViet = (danhSach) => {
  localStorage.setItem(KHOA_BAI_VIET, JSON.stringify(danhSach));
};

export const layDanhSachThe = () => {
  const duLieu = localStorage.getItem(KHOA_THE);
  return duLieu ? JSON.parse(duLieu) : [];
};

export const luuDanhSachThe = (danhSach) => {
  localStorage.setItem(KHOA_THE, JSON.stringify(danhSach));
};