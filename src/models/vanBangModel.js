import { useState, useEffect } from 'react';

export default function useVanBangModel() {
  const getLocalData = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [soVanBangList, setSoVanBangList] = useState(() => getLocalData('soVanBangList', []));
  const [quyetDinhList, setQuyetDinhList] = useState(() => getLocalData('quyetDinhList', []));
  const [cauHinhList, setCauHinhList] = useState(() => getLocalData('cauHinhList', []));
  const [vanBangList, setVanBangList] = useState(() => getLocalData('vanBangList', []));

  useEffect(() => localStorage.setItem('soVanBangList', JSON.stringify(soVanBangList)), [soVanBangList]);
  useEffect(() => localStorage.setItem('quyetDinhList', JSON.stringify(quyetDinhList)), [quyetDinhList]);
  useEffect(() => localStorage.setItem('cauHinhList', JSON.stringify(cauHinhList)), [cauHinhList]);
  useEffect(() => localStorage.setItem('vanBangList', JSON.stringify(vanBangList)), [vanBangList]);

  return {
    soVanBangList, setSoVanBangList,
    quyetDinhList, setQuyetDinhList,
    cauHinhList, setCauHinhList,
    vanBangList, setVanBangList,
  };
}