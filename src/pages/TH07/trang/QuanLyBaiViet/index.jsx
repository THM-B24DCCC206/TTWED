import React, { useEffect, useMemo, useState } from 'react';
import { Button, Input, message, Popconfirm, Select, Space, Table, Tag } from 'antd';
import ModalFormBaiViet from '../../thanh_phan/FormBaiViet';
import { thongTinTacGia } from '../../du_lieu/du_lieu_mau';
import { kiemTraSlugTrung, formatNgay, taoId } from '../../tien_ich/blog';
import {
  layDanhSachBaiViet,
  layDanhSachThe,
  luuDanhSachBaiViet,
} from '../../tien_ich/luu_tru';

const QuanLyBaiViet = () => {
  const [danhSachBaiViet, setDanhSachBaiViet] = useState([]);
  const [danhSachThe, setDanhSachThe] = useState([]);
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
  const [trangThaiLoc, setTrangThaiLoc] = useState('all');
  const [moModal, setMoModal] = useState(false);
  const [baiVietDangSua, setBaiVietDangSua] = useState(null);

  useEffect(() => {
    setDanhSachBaiViet(layDanhSachBaiViet());
    setDanhSachThe(layDanhSachThe());
  }, []);

  const duLieuLoc = useMemo(() => {
    return danhSachBaiViet.filter((baiViet) => {
      const hopTieuDe = (baiViet.title || '')
        .toLowerCase()
        .includes(tuKhoaTimKiem.toLowerCase());

      const hopTrangThai =
        trangThaiLoc === 'all' ? true : baiViet.status === trangThaiLoc;

      return hopTieuDe && hopTrangThai;
    });
  }, [danhSachBaiViet, tuKhoaTimKiem, trangThaiLoc]);

  const dongModal = () => {
    setMoModal(false);
    setBaiVietDangSua(null);
  };

  const xuLyLuuBaiViet = (values) => {
    const slugBiTrung = kiemTraSlugTrung(
      danhSachBaiViet,
      values.slug,
      baiVietDangSua?.id,
    );

    if (slugBiTrung) {
      message.error('Slug đã tồn tại, vui lòng nhập slug khác');
      return;
    }

    if (baiVietDangSua) {
      const danhSachMoi = danhSachBaiViet.map((baiViet) => {
        if (baiViet.id !== baiVietDangSua.id) return baiViet;

        return {
          ...baiViet,
          ...values,
          publishedAt:
            values.status === 'published'
              ? baiViet.publishedAt || new Date().toISOString()
              : null,
        };
      });

      setDanhSachBaiViet(danhSachMoi);
      luuDanhSachBaiViet(danhSachMoi);
      message.success('Cập nhật bài viết thành công');
    } else {
      const baiVietMoi = {
        id: taoId('post'),
        ...values,
        author: thongTinTacGia,
        views: 0,
        createdAt: new Date().toISOString(),
        publishedAt: values.status === 'published' ? new Date().toISOString() : null,
      };

      const danhSachMoi = [baiVietMoi, ...danhSachBaiViet];
      setDanhSachBaiViet(danhSachMoi);
      luuDanhSachBaiViet(danhSachMoi);
      message.success('Thêm bài viết thành công');
    }

    dongModal();
  };

  const xuLyXoaBaiViet = (id) => {
    const danhSachMoi = danhSachBaiViet.filter((baiViet) => baiViet.id !== id);
    setDanhSachBaiViet(danhSachMoi);
    luuDanhSachBaiViet(danhSachMoi);
    message.success('Xóa bài viết thành công');
  };

  const cotBang = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'published' ? 'green' : 'orange'}>
          {status === 'published' ? 'Đã đăng' : 'Nháp'}
        </Tag>
      ),
    },
    {
      title: 'Thẻ',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) =>
        tags?.map((the) => (
          <Tag key={the} color="blue">
            {the}
          </Tag>
        )),
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (ngay) => formatNgay(ngay),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setBaiVietDangSua(record);
              setMoModal(true);
            }}
          >
            Sửa
          </Button>

          <Popconfirm
            title="Bạn có chắc muốn xóa bài viết này?"
            onConfirm={() => xuLyXoaBaiViet(record.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space
        style={{
          width: '100%',
          marginBottom: 16,
          justifyContent: 'space-between',
        }}
      >
        <Space>
          <Input
            placeholder="Tìm theo tiêu đề"
            style={{ width: 260 }}
            value={tuKhoaTimKiem}
            onChange={(e) => setTuKhoaTimKiem(e.target.value)}
          />

          <Select
            value={trangThaiLoc}
            onChange={setTrangThaiLoc}
            style={{ width: 180 }}
          >
            <Select.Option value="all">Tất cả trạng thái</Select.Option>
            <Select.Option value="draft">Nháp</Select.Option>
            <Select.Option value="published">Đã đăng</Select.Option>
          </Select>
        </Space>

        <Button
          type="primary"
          onClick={() => {
            setBaiVietDangSua(null);
            setMoModal(true);
          }}
        >
          Thêm bài viết
        </Button>
      </Space>

      <Table rowKey="id" columns={cotBang} dataSource={duLieuLoc} />

      <ModalFormBaiViet
        open={moModal}
        onCancel={dongModal}
        onSubmit={xuLyLuuBaiViet}
        baiVietDangSua={baiVietDangSua}
        danhSachThe={danhSachThe}
      />
    </div>
  );
};

export default QuanLyBaiViet;