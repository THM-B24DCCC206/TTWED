import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';

const KTK: React.FC = () => {

  const [blocks, setBlocks] = useState([
    { id: 1, name: "Tổng quan" },
    { id: 2, name: "Chuyên sâu" }
  ]);

  const [name, setName] = useState("");

  const addBlock = () => {

    const newBlock = {
      id: blocks.length + 1,
      name
    };

    setBlocks([...blocks, newBlock]);
    setName("");
  };

  return (
    <>
      <Input
        placeholder="Tên khối kiến thức"
        style={{ width: 200, marginRight: 10 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button type="primary" onClick={addBlock}>
        Thêm
      </Button>

      <Table
        style={{ marginTop: 20 }}
        dataSource={blocks}
        columns={[
          { title: "ID", dataIndex: "id" },
          { title: "Tên khối", dataIndex: "name" }
        ]}
        rowKey="id"
      />
    </>
  );
};

export default KTK;