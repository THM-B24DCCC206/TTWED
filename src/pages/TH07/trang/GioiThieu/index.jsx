import React from 'react';
import { Avatar, Button, Card, Space, Tag } from 'antd';
import { thongTinTacGia } from '../../du_lieu/du_lieu_mau';

const GioiThieu = () => {
  const { name, avatar, bio, skills, socials } = thongTinTacGia;

  return (
    <Card>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Avatar src={avatar} size={100} />
        <h2>{name}</h2>
        <p>{bio}</p>

        <div>
          <strong>Kỹ năng:</strong>
          <div style={{ marginTop: 8 }}>
            {skills.map((kyNang) => (
              <Tag key={kyNang} color="blue">
                {kyNang}
              </Tag>
            ))}
          </div>
        </div>

        <Space>
          <Button type="link" href={socials.github} target="_blank">
            GitHub
          </Button>
          <Button type="link" href={socials.facebook} target="_blank">
            Facebook
          </Button>
          <Button type="link" href={socials.linkedin} target="_blank">
            LinkedIn
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

export default GioiThieu;