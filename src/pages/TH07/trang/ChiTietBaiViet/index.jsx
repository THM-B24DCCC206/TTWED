import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Card, Empty, Space, Tag } from 'antd';
import ReactMarkdown from 'react-markdown';
import { history, useParams } from 'umi';
import { formatNgay } from '../../tien_ich/blog';
import { layDanhSachBaiViet, luuDanhSachBaiViet } from '../../tien_ich/luu_tru';
const ChiTietBaiViet = () => {
  const { slug } = useParams();
  const [danhSachBaiViet, setDanhSachBaiViet] = useState([]);
  const daTangLuotXem = useRef(false);

  useEffect(() => {
    setDanhSachBaiViet(layDanhSachBaiViet());
  }, []);

  const baiViet = useMemo(
    () => danhSachBaiViet.find((item) => item.slug === slug),
    [danhSachBaiViet, slug],
  );

  useEffect(() => {
    if (!baiViet || daTangLuotXem.current) return;

    daTangLuotXem.current = true;

    const danhSachMoi = danhSachBaiViet.map((item) =>
      item.id === baiViet.id ? { ...item, views: (item.views || 0) + 1 } : item,
    );

    setDanhSachBaiViet(danhSachMoi);
    luuDanhSachBaiViet(danhSachMoi);
  }, [baiViet, danhSachBaiViet]);

  const baiVietLienQuan = useMemo(() => {
    if (!baiViet) return [];

    return danhSachBaiViet
      .filter((item) => {
        if (item.id === baiViet.id) return false;
        if (item.status !== 'published') return false;
        return item.tags?.some((the) => baiViet.tags?.includes(the));
      })
      .slice(0, 3);
  }, [danhSachBaiViet, baiViet]);

  if (!baiViet) {
    return <Empty description="Không tìm thấy bài viết" />;
  }

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Button onClick={() => history.push('/')}>Quay lại danh sách</Button>

      <Card>
        <img
          src={baiViet.thumbnail}
          alt={baiViet.title}
          style={{
            width: '100%',
            maxHeight: 400,
            objectFit: 'cover',
            marginBottom: 16,
            borderRadius: 8,
          }}
        />

        <h1>{baiViet.title}</h1>

        <p>Tác giả: {baiViet.author?.name}</p>
        <p>Ngày đăng: {formatNgay(baiViet.publishedAt)}</p>
        <p>Lượt xem: {baiViet.views || 0}</p>

        <div style={{ marginBottom: 16 }}>
          {baiViet.tags?.map((the) => (
            <Tag key={the} color="blue">
              {the}
            </Tag>
          ))}
        </div>

        <div style={{ lineHeight: 1.8 }}>
          <ReactMarkdown>{baiViet.content}</ReactMarkdown>
        </div>
      </Card>

      <Card title="Bài viết liên quan">
        {baiVietLienQuan.length ? (
          <Space direction="vertical">
            {baiVietLienQuan.map((item) => (
              <Button
                key={item.id}
                type="link"
                onClick={() => history.push(`/bai-viet/${item.slug}`)}
              >
                {item.title}
              </Button>
            ))}
          </Space>
        ) : (
          <Empty description="Không có bài viết liên quan" />
        )}
      </Card>
    </Space>
  );
};

export default ChiTietBaiViet;