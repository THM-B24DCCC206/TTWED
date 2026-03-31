import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Switch,
  DatePicker,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  getCLB,
  addCLB,
  updateCLB,
  deleteCLB,
} from '../services/th05Service';

interface CLB {
  id: number;
  ten: string;
  avatar?: string;
  ngayThanhLap: string;
  moTa: string;
  chuNhiem: string;
  hoatDong: boolean;
}

export default function QuanLyCLB() {
  const [data, setData] = useState<CLB[]>([]);
  const [filtered, setFiltered] = useState<CLB[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CLB | null>(null);
  const [search, setSearch] = useState('');
  const [form] = Form.useForm();

  const load = () => {
    const list = getCLB();
    setData(list);
    setFiltered(list);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const result = data.filter((c) =>
      c.ten.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, data]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      const newData: CLB = {
        id: editing?.id || Date.now(),
        ten: values.ten,
        avatar: values.avatar || '',
        chuNhiem: values.chuNhiem || '',
        moTa: values.moTa || '',
        hoatDong: values.hoatDong || false,
        ngayThanhLap: values.ngayThanhLap
          ? dayjs(values.ngayThanhLap).format('YYYY-MM-DD')
          : '',
      };

      if (editing) {
        updateCLB(newData);
      } else {
        addCLB(newData);
      }

      setOpen(false);
      setEditing(null);
      form.resetFields();
      load();
    });
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}> <Input
          placeholder="Tìm theo tên CLB..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          type="primary"
          onClick={() => {
            setEditing(null);
            form.resetFields();
            setOpen(true);
          }}
        >
          + Thêm CLB
        </Button>
      </div>

      <Table
        rowKey="id"
        dataSource={filtered}
        columns={[
          {
            title: 'Ảnh',
            render: (_, r) =>
              r.avatar ? (
                <img src={r.avatar} width={50} />
              ) : (
                'No image'
              ),
          },
          {
            title: 'Tên CLB',
            dataIndex: 'ten',
            sorter: (a, b) => a.ten.localeCompare(b.ten),
          },
          {
            title: 'Ngày thành lập',
            dataIndex: 'ngayThanhLap',
            sorter: (a, b) =>
              dayjs(a.ngayThanhLap).unix() - dayjs(b.ngayThanhLap).unix(),
          },
          {
            title: 'Chủ nhiệm',
            dataIndex: 'chuNhiem',
          },
          {
            title: 'Hoạt động',
            render: (_, r) => (r.hoatDong ? 'Có' : 'Không'),
          },
          {
            title: 'Mô tả',
            render: (_, r) => (
              <div
                dangerouslySetInnerHTML={{ __html: r.moTa }}
              />
            ),
          },
          {
            title: 'Thao tác',
            render: (_, r) => (
              <Space>
                <Button
                  onClick={() => {
                    setEditing(r);
                    form.setFieldsValue({
                      ...r,
                      ngayThanhLap: r.ngayThanhLap
                        ? dayjs(r.ngayThanhLap)
                        : null,
                    });
                    setOpen(true);
                  }}
                >
                  Sửa
                </Button>

                <Button
                  danger
                  onClick={() => {
                    deleteCLB(r.id);
                    load();
                  }}
                >
                  Xoá
                </Button>

                <Button
                  onClick={() =>
                    (window.location.href = `/th05/thanh-vien?clb=${r.ten}`)
                  }
                >
                  Thành viên
                </Button>
              </Space>
            ),
          },
        ]}
      />

      <Modal
        title={editing ? 'Sửa CLB' : 'Thêm CLB'}
        visible={open}
        onCancel={() => setOpen(false)}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="ten"
            label="Tên CLB"
            rules={[{ required: true, message: 'Nhập tên CLB' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="avatar" label="Ảnh đại diện">
            <Upload
              beforeUpload={(file) => {
                const reader = new FileReader();
                reader.onload = () => {
                  form.setFieldsValue({ avatar: reader.result });
                };
                reader.readAsDataURL(file);
                return false;
              }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="ngayThanhLap" label="Ngày thành lập">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="chuNhiem" label="Chủ nhiệm">
            <Input />
          </Form.Item>

          <Form.Item name="moTa" label="Mô tả (HTML)">
            <Input.TextArea placeholder="<b>CLB IT...</b>" />
          </Form.Item>

          <Form.Item
            name="hoatDong"
            label="Hoạt động"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}