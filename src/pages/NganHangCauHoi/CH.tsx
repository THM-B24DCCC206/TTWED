import React from 'react';
import { Table, Form, Input, Select, Button } from 'antd';

const CH: React.FC<any> = ({ questionBank, setQuestionBank }) => {

  const addQuestion = (values:any) => {

    const newQuestion = {
      id: "Q" + (questionBank.length + 1),
      content: values.content,
      difficulty: values.difficulty
    };

    setQuestionBank([...questionBank, newQuestion]);
  };

  const columns = [
    { title: "Mã", dataIndex: "id" },
    { title: "Nội dung", dataIndex: "content" },
    { title: "Mức độ", dataIndex: "difficulty" }
  ];

  return (
    <>
      <Form layout="inline" onFinish={addQuestion}>

        <Form.Item name="content" rules={[{ required:true }]}>
          <Input placeholder="Nhập câu hỏi"/>
        </Form.Item>

        <Form.Item name="difficulty" rules={[{ required:true }]}>
          <Select
            style={{ width:150 }}
            placeholder="Mức độ"
            options={[
              {value:"Dễ", label:"Dễ"},
              {value:"Trung bình", label:"Trung bình"},
              {value:"Khó", label:"Khó"}
            ]}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Thêm
        </Button>

      </Form>

      <Table
        style={{marginTop:20}}
        dataSource={questionBank}
        columns={columns}
        rowKey="id"
      />
    </>
  );
};

export default CH;