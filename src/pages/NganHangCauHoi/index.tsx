import React, { useState } from 'react';
import { Tabs, Card } from 'antd';

import KTK from './KTK';
import MH from './MH';
import CH from './CH';
import DT from './DT';
import DSDT from './DSDT';
import { initialQuestions } from './DLM';

const { TabPane } = Tabs;

interface Question {
  id: string;
  content: string;
  difficulty: string;
}

interface Exam {
  id: string;
  questions: Question[];
}

const NganHangCauHoi: React.FC = () => {


  const [questionBank, setQuestionBank] = useState<Question[]>(initialQuestions);

  const [examList, setExamList] = useState<Exam[]>([]);

  return (
    <Card title="Hệ thống ngân hàng câu hỏi">

      <Tabs defaultActiveKey="1">

        <TabPane tab="Khối kiến thức" key="1">
          <KTK />
        </TabPane>

        <TabPane tab="Môn học" key="2">
          <MH />
        </TabPane>

        <TabPane tab="Câu hỏi" key="3">
          <CH
            questionBank={questionBank}
            setQuestionBank={setQuestionBank}
          />
        </TabPane>

        <TabPane tab="Đề thi" key="4">
          <DT
            questionBank={questionBank}
            examList={examList}
            setExamList={setExamList}
          />
        </TabPane>

        <TabPane tab="Danh sách đề thi" key="5">
          <DSDT
           examList={examList}
           setExamList={setExamList}
          
          />
        </TabPane>

      </Tabs>

    </Card>
  );
};

export default NganHangCauHoi;