import React from 'react';
import { Tabs } from 'antd';
import DanhMuc from './DanhMuc';
import TienDo from './TienDo';
import MucTieu from './MucTieu';

const QuanLyHocTap = () => {
  return (
    <div>
      <h1> Quản lý học tập</h1>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Quản lý danh mục" key="1">
          <DanhMuc />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Quản lý tiến độ" key="2">
          <TienDo />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Mục tiêu tháng" key="3">
          <MucTieu />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default QuanLyHocTap;