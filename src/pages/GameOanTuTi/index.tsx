import React, { useState } from "react";
import { Button, Card, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

const choices = ["Kéo", "Búa", "Bao"];

interface Round {
  player: string;
  computer: string;
  result: string;
}

function Game() {
  const [history, setHistory] = useState<Round[]>([]);

  const playGame = (playerChoice: string) => {
    const computerChoice =
      choices[Math.floor(Math.random() * 3)];

    let result = "";

    if (playerChoice === computerChoice) {
      result = "Hòa";
    } else if (
      (playerChoice === "Kéo" && computerChoice === "Bao") ||
      (playerChoice === "Bao" && computerChoice === "Búa") ||
      (playerChoice === "Búa" && computerChoice === "Kéo")
    ) {
      result = "Thắng";
    } else {
      result = "Thua";
    }

    const newRound: Round = {
      player: playerChoice,
      computer: computerChoice,
      result,
    };

    setHistory([...history, newRound]);
  };

  const columns: ColumnsType<Round> = [
    {
      title: "Người chơi",
      dataIndex: "player",
    },
    {
      title: "Máy",
      dataIndex: "computer",
    },
    {
      title: "Kết quả",
      dataIndex: "result",
    },
  ];

  return (
    <Card title="Trò chơi Oẳn Tù Tì">
      <div style={{ marginBottom: 20 }}>
        {choices.map((item) => (
          <Button
            key={item}
            type="primary"
            style={{ marginRight: 10 }}
            onClick={() => playGame(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <Table<Round>
        dataSource={history}
        columns={columns}
        rowKey={(record, index) => `${index}`}
        pagination={false}
      />
    </Card>
  );
}

export default Game;