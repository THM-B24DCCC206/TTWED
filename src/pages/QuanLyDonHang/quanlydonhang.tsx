import { useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from 'antd';

interface Order {
  id: string;
  customerName: string;
  products: any[];
  totalAmount: number;
  status: string;
}

const QuanLyDonHang = ({ products, setProducts }: any) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCreateOrder = () => {
    form.validateFields().then(values => {
      const orderProducts = values.products.map((p: any) => {
        const product = products.find((x: any) => x.id === p.productId);
        return {
          productId: p.productId,
          productName: product.name,
          quantity: p.quantity,
          price: product.price,
        };
      });

      const total = orderProducts.reduce(
        (sum: number, p: any) => sum + p.price * p.quantity,
        0,
      );

      setOrders([
        ...orders,
        {
          id: `DH${Date.now()}`,
          customerName: values.customerName,
          products: orderProducts,
          totalAmount: total,
          status: 'Chờ xử lý',
        },
      ]);

      setVisible(false);
      form.resetFields();
    });
  };

  // STEP 4 – TRỪ / HOÀN KHO
  const handleChangeStatus = (order: Order, status: string) => {
    setOrders(prev =>
      prev.map(o => (o.id === order.id ? { ...o, status } : o)),
    );

    if (status === 'Hoàn thành') {
      setProducts((prev: any[]) =>
        prev.map(p => {
          const item = order.products.find(i => i.productId === p.id);
          return item ? { ...p, quantity: p.quantity - item.quantity } : p;
        }),
      );
    }

    if (status === 'Đã hủy') {
      setProducts((prev: any[]) =>
        prev.map(p => {
          const item = order.products.find(i => i.productId === p.id);
          return item ? { ...p, quantity: p.quantity + item.quantity } : p;
        }),
      );
    }
  };

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'id',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customerName',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      render: (v: number) => v.toLocaleString(),
    },
    {
      title: 'Trạng thái',
      render: (_: any, record: Order) => (
        <Select
          value={record.status}
          onChange={value => handleChangeStatus(record, value)}
          style={{ width: 130 }}
        >
          <Select.Option value="Chờ xử lý">Chờ xử lý</Select.Option>
          <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
          <Select.Option value="Đã hủy">Đã hủy</Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Tạo đơn hàng
      </Button>

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        bordered
        style={{ marginTop: 16 }}
      />

      <Modal
        title="Tạo đơn hàng"
        visible={visible}
        onOk={handleCreateOrder}
        onCancel={() => setVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="customerName" label="Tên khách hàng" required>
            <Input />
          </Form.Item>

          <Form.List name="products">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <Space key={field.key}>
                    <Form.Item name={[field.name, 'productId']} required>
                      <Select placeholder="Sản phẩm" style={{ width: 200 }}>
                        {products.map((p: any) => (
                          <Select.Option key={p.id} value={p.id}>
                            {p.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item name={[field.name, 'quantity']} required>
                      <InputNumber min={1} />
                    </Form.Item>

                    <Button danger onClick={() => remove(field.name)}>
                      Xóa
                    </Button>
                  </Space>
                ))}

                <Button type="dashed" onClick={() => add()}>
                  + Thêm sản phẩm
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
};

export default QuanLyDonHang;
