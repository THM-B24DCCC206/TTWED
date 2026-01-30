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
  Select,
  Tag,
} from 'antd';

const { Search } = Input;

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

const QuanLySanPham = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Laptop Dell XPS 13', category: 'Laptop', price: 25000000, quantity: 10 },
    { id: 2, name: 'iPhone 15 Pro Max', category: 'Điện thoại', price: 30000000, quantity: 15 },
    { id: 3, name: 'Samsung Galaxy S24', category: 'Điện thoại', price: 22000000, quantity: 20 },
    { id: 4, name: 'iPad Air M2', category: 'Máy tính bảng', price: 18000000, quantity: 12 },
    { id: 5, name: 'MacBook Air M3', category: 'Laptop', price: 28000000, quantity: 8 },
  ]);

  const [visible, setVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  // ===== Trạng thái tồn kho =====
  const getStatus = (quantity: number) => {
    if (quantity === 0) return <Tag color="red">Hết hàng</Tag>;
    if (quantity <= 10) return <Tag color="orange">Sắp hết</Tag>;
    return <Tag color="green">Còn hàng</Tag>;
  };

  // ===== Thêm / Sửa sản phẩm =====
  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (editingProduct) {
        setProducts(products.map(p =>
          p.id === editingProduct.id ? { ...editingProduct, ...values } : p
        ));
        message.success('Cập nhật sản phẩm thành công');
      } else {
        setProducts([...products, { id: Date.now(), ...values }]);
        message.success('Thêm sản phẩm thành công');
      }
      setVisible(false);
      setEditingProduct(null);
      form.resetFields();
    });
  };

  // ===== Xóa =====
  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    message.success('Xóa sản phẩm thành công');
  };

  // ===== Sửa =====
  const handleEdit = (record: Product) => {
    setEditingProduct(record);
    setVisible(true);
    form.setFieldsValue(record);
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'STT',
      render: (_: any, __: any, index: number) => index + 1,
      width: 60,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      filters: [
        { text: 'Laptop', value: 'Laptop' },
        { text: 'Điện thoại', value: 'Điện thoại' },
        { text: 'Máy tính bảng', value: 'Máy tính bảng' },
      ],
      onFilter: (value: string | number | boolean, record: Product) => record.category === (value as string),
    },
    {
      title: 'Giá (VNĐ)',
      dataIndex: 'price',
      sorter: (a: Product, b: Product) => a.price - b.price,
      render: (price: number) => price.toLocaleString(),
    },
    {
      title: 'Tồn kho',
      dataIndex: 'quantity',
      sorter: (a: Product, b: Product) => a.quantity - b.quantity,
    },
    {
      title: 'Trạng thái',
      render: (_: any, record: Product) => getStatus(record.quantity),
    },
    {
      title: 'Thao tác',
      render: (_: any, record: Product) => (
        <Space>
          <Button size="small" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger size="small">Xóa</Button>
          </Popconfirm>
        </Space>
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
        <Button
          type="primary"
          onClick={() => {
            setEditingProduct(null);
            setVisible(true);
            form.resetFields();
          }}
        >
          Thêm sản phẩm
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        bordered
        pagination={{ pageSize: 5 }}
      />

      {/* Modal Thêm / Sửa */}
      <Modal
        title={editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
        visible={visible}
        onOk={handleSubmit}
        onCancel={() => setVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="Laptop">Laptop</Select.Option>
              <Select.Option value="Điện thoại">Điện thoại</Select.Option>
              <Select.Option value="Máy tính bảng">Máy tính bảng</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, type: 'number', min: 1 }]}
          >
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true, type: 'number', min: 0 }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLySanPham;
