import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Zap } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION } from '../data/prompts';
import { jobData } from '../data/jobData';

const MODEL = 'gemini-2.5-flash-lite';
const TOTAL_QUESTIONS = 10;

const extractJson = (text) => {
  if (!text) return null;
  const start = text.indexOf('{');
  if (start === -1) return null;
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] === '{') depth++;
    if (text[i] === '}') depth--;
    if (depth === 0) return text.substring(start, i + 1);
  }
  return null;
};

const Chat = ({ onFinish }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [rouletteIndex, setRouletteIndex] = useState(0);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const client = useMemo(
    () => new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY }),
    [],
  );

  const currentQuestionNumber = useMemo(() => {
    return messages.filter((m) => m.role === 'model').length;
  }, [messages]);

  useEffect(() => {
    let interval;
    if (isCalculating) {
      interval = setInterval(() => {
        setRouletteIndex((prev) => (prev + 1) % jobData.length);
      }, 80);
    }
    return () => clearInterval(interval);
  }, [isCalculating]);

  useEffect(() => {
    const startDiagnosis = async () => {
      setIsLoading(true);
      try {
        const initialPrompt =
          '診断を開始してください。最初の質問をお願いします。';
        const result = await client.models.generateContent({
          model: MODEL,
          config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 1.0 },
          contents: [{ role: 'user', parts: [{ text: initialPrompt }] }],
        });
        setMessages([
          { role: 'user', text: initialPrompt, hidden: true },
          { role: 'model', text: result.text },
        ]);
      } catch (err) {
        setError('うまく開始できなかったみたい。');
      } finally {
        setIsLoading(false);
      }
    };
    startDiagnosis();
  }, [client]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const targetInput = input;
    const newMessages = [...messages, { role: 'user', text: targetInput }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // --- 【デバッグ用】 "test" と入力されたら強制終了 ---
    if (targetInput.toLowerCase() === 'test') {
      setIsCalculating(true);
      setTimeout(() => {
        onFinish({
          job_id: 1,
          aiReason: 'テスト完了',
          scores: {
            planning: 50,
            creative: 50,
            technical: 50,
            analysis: 50,
            communication: 50,
          },
        });
      }, 2000);
      return;
    }

    try {
      const result = await client.models.generateContent({
        model: MODEL,
        config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 1.0 },
        contents: newMessages.map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        })),
      });

      const responseText = result.text;
      const jsonStr = extractJson(responseText);

      if (jsonStr) {
        setIsCalculating(true);
        setTimeout(() => onFinish(JSON.parse(jsonStr)), 2000);
        return;
      }
      setMessages((prev) => [...prev, { role: 'model', text: responseText }]);
    } catch (err) {
      setError('AIがちょっと混み合っているみたい。');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isLoading && !isCalculating) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [isLoading, isCalculating]);

  return (
    <div className="chat-page">
      <AnimatePresence>
        {isCalculating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="analysis-overlay"
          >
            <div className="analysis-card">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="analysis-status-tag"
              >
                Analyzing...
              </motion.div>
              <div
                style={{
                  height: '160px',
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}
              >
                <img
                  src={`/images/${jobData[rouletteIndex].imagePath}`}
                  alt="scanning"
                  style={{
                    width: '128px',
                    height: '128px',
                    objectFit: 'contain',
                  }}
                />
              </div>
              <div
                className="neo-label"
                style={{
                  width: '100%',
                  marginBottom: '16px',
                  fontSize: '20px',
                }}
              >
                {jobData[rouletteIndex].title}
              </div>
              <p className="font-bold text-sm">君の才能をスキャン中...</p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              style={{ marginTop: '40px' }}
            >
              <Zap size={48} fill="black" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="chat-header">
        <div className="chat-header-top">
          <div className="chat-status-group">
            <Zap size={18} fill="black" strokeWidth={3} />
            <span className="chat-status-text">ANALYZING...</span>
          </div>
          <span className="chat-status-text">
            {currentQuestionNumber} / {TOTAL_QUESTIONS}
          </span>
        </div>
        <div className="progress-bar-outer">
          <div className="progress-bar-bg" />
          <motion.div
            className="progress-bar-inner"
            animate={{
              width: `${(currentQuestionNumber / TOTAL_QUESTIONS) * 100}%`,
            }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
          />
        </div>
      </header>

      <div className="message-list custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {messages
            .filter((m) => !m.hidden)
            .map((msg, i) => (
              <motion.div
                key={i}
                initial={{ x: msg.role === 'user' ? 20 : -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className={`message-wrapper ${msg.role === 'user' ? 'user' : 'model'}`}
              >
                <div
                  className={`message-bubble ${msg.role === 'user' ? 'message-user' : 'message-model'}`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>
      <footer className="chat-footer">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="chat-input"
          placeholder={isLoading ? 'SCANNING...' : 'INPUT ANSWER!'}
          disabled={isLoading || isCalculating}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || isCalculating || !input.trim()}
          className="neo-btn send-btn"
        >
          <Send size={24} strokeWidth={3} />
        </button>
      </footer>
    </div>
  );
};

export default Chat;
