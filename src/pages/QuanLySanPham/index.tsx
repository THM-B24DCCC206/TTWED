import { useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  message,
  Space,
} from 'antd';

const { Search } = Input;

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const QuanLySanPham = () => {

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
    { id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
    { id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
    { id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
    { id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
  ]);

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const handleAddProduct = () => {
    form.validateFields().then(values => {
      const newProduct = {
        id: Date.now(),
        ...values,
      };
      setProducts([...products, newProduct]);
      message.success('Thêm sản phẩm thành công');
      setVisible(false);
      form.resetFields();
    });
  };


  const handleDelete = (id: number) => {
    setProducts(products.filter(item => item.id !== id));
    message.success('Xóa sản phẩm thành công');
  };


  const filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );


  const columns = [
    {
      title: 'STT',
      render: (_: string, __: Product, index: number) => index + 1,
      width: 60,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Giá (VNĐ)',
      dataIndex: 'price',
      render: (price: number) => price.toLocaleString(),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Thao tác',
      render: (_: string, record: Product) => (
        <Popconfirm
          title="Bạn có chắc muốn xóa sản phẩm này?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger size="small">
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Quản lý Sản phẩm</h2>

      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Tìm kiếm theo tên sản phẩm"
          allowClear
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => setVisible(true)}>
          Thêm sản phẩm
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        bordered
      />

      {/* Modal thêm sản phẩm */}
      <Modal
        title="Thêm sản phẩm mới"
        visible={visible}
        onOk={handleAddProduct}
        onCancel={() => setVisible(false)}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[
              { required: true, message: 'Vui lòng nhập giá' },
              {
                type: 'number',
                min: 1,
                message: 'Giá phải là số dương',
              },
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng' },
              {
                type: 'number',
                min: 1,
                message: 'Số lượng phải là số nguyên dương',
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLySanPham;

