import React, { useState } from 'react';
import { Form, InputNumber, Button, Table, message } from 'antd';

const DT: React.FC<any> = ({ questionBank, examList, setExamList }) => {

  const [exam, setExam] = useState<any[]>([]);

  const randomQuestions = (difficulty:string, number:number)=>{

    const filtered = questionBank.filter(
      (q:any)=> q.difficulty === difficulty
    );

    return filtered
      .sort(()=>0.5 - Math.random())
      .slice(0, number);
  };

  const createExam = (values:any)=>{

    const result = [
      ...randomQuestions("Dễ", values.easy || 0),
      ...randomQuestions("Trung bình", values.medium || 0),
      ...randomQuestions("Khó", values.hard || 0)
    ];

    setExam(result);
  };


  const saveExam = () => {

    if(exam.length === 0){
      message.error("Chưa có đề để lưu");
      return;
    }

    const newExam = {
      id: "DT" + (examList.length + 1),
      questions: exam
    };

    setExamList([...examList, newExam]);

    message.success("Đã lưu đề thi");
  };

  const columns = [
    {title:"Mã", dataIndex:"id"},
    {title:"Nội dung", dataIndex:"content"},
    {title:"Mức độ", dataIndex:"difficulty"}
  ];

  return(
    <>
      <Form layout="inline" onFinish={createExam}>

        <Form.Item name="easy" label="Dễ">
          <InputNumber min={0}/>
        </Form.Item>

        <Form.Item name="medium" label="Trung bình">
          <InputNumber min={0}/>
        </Form.Item>

        <Form.Item name="hard" label="Khó">
          <InputNumber min={0}/>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Tạo đề
        </Button>

      </Form>

      <Table
        style={{marginTop:20}}
        dataSource={exam}
        columns={columns}
        rowKey="id"
      />

      <Button
        style={{marginTop:20}}
        type="primary"
        onClick={saveExam}
      >
        Lưu đề thi
      </Button>

    </>
  );
};

export default DT;