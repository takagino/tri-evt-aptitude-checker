import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RefreshCcw,
  ClipboardList,
  Zap,
  Heart,
  Star,
  BookOpen,
  ChevronUp,
  Play,
  Pause,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { jobData } from '../data/jobData';

const SCROLL_SPEED = 15;

const Result = ({ result, onReset }) => {
  const [showFlow, setShowFlow] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollRef = useRef(null);
  const jobDetails = jobData.find((j) => j.id === Number(result.id));

  // 祝福の紙吹雪
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FFDE00', '#00E0FF', '#FF00E5', '#00FF94'],
    });
  }, []);

  // オートスクロールのロジック
  useEffect(() => {
    let interval;
    if (isAutoScrolling) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
          if (scrollTop + clientHeight >= scrollHeight - 1) {
            setIsAutoScrolling(false);
          } else {
            scrollRef.current.scrollTop += 1;
          }
        }
      }, SCROLL_SPEED);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  if (!jobDetails) return null;

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      setIsAutoScrolling(false);
    }
  };

  const stats = [
    { label: '企画・設計', key: 'planning', color: '#00E0FF' },
    { label: '表現・感性', key: 'creative', color: '#FF00E5' },
    { label: '論理・構築', key: 'technical', color: '#7000FF' },
    { label: '共感・分析', key: 'analysis', color: '#00FF94' },
    { label: '伝える力', key: 'communication', color: '#FF5C00' },
  ];

  return (
    <div className="result-page">
      {/* ヘッダー */}
      <header className="result-header">
        <div className="chat-status-group">
          <Star size={18} fill="black" />
          <span className="chat-status-text">Diagnostic Report</span>
        </div>
        <div
          className="report-tag"
          style={{
            backgroundColor: '#FFDE00',
            border: '2px solid black',
            padding: '2px 8px',
            fontSize: '10px',
            fontWeight: '900',
          }}
        >
          COMPLETE!
        </div>
      </header>

      <div ref={scrollRef} className="result-scroll-area custom-scrollbar">
        {/* --- SECTION 1: 診断結果本体 --- */}
        <section
          style={{
            textAlign: 'center',
            marginBottom: '48px',
            paddingTop: '16px',
          }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="neo-card"
            style={{
              display: 'inline-block',
              boxShadow: '12px 12px 0px black',
            }}
          >
            <img
              src={`/images/${jobDetails.imagePath}`}
              style={{ width: '240px', height: '240px' }}
              alt={jobDetails.title}
            />
          </motion.div>

          <div style={{ marginTop: '24px' }}>
            <h1
              style={{
                fontSize: '36px',
                fontWeight: '900',
                fontStyle: 'italic',
                textTransform: 'uppercase',
              }}
            >
              {jobDetails.title}
            </h1>
            <div
              style={{
                backgroundColor: 'black',
                color: '#00FF94',
                display: 'inline-block',
                padding: '4px 12px',
                marginTop: '16px',
                transform: 'rotate(-1deg)',
                fontStyle: 'italic',
              }}
            >
              {jobDetails.catchcopy}
            </div>
          </div>

          {/* 才能分析レポート */}
          <div
            className="neo-card"
            style={{ marginTop: '32px', textAlign: 'left' }}
          >
            <div className="talent-report-title">
              <Zap fill="black" />{' '}
              <span style={{ fontWeight: '900' }}>才能分析レポート</span>
            </div>
            {stats.map((s) => (
              <div key={s.key} style={{ marginBottom: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '14px',
                    opacity: 0.5,
                  }}
                >
                  <span>{s.label}</span>
                  <span>{result.scores?.[s.key]}%</span>
                </div>
                <div className="stat-bar-container">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.scores?.[s.key]}%` }}
                    transition={{ duration: 1, ease: 'linear' }}
                    className="stat-bar-fill"
                    style={{ backgroundColor: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* AIアドバイス */}
          <div
            className="neo-card"
            style={{
              marginTop: '24px',
              backgroundColor: 'black',
              color: 'white',
              textAlign: 'left',
            }}
          >
            <h4
              style={{
                color: '#FFDE00',
                fontStyle: 'italic',
                marginBottom: '8px',
              }}
            >
              AIアドバイス
            </h4>
            <p
              style={{
                fontSize: '14px',
                lineHeight: '1.6',
                fontStyle: 'italic',
              }}
            >
              {result.aiReason}
            </p>
          </div>
        </section>

        {/* --- SECTION 2: 職業詳細 --- */}
        <section style={{ marginBottom: '48px' }}>
          <div
            className="neo-label"
            style={{
              backgroundColor: '#00E0FF',
              transform: 'rotate(-2deg)',
              marginBottom: '16px',
            }}
          >
            この職業について
          </div>
          <div className="neo-card" style={{ marginBottom: '32px' }}>
            <p
              style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'left' }}
            >
              {jobDetails.description}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <BookOpen size={20} color="#FF00E5" />
            <h3 style={{ fontSize: '18px', fontWeight: '900' }}>
              主なミッション
            </h3>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {jobDetails.responsibilities.map((r, i) => (
              <div key={i} className="mission-item">
                <div className="step-badge">{i + 1}</div>
                <div>
                  <h4
                    style={{
                      fontWeight: '900',
                      fontSize: '15px',
                      marginBottom: '4px',
                    }}
                  >
                    {r.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>
                    {r.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: 日常トレーニング --- */}
        <section style={{ paddingBottom: '24px' }}>
          <div
            className="neo-label"
            style={{
              backgroundColor: '#FFDE00',
              transform: 'rotate(1deg)',
              marginBottom: '16px',
            }}
          >
            日常トレーニング
          </div>
          <div className="neo-card">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '24px',
              }}
            >
              <Zap fill="#7000FF" color="#7000FF" size={28} />
              <h3 style={{ fontSize: '18px', fontWeight: '900' }}>
                今日からチャレンジ！
              </h3>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {jobDetails.howToBecome?.map((step, i) => (
                <div
                  key={i}
                  className="mission-item"
                  style={{
                    backgroundColor: '#f8fafc',
                    boxShadow: '4px 4px 0px black',
                  }}
                >
                  <div
                    className="step-badge"
                    style={{
                      backgroundColor: '#7000FF',
                      height: '24px',
                      width: 'auto',
                      padding: '0 8px',
                    }}
                  >
                    STEP {i + 1}
                  </div>
                  <p style={{ fontSize: '13px', fontWeight: '700' }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* フローティング操作ボタン */}
      <div className="floating-controls">
        <button
          onClick={() => setIsAutoScrolling(!isAutoScrolling)}
          className="neo-btn control-btn"
          style={{
            backgroundColor: isAutoScrolling ? '#FF00E5' : 'white',
            color: isAutoScrolling ? 'white' : 'black',
          }}
        >
          {isAutoScrolling ? (
            <Pause size={24} />
          ) : (
            <Play size={24} style={{ marginLeft: '4px' }} />
          )}
        </button>
        <button onClick={scrollToTop} className="neo-btn control-btn">
          <ChevronUp size={28} />
        </button>
      </div>

      {/* 固定フッター */}
      <footer className="result-footer">
        <button onClick={() => setShowFlow(true)} className="neo-btn btn-main">
          <ClipboardList size={22} /> 制作の流れ
        </button>
        <button
          onClick={onReset}
          className="neo-btn control-btn"
          style={{ width: '64px', height: '64px' }}
        >
          <RefreshCcw size={28} />
        </button>
      </footer>

      {/* モーダル */}
      <AnimatePresence>
        {showFlow && <WorkflowModal onClose={() => setShowFlow(false)} />}
      </AnimatePresence>
    </div>
  );
};

const WorkflowModal = ({ onClose }) => {
  const steps = [
    {
      title: '企画・ヒアリング',
      desc: 'クライアントの悩みを聞き、解決策を考えます。',
    },
    {
      title: '設計・構成',
      desc: 'サイトの地図を作り、使いやすさを追求します。',
    },
    { title: 'デザイン制作', desc: '見た目や空気感を色とカタチで表現します。' },
    {
      title: '実装・コーディング',
      desc: 'プログラムを書いて、ブラウザで動かします。',
    },
    { title: '公開・運用', desc: '世界中に公開し、さらに使いやすく育てます。' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        backgroundColor: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="neo-card"
        style={{
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          backgroundColor: '#FFDE00',
          padding: 0,
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'black',
            color: 'white',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontWeight: '900',
              fontStyle: 'italic',
              textTransform: 'uppercase',
            }}
          >
            制作の流れ
          </span>
          <button
            onClick={onClose}
            className="neo-btn"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              boxShadow: 'none',
            }}
          >
            <X size={24} />
          </button>
        </div>
        <div style={{ padding: '24px' }}>
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px',
                position: 'relative',
              }}
            >
              <div className="step-badge">{i + 1}</div>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontWeight: '900', marginBottom: '4px' }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: '13px', opacity: 0.8 }}>{s.desc}</p>
              </div>
            </div>
          ))}
          <button
            onClick={onClose}
            className="neo-btn"
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: 'black',
              color: 'white',
            }}
          >
            閉じる
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Result;
