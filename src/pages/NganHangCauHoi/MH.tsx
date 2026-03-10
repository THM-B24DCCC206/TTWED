import React, { useState } from 'react';
import { Table, Input, InputNumber, Button } from 'antd';

const MH: React.FC = () => {

  const [subjects, setSubjects] = useState([
    { id: 1, code: "INT2201", name: "Lập trình Web", credits: 3 }
  ]);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [credits, setCredits] = useState<number>(3);

  const addSubject = () => {

    const newSubject = {
      id: subjects.length + 1,
      code,
      name,
      credits
    };

    setSubjects([...subjects, newSubject]);
  };

  return (
    <>
      <Input
        placeholder="Mã môn"
        style={{ width: 120, marginRight: 10 }}
        onChange={(e) => setCode(e.target.value)}
      />

      <Input
        placeholder="Tên môn"
        style={{ width: 200, marginRight: 10 }}
        onChange={(e) => setName(e.target.value)}
      />

      <InputNumber
        placeholder="Tín chỉ"
        value={credits}
        onChange={(v) => setCredits(v || 3)}
      />

      <Button
        type="primary"
        style={{ marginLeft: 10 }}
        onClick={addSubject}
      >
        Thêm
      </Button>

      <Table
        style={{ marginTop: 20 }}
        dataSource={subjects}
        columns={[
          { title: "Mã môn", dataIndex: "code" },
          { title: "Tên môn", dataIndex: "name" },
          { title: "Tín chỉ", dataIndex: "credits" }
        ]}
        rowKey="id"
      />
    </>
  );
};

export default MH;