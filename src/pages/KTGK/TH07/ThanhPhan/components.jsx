import React from 'react';
import { Card, Tag, Avatar } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { Link } from 'umi';

const { Meta } = Card;

export const TheBaiViet = ({ item, onTagClick }) => {
  return (
    <Card
      hoverable
      cover={<img alt={item.title} src={item.cover} style={{ height: 200, objectFit: 'cover' }} />}
      actions={[
        <span key="author"><UserOutlined /> {item.author}</span>,
        <span key="date"><CalendarOutlined /> {item.date}</span>,
      ]}
    >
      <Link to={`/bai-viet/${item.id}`}>
        <Meta title={item.title} description={item.summary} />
      </Link>
      <div style={{ marginTop: 16 }}>
        {item.tags.map(tag => (
          <Tag 
            color="blue" 
            key={tag} 
            style={{ cursor: onTagClick ? 'pointer' : 'default' }}
            onClick={() => onTagClick && onTagClick(tag)}
          >
            {tag}
          </Tag>
        ))}
      </div>
    </Card>
  );
};