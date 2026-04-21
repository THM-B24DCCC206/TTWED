import React, { useEffect, useMemo, useState } from 'react';
import { Col, Empty, Input, Pagination, Row, Space, Tag } from 'antd';
import debounce from 'lodash/debounce';
import TheBaiViet from '../../thanh_phan/TheBaiViet';
import { layBaiVietDaDang } from '../../tien_ich/blog';
import { layDanhSachBaiViet, layDanhSachThe } from '../../tien_ich/luu_tru';
const TrangChu = () => {
  const [danhSachBaiViet, setDanhSachBaiViet] = useState([]);
  const [danhSachThe, setDanhSachThe] = useState([]);
  const [tuKhoa, setTuKhoa] = useState('');
  const [tuKhoaDebounce, setTuKhoaDebounce] = useState('');
  const [theDangLoc, setTheDangLoc] = useState(null);
  const [trangHienTai, setTrangHienTai] = useState(1);

  useEffect(() => {
    setDanhSachBaiViet(layDanhSachBaiViet());
    setDanhSachThe(layDanhSachThe());
  }, []);

  const xuLyDebounce = useMemo(
    () =>
      debounce((value) => {
        setTuKhoaDebounce(value);
      }, 300),
    [],
  );

  useEffect(() => {
    return () => {
      xuLyDebounce.cancel();
    };
  }, [xuLyDebounce]);

  useEffect(() => {
    setTrangHienTai(1);
  }, [theDangLoc, tuKhoaDebounce]);

  const danhSachDaDang = useMemo(
    () => layBaiVietDaDang(danhSachBaiViet),
    [danhSachBaiViet],
  );

  const danhSachSauKhiLoc = useMemo(() => {
    return danhSachDaDang.filter((baiViet) => {
      const hopThe = theDangLoc ? baiViet.tags?.includes(theDangLoc) : true;

      const tuKhoaThuong = tuKhoaDebounce.trim().toLowerCase();
      const hopTuKhoa = tuKhoaThuong
        ? baiViet.title?.toLowerCase().includes(tuKhoaThuong) ||
          baiViet.summary?.toLowerCase().includes(tuKhoaThuong)
        : true;

      return hopThe && hopTuKhoa;
    });
  }, [danhSachDaDang, theDangLoc, tuKhoaDebounce]);

  const kichThuocTrang = 9;

  const danhSachPhanTrang = useMemo(() => {
    const batDau = (trangHienTai - 1) * kichThuocTrang;
    const ketThuc = batDau + kichThuocTrang;
    return danhSachSauKhiLoc.slice(batDau, ketThuc);
  }, [danhSachSauKhiLoc, trangHienTai]);

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Input
        placeholder="Tìm kiếm bài viết..."
        value={tuKhoa}
        onChange={(e) => {
          const value = e.target.value;
          setTuKhoa(value);
          xuLyDebounce(value);
        }}
      />

      <div>
        <Tag
          color={!theDangLoc ? 'blue' : 'default'}
          style={{ cursor: 'pointer', marginBottom: 8 }}
          onClick={() => setTheDangLoc(null)}
        >
          Tất cả
        </Tag>

        {danhSachThe.map((the) => (
          <Tag
            key={the.id}
            color={theDangLoc === the.name ? 'blue' : 'default'}
            style={{ cursor: 'pointer', marginBottom: 8 }}
            onClick={() => setTheDangLoc(the.name)}
          >
            {the.name}
          </Tag>
        ))}
      </div>

      {danhSachPhanTrang.length ? (
        <Row gutter={[16, 16]}>
          {danhSachPhanTrang.map((baiViet) => (
            <Col key={baiViet.id} xs={24} sm={12} md={8}>
              <TheBaiViet baiViet={baiViet} onChonThe={setTheDangLoc} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="Không có bài viết phù hợp" />
      )}

      <Pagination
        current={trangHienTai}
        pageSize={kichThuocTrang}
        total={danhSachSauKhiLoc.length}
        onChange={setTrangHienTai}
        style={{ textAlign: 'center' }}
      />
    </Space>
  );
};

export default TrangChu;