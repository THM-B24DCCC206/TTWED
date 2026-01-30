import { Tabs } from 'antd';

import QuanLySanPham from '../QuanLySanPham';
import QuanLyDonHang from '../QuanLyDonHang/quanlydonhang';

const Home = () => {


  return (
    <Tabs defaultActiveKey="products" type="card">
      <Tabs.TabPane tab="Quản lý Sản phẩm" key="products">
        <QuanLySanPham />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Quản lý Đơn hàng" key="orders">
        <QuanLyDonHang />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default Home;
