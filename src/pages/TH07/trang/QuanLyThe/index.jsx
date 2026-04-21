import React, { useEffect, useMemo, useState } from 'react';
import { Button, message, Popconfirm, Space, Table } from 'antd';
import FormThe from '../../thanh_phan/FormThe';
import { demSoBaiVietTheoThe, taoId } from '../../tien_ich/blog';
import {
  layDanhSachBaiViet,
  layDanhSachThe,
  luuDanhSachBaiViet,
  luuDanhSachThe,
} from '../../tien_ich/luu_tru';

const QuanLyThe = () => {
  const [danhSachThe, setDanhSachThe] = useState([]);
  const [danhSachBaiViet, setDanhSachBaiViet] = useState([]);
  const [moModal, setMoModal] = useState(false);
  const [theDangSua, setTheDangSua] = useState(null);

  useEffect(() => {
    setDanhSachThe(layDanhSachThe());
    setDanhSachBaiViet(layDanhSachBaiViet());
  }, []);

  const duLieuBang = useMemo(() => {
    return danhSachThe.map((the) => ({
      ...the,
      soBaiViet: demSoBaiVietTheoThe(danhSachBaiViet, the.name),
    }));
  }, [danhSachThe, danhSachBaiViet]);

  const dongModal = () => {
    setMoModal(false);
    setTheDangSua(null);
  };

  const xuLyLuuThe = (values) => {
    const trungTen = danhSachThe.some((the) => {
      if (theDangSua && the.id === theDangSua.id) return false;
      return the.name.toLowerCase() === values.name.toLowerCase();
    });

    if (trungTen) {
      message.error('Tên thẻ đã tồn tại');
      return;
    }

    if (theDangSua) {
      const tenTheCu = theDangSua.name;
      const tenTheMoi = values.name;

      const danhSachTheMoi = danhSachThe.map((the) =>
        the.id === theDangSua.id ? { ...the, ...values } : the,
      );

      const danhSachBaiVietMoi = danhSachBaiViet.map((baiViet) => ({
        ...baiViet,
        tags: baiViet.tags?.map((the) => (the === tenTheCu ? tenTheMoi : the)) || [],
      }));

      setDanhSachThe(danhSachTheMoi);
      setDanhSachBaiViet(danhSachBaiVietMoi);

      luuDanhSachThe(danhSachTheMoi);
      luuDanhSachBaiViet(danhSachBaiVietMoi);

      message.success('Cập nhật thẻ thành công');
    } else {
      const theMoi = {
        id: taoId('tag'),
        ...values,
      };

      const danhSachTheMoi = [theMoi, ...danhSachThe];
      setDanhSachThe(danhSachTheMoi);
      luuDanhSachThe(danhSachTheMoi);

      message.success('Thêm thẻ thành công');
    }

    dongModal();
  };

  const xuLyXoaThe = (record) => {
    if (record.soBaiViet > 0) {
      message.error('Không thể xóa thẻ đang được sử dụng');
      return;
    }

    const danhSachTheMoi = danhSachThe.filter((the) => the.id !== record.id);
    setDanhSachThe(danhSachTheMoi);
    luuDanhSachThe(danhSachTheMoi);
    message.success('Xóa thẻ thành công');
  };

  const cotBang = [
    {
      title: 'Tên thẻ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Số bài viết đang sử dụng',
      dataIndex: 'soBaiViet',
      key: 'soBaiViet',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setTheDangSua(record);
              setMoModal(true);
            }}
          >
            Sửa
          </Button>

          <Popconfirm
            title="Bạn có chắc muốn xóa thẻ này?"
            onConfirm={() => xuLyXoaThe(record)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            setTheDangSua(null);
            setMoModal(true);
          }}
        >
          Thêm thẻ
        </Button>
      </div>

      <Table rowKey="id" columns={cotBang} dataSource={duLieuBang} />

      <FormThe
        open={moModal}
        onCancel={dongModal}
        onSubmit={xuLyLuuThe}
        theDangSua={theDangSua}
      />
    </div>
  );
};

export default QuanLyThe;