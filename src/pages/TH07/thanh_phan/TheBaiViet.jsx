import React from 'react';
import { Avatar, Card, Space, Tag } from 'antd';
import { history } from 'umi';
import { formatNgay } from '../tien_ich/blog';

const TheBaiViet = ({ baiViet, onChonThe }) => {
  return (
    <Card
      hoverable
      onClick={() => history.push(`/bai-viet/${baiViet.slug}`)}
      cover={
        <img
          alt={baiViet.title}
          src={baiViet.thumbnail}
          style={{ height: 220, objectFit: 'cover' }}
        />
      }
    >
      <Card.Meta
        avatar={<Avatar src={baiViet.author?.avatar} />}
        title={baiViet.title}
        description={
          <Space direction="vertical" size={8} style={{ width: '100%' }}>
            <div>{baiViet.summary}</div>
            <div>Ngày đăng: {formatNgay(baiViet.publishedAt)}</div>
            <div>Tác giả: {baiViet.author?.name}</div>
            <div onClick={(e) => e.stopPropagation()}>
              {baiViet.tags?.map((the) => (
                <Tag
                  key={the}
                  color="blue"
                  style={{ cursor: 'pointer', marginBottom: 6 }}
                  onClick={() => onChonThe?.(the)}
                >
                  {the}
                </Tag>
              ))}
            </div>
          </Space>
        }
      />
    </Card>
  );
};

export default TheBaiViet;