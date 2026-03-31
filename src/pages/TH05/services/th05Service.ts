export interface CLB {
  id: number;
  ten: string;
  ngayThanhLap: string;
  moTa: string;
  chuNhiem: string;
  hoatDong: boolean;
  avatar?: string;
}

export interface DonDangKy {
  id: number;
  hoTen: string;
  email: string;
  sdt: string;
  gioiTinh: string;
  diaChi: string;
  soTruong: string;
  clb: string;
  lyDo: string;
  trangThai: 'Pending' | 'Approved' | 'Rejected';
  ghiChu?: string;
  lichSu: string[];
}

export interface ThanhVien {
  id: number;
  hoTen: string;
  email: string;
  sdt: string;
  clb: string;
}

const CLB_KEY = 'th05_clb';
const DON_KEY = 'th05_don';
const TV_KEY = 'th05_thanhvien';

export const getCLB = (): CLB[] =>
  JSON.parse(localStorage.getItem(CLB_KEY) || '[]');

export const saveCLB = (data: CLB[]) =>
  localStorage.setItem(CLB_KEY, JSON.stringify(data));

export const addCLB = (clb: CLB) => {
  const list = getCLB();
  list.push(clb);
  saveCLB(list);
};

export const updateCLB = (clb: CLB) => {
  const list = getCLB().map((c) =>
    c.id === clb.id ? clb : c
  );
  saveCLB(list);
};

export const deleteCLB = (id: number) => {
  const list = getCLB().filter((c) => c.id !== id);
  saveCLB(list);
};

export const getDon = (): DonDangKy[] =>
  JSON.parse(localStorage.getItem(DON_KEY) || '[]');

export const saveDon = (data: DonDangKy[]) =>
  localStorage.setItem(DON_KEY, JSON.stringify(data));

export const addDon = (don: DonDangKy) => {
  const list = getDon();
  list.push(don);
  saveDon(list);
};

export const updateDon = (don: DonDangKy) => {
  const list = getDon().map((d) =>
    d.id === don.id ? don : d
  );
  saveDon(list);
};

export const deleteDon = (id: number) => {
  const list = getDon().filter((d) => d.id !== id);
  saveDon(list);
};

export const getThanhVien = (): ThanhVien[] =>
  JSON.parse(localStorage.getItem(TV_KEY) || '[]');

export const saveThanhVien = (data: ThanhVien[]) =>
  localStorage.setItem(TV_KEY, JSON.stringify(data));

export const approveDon = (id: number) => {
  const donList = getDon();
  const tvList = getThanhVien();

  const updated = donList.map((d) => {
    if (d.id === id) {
      tvList.push({
        id: d.id,
        hoTen: d.hoTen,
        email: d.email,
        sdt: d.sdt,
        clb: d.clb,
      });

      return {
        ...d,
        trangThai: 'Approved',
        lichSu: [
          ...d.lichSu,
          `Approved lúc ${new Date().toLocaleString()}`,
        ],
      };
    }
    return d;
  });

  saveDon(updated);
  saveThanhVien(tvList);
};

export const rejectDon = (id: number, reason: string) => {
  const list = getDon().map((d) => {
    if (d.id === id) {
      return {
        ...d,
        trangThai: 'Rejected',
        ghiChu: reason,
        lichSu: [
          ...d.lichSu,
          `Rejected lúc ${new Date().toLocaleString()} - ${reason}`,
        ],
      };
    }
    return d;
  });

  saveDon(list);
};

export const approveMany = (ids: number[]) => {
  ids.forEach((id) => approveDon(id));
};

export const rejectMany = (ids: number[], reason: string) => {
  ids.forEach((id) => rejectDon(id, reason));
};

export const changeCLBForMembers = (
  ids: number[],
  newCLB: string
) => {
  const list = getThanhVien().map((tv) => {
    if (ids.includes(tv.id)) {
      return { ...tv, clb: newCLB };
    }
    return tv;
  });

  saveThanhVien(list);
};