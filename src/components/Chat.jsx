import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Zap, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION } from '../data/prompts';
import { jobData } from '../data/jobData';

const MODEL_NAME = 'gemini-2.5-flash-lite';
const TOTAL_QUESTIONS = 10;

// JSON抽出ユーティリティ
const parseAIResponse = (text) => {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (e) {
    return null;
  }
};

const Chat = ({ onFinish }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [rouletteIndex, setRouletteIndex] = useState(0);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const genAI = useMemo(
    () => new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY }),
    [],
  );

  // 現在の質問数
  const progress = useMemo(
    () => messages.filter((m) => m.role === 'model').length,
    [messages],
  );

  // ルーレット演出
  useEffect(() => {
    let interval;
    if (isCalculating) {
      interval = setInterval(
        () => setRouletteIndex((prev) => (prev + 1) % jobData.length),
        80,
      );
    }
    return () => clearInterval(interval);
  }, [isCalculating]);

  // 初回起動
  useEffect(() => {
    const initChat = async () => {
      setIsLoading(true);
      try {
        const model = genAI.getGenerativeModel({
          model: MODEL_NAME,
          systemInstruction: SYSTEM_INSTRUCTION,
        });
        const result = await model.generateContent('診断を開始してください。');
        setMessages([{ role: 'model', text: result.response.text() }]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    initChat();
  }, [genAI]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    const updatedMessages = [...messages, { role: 'user', text: userText }];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
        systemInstruction: SYSTEM_INSTRUCTION,
      });
      const result = await model.generateContent({
        contents: updatedMessages.map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        })),
      });

      const responseText = result.response.text();
      const resultData = parseAIResponse(responseText);

      if (resultData && resultData.job_id) {
        setIsCalculating(true);
        setTimeout(() => onFinish(resultData), 2500); // 演出のため少し待機
      } else {
        setMessages((prev) => [...prev, { role: 'model', text: responseText }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: '通信エラーが発生したよ。もう一度送ってみて！' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(
    () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }),
    [messages],
  );

  return (
    <div className="chat-page">
      {/* 才能スキャン中オーバーレイ */}
      <AnimatePresence>
        {isCalculating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="analysis-overlay"
          >
            <div className="analysis-card">
              <div
                className="neo-label"
                style={{ backgroundColor: '#FFDE00', marginBottom: '16px' }}
              >
                SCANNING...
              </div>
              <img
                src={`/images/${jobData[rouletteIndex].imagePath}`}
                alt="scanning"
                style={{
                  width: '140px',
                  height: '140px',
                  objectFit: 'contain',
                  marginBottom: '16px',
                }}
              />
              <div className="neo-label" style={{ width: '100%' }}>
                {jobData[rouletteIndex].title}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="chat-header">
        <div className="chat-header-top">
          <div className="chat-status-group">
            <Zap size={18} fill="black" />
            <span className="chat-status-text">QUESTION</span>
          </div>
          <span className="chat-status-text">
            {progress} / {TOTAL_QUESTIONS}
          </span>
        </div>
        <div className="progress-bar-outer">
          <motion.div
            className="progress-bar-inner"
            animate={{ width: `${(progress / TOTAL_QUESTIONS) * 100}%` }}
          />
        </div>
      </header>

      <div className="message-list custom-scrollbar">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`message-wrapper ${msg.role}`}
          >
            <div className={`message-bubble message-${msg.role}`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="message-wrapper model">
            <div className="message-bubble message-model">
              <Loader2 className="animate-spin" />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <footer className="chat-footer">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={isLoading ? 'AI思考中...' : '答えを入力してね！'}
          disabled={isLoading || isCalculating}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="neo-btn send-btn"
        >
          <Send size={24} strokeWidth={3} />
        </button>
      </footer>
    </div>
  );
};

export default Chat;
