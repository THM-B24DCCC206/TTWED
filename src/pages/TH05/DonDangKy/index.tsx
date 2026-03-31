import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  getDon,
  addDon,
  updateDon,
  deleteDon,
} from '../services/th05Service';

const { Option } = Select;

interface Don {
  id: number;
  hoTen: string;
  email: string;
  sdt: string;
  gioiTinh: string;
  diaChi: string;
  soTruong: string;
  clb: string;
  lyDo: string;
  trangThai: 'Pending' | 'Approved' | 'Rejected';
  ghiChu?: string;
  lichSu: string[];
}

export default function DonDangKy() {
  const [data, setData] = useState<Don[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Don | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [form] = Form.useForm();

  const load = () => {
    setData(getDon());
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = () => {
    form.validateFields().then((v) => {
      const newData: Don = {
        id: editing?.id || Date.now(),
        ...v,
        trangThai: editing?.trangThai || 'Pending',
        lichSu: editing?.lichSu || [],
      };

      if (editing) updateDon(newData);
      else addDon(newData);

      setOpen(false);
      setEditing(null);
      form.resetFields();
      load();
    });
  };

  const handleDelete = (id: number) => {
    deleteDon(id);
    load();
  };

  const handleApprove = (ids: number[]) => {
    const list = data.map((d) => {
      if (ids.includes(d.id)) {
        const log = `Approved lúc ${dayjs().format(
          'HH:mm DD/MM/YYYY'
        )}`;
        return {
          ...d,
          trangThai: 'Approved',
          lichSu: [...d.lichSu, log],
        };
      }
      return d;
    });

    localStorage.setItem('th05_don', JSON.stringify(list));
    setSelectedRowKeys([]);
    load();
  };

  const handleReject = () => {
    if (!rejectReason) {
      message.error('Nhập lý do từ chối');
      return;
    }

    const list = data.map((d) => {
      if (selectedRowKeys.includes(d.id)) {
        const log = `Rejected lúc ${dayjs().format(
          'HH:mm DD/MM/YYYY'
        )} - ${rejectReason}`;
        return {
          ...d,
          trangThai: 'Rejected',
          ghiChu: rejectReason,
          lichSu: [...d.lichSu, log],
        };
      }
      return d;
    });

    localStorage.setItem('th05_don', JSON.stringify(list));
    setRejectModal(false);
    setRejectReason('');
    setSelectedRowKeys([]);
    load();
  };

  return (
    <>
      <Space style={{ marginBottom: 10 }}>
        <Button type="primary" onClick={() => setOpen(true)}> + Thêm đơn
        </Button>

        <Button
          disabled={!selectedRowKeys.length}
          onClick={() => handleApprove(selectedRowKeys)}
        >
          Duyệt {selectedRowKeys.length}
        </Button>

        <Button
          danger
          disabled={!selectedRowKeys.length}
          onClick={() => setRejectModal(true)}
        >
          Từ chối {selectedRowKeys.length}
        </Button>
      </Space>

      <Table
        rowKey="id"
        dataSource={data}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys as number[]),
        }}
        columns={[
          { title: 'Họ tên', dataIndex: 'hoTen' },
          { title: 'Email', dataIndex: 'email' },
          { title: 'SĐT', dataIndex: 'sdt' },
          { title: 'Giới tính', dataIndex: 'gioiTinh' },
          { title: 'CLB', dataIndex: 'clb' },
          { title: 'Trạng thái', dataIndex: 'trangThai' },
          {
            title: 'Thao tác',
            render: (_, r) => (
              <Space>
                <Button
                  onClick={() => {
                    setEditing(r);
                    form.setFieldsValue(r);
                    setOpen(true);
                  }}
                >
                  Sửa
                </Button>

                <Button danger onClick={() => handleDelete(r.id)}>
                  Xoá
                </Button>

                <Button
                  onClick={() =>
                    Modal.info({
                      title: 'Lịch sử',
                      content: r.lichSu.map((l, i) => (
                        <div key={i}>{l}</div>
                      )),
                    })
                  }
                >
                  Lịch sử
                </Button>
              </Space>
            ),
          },
        ]}
      />

      <Modal
        visible={open}
        onCancel={() => setOpen(false)}
        onOk={handleSave}
        title="Đơn đăng ký"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="hoTen" label="Họ tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>

          <Form.Item name="sdt" label="SĐT">
            <Input />
          </Form.Item>

          <Form.Item name="gioiTinh" label="Giới tính">
            <Select>
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
            </Select>
          </Form.Item>

          <Form.Item name="diaChi" label="Địa chỉ">
            <Input />
          </Form.Item>

          <Form.Item name="soTruong" label="Sở trường">
            <Input />
          </Form.Item>

          <Form.Item name="clb" label="CLB">
            <Input placeholder="Nhập tên CLB" />
          </Form.Item>

          <Form.Item name="lyDo" label="Lý do đăng ký">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={rejectModal}
        onCancel={() => setRejectModal(false)}
        onOk={handleReject}
        title="Lý do từ chối"
      >
        <Input.TextArea
          onChange={(e) => setRejectReason(e.target.value)}
        />
      </Modal>
    </>
  );
}