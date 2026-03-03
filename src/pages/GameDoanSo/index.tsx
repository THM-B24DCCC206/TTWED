import React, { useState } from "react";
import {
  Card,
  InputNumber,
  Button,
  Typography,
  Space,
  Progress,
} from "antd";

const { Title, Text } = Typography;

const GuessGame: React.FC = () => {
  const generateRandomNumber = (): number =>
    Math.floor(Math.random() * 100) + 1;

  const [started, setStarted] = useState<boolean>(false);
  const [randomNumber, setRandomNumber] = useState<number>(generateRandomNumber());
  const [guess, setGuess] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const maxAttempts: number = 10;

  const handleStart = (): void => {
    setStarted(true);
  };

  const handleGuess = (): void => {
    if (gameOver) return;

    if (guess === null || guess < 1 || guess > 100) {
      setMessage("⚠ Vui lòng nhập số từ 1 đến 100");
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guess === randomNumber) {
      setMessage("🎉 Chúc mừng! Bạn đã đoán đúng!");
      setGameOver(true);
    } else if (newAttempts >= maxAttempts) {
      setMessage(`❌ Bạn đã hết lượt! Số đúng là ${randomNumber}`);
      setGameOver(true);
    } else if (guess < randomNumber) {
      setMessage("⬆ Bạn đoán quá thấp!");
    } else {
      setMessage("⬇ Bạn đoán quá cao!");
    }
  };

  const handleReset = (): void => {
    setRandomNumber(generateRandomNumber());
    setGuess(null);
    setMessage("");
    setAttempts(0);
    setGameOver(false);
    setStarted(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <Card style={{ width: 420, textAlign: "center" }}>
        {!started ? (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Title level={2}>🎯 Game Đoán Số</Title>
            <Text>Đoán số mà máy tính đã chọn. Thử xem bạn có thể đoán đúng trong bao nhiêu lần!</Text>
            <Text>Bạn có 10 lượt đoán</Text>

            <Button type="primary" size="large" onClick={handleStart} block>
              🚀 Chơi Ngay
            </Button>
          </Space>
        ) : (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Title level={3}>Đoán số từ 1 đến 100</Title>

            <InputNumber
              min={1}
              max={100}
              value={guess}
              onChange={(value) => setGuess(value)}
              disabled={gameOver}
              style={{ width: "100%" }}
            />

            <Button
              type="primary"
              onClick={handleGuess}
              disabled={gameOver}
              block
            >
              Đoán
            </Button>

            <Text strong>{message}</Text>

            <div>
              <Text>Số lượt còn lại: {maxAttempts - attempts}</Text>
              <Progress
                percent={(attempts / maxAttempts) * 100}
                showInfo={false}
              />
            </div>

            {gameOver && (
              <Button onClick={handleReset} block>
                🔄 Chơi lại
              </Button>
            )}
          </Space>
        )}
      </Card>
    </div>
  );
};

export default GuessGame;