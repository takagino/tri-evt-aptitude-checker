import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RefreshCcw,
  ClipboardList,
  Zap,
  Users,
  Star,
  BookOpen,
  ChevronUp,
  Play,
  Pause,
  ArrowRightCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import FullScreenInfoModal from './FullScreenInfoModal';

/**
 * 才能分析スコアの1行分
 */
const StatBar = ({ label, value, color }) => (
  <div style={{ marginBottom: '16px' }}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '13px',
        fontWeight: '900',
        marginBottom: '4px',
      }}
    >
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div
      className="stat-bar-container"
      style={{
        border: '3px solid black',
        height: '18px',
        backgroundColor: 'white',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
        style={{
          height: '100%',
          backgroundColor: color,
          borderRight: value > 0 ? '3px solid black' : 'none',
        }}
      />
    </div>
  </div>
);

/**
 * 仕事内容やトレーニングの1項目分
 * variant: 'circle' (デフォルト) or 'rect' (STEP用)
 */
const MissionItem = ({
  index,
  title,
  description,
  badgeText,
  variant = 'circle',
  customStyle = {},
}) => (
  <div
    className="mission-item neo-card"
    style={{
      display: 'flex',
      gap: '16px',
      padding: '16px',
      backgroundColor: '#f8fafc',
      alignItems: 'flex-start',
      ...customStyle,
    }}
  >
    <div
      className="step-badge"
      style={{
        backgroundColor: variant === 'rect' ? '#7000FF' : 'black',
        color: 'white',
        minWidth: variant === 'rect' ? '80px' : '32px',
        height: '32px',
        borderRadius: variant === 'rect' ? '4px' : '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '900',
        fontSize: variant === 'rect' ? '12px' : '14px',
        flexShrink: 0,
        border: '2px solid black',
      }}
    >
      {badgeText || index + 1}
    </div>
    <div>
      {title && (
        <h4 style={{ fontWeight: '900', fontSize: '16px' }}>{title}</h4>
      )}
      <p
        style={{
          fontSize: '13px',
          marginTop: '4px',
          color: '#1e293b',
          lineHeight: '1.6',
          fontWeight: 'bold',
        }}
      >
        {description}
      </p>
    </div>
  </div>
);

const Result = ({ result, onReset }) => {
  const [showModal, setShowModal] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FFDE00', '#00E0FF', '#FF00E5', '#00FF94'],
    });
  }, []);

  useEffect(() => {
    let requestRef;
    const scroll = () => {
      if (scrollRef.current && isAutoScrolling) {
        scrollRef.current.scrollTop += 0.8;
        if (
          scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
          scrollRef.current.scrollHeight - 1
        ) {
          setIsAutoScrolling(false);
        }
      }
      requestRef = requestAnimationFrame(scroll);
    };
    requestRef = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(requestRef);
  }, [isAutoScrolling]);

  const stats = [
    { label: '企画・設計', key: 'planning', color: '#00E0FF' },
    { label: '表現・感性', key: 'creative', color: '#FF00E5' },
    { label: '論理・構築', key: 'technical', color: '#7000FF' },
    { label: '共感・分析', key: 'analysis', color: '#00FF94' },
    { label: '伝える力', key: 'communication', color: '#FF5C00' },
  ];

  return (
    <div className="result-page">
      <header className="result-header">
        <div className="chat-status-group">
          <Star size={18} fill="black" />
          <span className="chat-status-text">DIAGNOSTIC REPORT</span>
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
        {/* --- SECTION 1: メイン結果 --- */}
        <section
          style={{
            textAlign: 'center',
            marginBottom: '48px',
            padding: '20px 16px',
          }}
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            className="neo-card"
            style={{
              display: 'inline-block',
              padding: '20px',
              backgroundColor: 'white',
            }}
          >
            <img
              src={`/images/${result.imagePath}`}
              style={{ width: '220px', height: '220px', objectFit: 'contain' }}
              alt={result.title}
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
              {result.title}
            </h1>
            <div
              className="neo-label"
              style={{
                backgroundColor: 'black',
                color: '#00FF94',
                transform: 'rotate(-1deg)',
                marginTop: '8px',
              }}
            >
              {result.catchcopy}
            </div>
          </div>

          <div
            className="neo-card"
            style={{ marginTop: '32px', textAlign: 'left' }}
          >
            <h3
              style={{
                fontWeight: '900',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '3px solid black',
                paddingBottom: '8px',
              }}
            >
              <Zap size={20} fill="black" /> 才能分析レポート
            </h3>
            {stats.map((s) => (
              <StatBar
                key={s.key}
                label={s.label}
                value={result.scores?.[s.key] || 0}
                color={s.color}
              />
            ))}
          </div>

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
                fontWeight: '900',
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

        <hr className="section-divider" />

        {/* --- SECTION 2: 職業詳細・主な仕事 --- */}
        <section style={{ marginBottom: '48px', padding: '0 16px' }}>
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
              style={{
                fontSize: '14px',
                lineHeight: '1.8',
                fontWeight: 'bold',
                textAlign: 'left',
                color: '#1e293b',
              }}
            >
              {result.description}
            </p>
          </div>

          <h3
            style={{
              fontSize: '18px',
              fontWeight: '900',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <BookOpen size={20} color="#FF00E5" strokeWidth={3} /> 主な仕事内容
          </h3>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {result.responsibilities?.map((r, i) => (
              <MissionItem
                key={i}
                index={i}
                title={r.title}
                description={r.description}
              />
            ))}
          </div>

          <div
            className="neo-card"
            style={{ marginTop: '32px', backgroundColor: '#f1f5f9' }}
          >
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '900',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '2px solid black',
                paddingBottom: '8px',
              }}
            >
              <Users size={20} strokeWidth={3} /> 相性の良い職種
            </h3>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {result.compatibility?.map((c, i) => (
                <div key={i} style={{ textAlign: 'left' }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '900',
                      color: '#FF5C00',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <ArrowRightCircle size={16} strokeWidth={3} /> {c.title}
                  </div>
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#64748b',
                      fontStyle: 'italic',
                      paddingLeft: '22px',
                      marginTop: '4px',
                      lineHeight: '1.5',
                      fontWeight: 'bold',
                    }}
                  >
                    {c.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="section-divider" />

        {/* --- SECTION 3: 日常トレーニング --- */}
        <section
          style={{
            paddingBottom: '40px',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
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
          <div className="neo-card" style={{ backgroundColor: 'white' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '900',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Zap fill="#7000FF" color="#7000FF" size={24} />{' '}
              今日からチャレンジ！
            </h3>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {result.howToBecome?.map((step, i) => (
                <MissionItem
                  key={i}
                  index={i}
                  variant="rect"
                  badgeText={`STEP ${i + 1}`}
                  title=""
                  description={step}
                  customStyle={{ boxShadow: '6px 6px 0px black' }}
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* フローティングコントロール */}
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
        <button
          onClick={() =>
            scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
          }
          className="neo-btn control-btn"
        >
          <ChevronUp size={28} />
        </button>
      </div>

      <footer className="result-footer">
        <button onClick={() => setShowModal(true)} className="neo-btn btn-main">
          <ClipboardList size={22} /> 学科について知る
        </button>
        <button
          onClick={onReset}
          className="neo-btn control-btn"
          style={{ width: '64px' }}
        >
          <RefreshCcw size={28} />
        </button>
      </footer>

      <AnimatePresence>
        {showModal && (
          <FullScreenInfoModal onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Result;
