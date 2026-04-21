import { duLieuBaiVietMau, duLieuTheMau } from '../du_lieu/du_lieu_mau';
import {
  layDanhSachBaiViet,
  layDanhSachThe,
  luuDanhSachBaiViet,
  luuDanhSachThe,
} from './luu_tru';

export const khoiTaoDuLieuBlog = () => {
  const danhSachBaiViet = layDanhSachBaiViet();
  const danhSachThe = layDanhSachThe();

  if (!danhSachBaiViet.length) {
    luuDanhSachBaiViet(duLieuBaiVietMau);
  }

  if (!danhSachThe.length) {
    luuDanhSachThe(duLieuTheMau);
  }
};

export const taoId = (tienTo = 'id') => `${tienTo}_${Date.now()}`;

export const taoSlug = (chuoi = '') =>
  chuoi
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const demSoBaiVietTheoThe = (danhSachBaiViet = [], tenThe) =>
  danhSachBaiViet.filter((baiViet) => baiViet.tags?.includes(tenThe)).length;

export const layBaiVietDaDang = (danhSachBaiViet = []) =>
  danhSachBaiViet.filter((baiViet) => baiViet.status === 'published');

export const formatNgay = (ngay) => {
  if (!ngay) return '-';
  return new Date(ngay).toLocaleDateString('vi-VN');
};

export const kiemTraSlugTrung = (danhSachBaiViet, slug, idDangSua = null) => {
  return danhSachBaiViet.some((baiViet) => {
    if (idDangSua && baiViet.id === idDangSua) return false;
    return baiViet.slug === slug;
  });
};