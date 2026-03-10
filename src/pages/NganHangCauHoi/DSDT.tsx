import React, { useState } from 'react';
import { Table, Modal, Button } from 'antd';

interface Question {
  id: string;
  content: string;
  difficulty: string;
}

interface Exam {
  id: string;
  questions: Question[];
}

const DSDT: React.FC<any> = ({ examList, setExamList }) => {

  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [visible, setVisible] = useState(false);

  const viewExam = (exam: Exam) => {
    setSelectedExam(exam);
    setVisible(true);
  };

  const removeQuestion = (qid: string) => {

    if (!selectedExam) return;

    const updatedQuestions = selectedExam.questions.filter(
      q => q.id !== qid
    );

    const updatedExam = {
      ...selectedExam,
      questions: updatedQuestions
    };

    const newList = examList.map((exam: Exam) =>
      exam.id === selectedExam.id ? updatedExam : exam
    );

    setExamList(newList);
    setSelectedExam(updatedExam);
  };

  const columns = [
    {
      title: "Mã đề",
      dataIndex: "id"
    },
    {
      title: "Số câu",
      render: (_: any, record: Exam) => record.questions.length
    },
    {
      title: "Hành động",
      render: (_: any, record: Exam) => (
        <Button type="link" onClick={() => viewExam(record)}>
          Xem / Sửa
        </Button>
      )
    }
  ];

  const questionColumns = [
    { title: "Mã", dataIndex: "id" },
    { title: "Nội dung", dataIndex: "content" },
    { title: "Mức độ", dataIndex: "difficulty" },
    {
      title: "Xóa",
      render: (_: any, record: Question) => (
        <Button danger onClick={() => removeQuestion(record.id)}>
          Xóa
        </Button>
      )
    }
  ];

  return (
    <>
      <Table
        dataSource={examList}
        columns={columns}
        rowKey="id"
      />

      <Modal
        title="Chi tiết đề thi"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {selectedExam && (
          <Table
            dataSource={selectedExam.questions}
            columns={questionColumns}
            rowKey="id"
            pagination={false}
          />
        )}
      </Modal>
    </>
  );
};

export default DSDT;