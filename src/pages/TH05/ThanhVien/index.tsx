import {
  Table,
  Button,
  Space,
  Modal,
  Select,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import {
  getDon,
  updateDon,
  getCLB,
} from '../services/th05Service';

const { Option } = Select;

interface Member {
  id: number;
  hoTen: string;
  email: string;
  sdt: string;
  gioiTinh: string;
  clb: string;
  trangThai: string;
}

export default function ThanhVienCLB() {
  const [data, setData] = useState<Member[]>([]);
  const [clbList, setClbList] = useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [targetCLB, setTargetCLB] = useState('');

  const load = () => {
    const don = getDon();

    const members = don
      .filter((d: any) => d.trangThai === 'Approved')
      .map((d: any) => ({
        id: d.id,
        hoTen: d.hoTen,
        email: d.email,
        sdt: d.sdt,
        gioiTinh: d.gioiTinh,
        clb: d.clb,
        trangThai: d.trangThai,
      }));

    setData(members);
    setClbList(getCLB());
  };

  useEffect(() => {
    load();
  }, []);

  const handleChangeCLB = () => {
    if (!targetCLB) {
      message.error('Chọn CLB cần chuyển');
      return;
    }

    const list = getDon().map((d: any) => {
      if (selectedRowKeys.includes(d.id)) {
        return {
          ...d,
          clb: targetCLB,
        };
      }
      return d;
    });

    localStorage.setItem('DON', JSON.stringify(list));

    message.success(
      `Đã chuyển ${selectedRowKeys.length} thành viên sang ${targetCLB}`
    );

    setModalOpen(false);
    setSelectedRowKeys([]);
    setTargetCLB('');
    load();
  };

  return (
    <>
      <Space style={{ marginBottom: 10 }}>
        <Button
          type="primary"
          disabled={!selectedRowKeys.length}
          onClick={() => setModalOpen(true)}
        >
          Đổi CLB ({selectedRowKeys.length})
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
        ]}
      />

      <Modal
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleChangeCLB}
        title={`Đổi CLB cho ${selectedRowKeys.length} thành viên`}
      >
        <Select
          style={{ width: '100%' }}
          placeholder="Chọn CLB mới"
          onChange={(v) => setTargetCLB(v)}
        >
          {clbList.map((c: any) => (
            <Option key={c.id} value={c.ten}>
              {c.ten}
            </Option>
          ))}
        </Select>
      </Modal>
    </>
  );
}