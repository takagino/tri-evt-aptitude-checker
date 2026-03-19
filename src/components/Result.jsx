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
  X,
  ArrowRightCircle,
  Globe,
  MonitorSmartphone,
  Cpu,
  Palette,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { jobData } from '../data/jobData';

const SCROLL_SPEED = 15;

// ==========================================
// ▼ サブコンテンツ（タブの中身）
// ==========================================

const TabWorld = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      textAlign: 'left',
      paddingBottom: '40px',
    }}
  >
    <div
      style={{
        padding: '16px',
        backgroundColor: '#000',
        color: '#fff',
        border: '4px solid #000',
        boxShadow: '8px 8px 0px 0px #FFDE00',
      }}
    >
      <h3
        style={{
          fontSize: '20px',
          fontWeight: '900',
          fontStyle: 'italic',
          marginBottom: '8px',
        }}
      >
        Webの技術は「画面の外」へ！
      </h3>
      <p style={{ fontSize: '14px', lineHeight: '1.6', fontWeight: 'bold' }}>
        Web＝ホームページを作るだけの技術ではありません。今、ブラウザを舞台に世界中が驚くような進化が起きています。
      </p>
    </div>

    <div className="neo-card" style={{ padding: '24px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
        }}
      >
        <Globe size={28} color="#7000FF" strokeWidth={3} />
        <h4 style={{ color: '#7000FF', fontSize: '20px', fontWeight: '900' }}>
          3D・メタバース空間
        </h4>
      </div>
      <p
        style={{
          fontSize: '14px',
          lineHeight: '1.8',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Blenderなどで作った3Dモデルを、WebGLという技術を使ってブラウザ上でグリグリ動かす！アプリをインストールさせなくても、URLひとつでゲームのような没入感のある世界へ招待できます。
      </p>
    </div>

    <div className="neo-card" style={{ padding: '24px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
        }}
      >
        <Cpu size={28} color="#FF5C00" strokeWidth={3} />
        <h4 style={{ color: '#FF5C00', fontSize: '20px', fontWeight: '900' }}>
          IoT（モノとWebを繋ぐ）
        </h4>
      </div>
      <p
        style={{
          fontSize: '14px',
          lineHeight: '1.8',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Arduinoなどの小さなコンピューターとWebを連携！ブラウザのボタンを押すと目の前のロボットが動いたり、センサーの反応を画面のオシャレなアニメーションに連動させたり、魔法みたいなモノづくりが可能です。
      </p>
    </div>

    <div className="neo-card" style={{ padding: '24px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
        }}
      >
        <MonitorSmartphone size={28} color="#00E0FF" strokeWidth={3} />
        <h4 style={{ color: '#00E0FF', fontSize: '20px', fontWeight: '900' }}>
          ユニバーサルなデザイン
        </h4>
      </div>
      <p
        style={{
          fontSize: '14px',
          lineHeight: '1.8',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        年齢や障がいの有無に関係なく、すべての人が快適に情報を受け取れる「Webアクセシビリティ」。デザインの力と最新のコードで、世界中の人を笑顔にする優しいシステムを作ります。
      </p>
    </div>
  </div>
);

const TabFuture = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      textAlign: 'left',
      paddingBottom: '40px',
    }}
  >
    <div
      className="neo-label"
      style={{
        backgroundColor: '#00FF94',
        fontSize: '16px',
        padding: '8px 16px',
        alignSelf: 'flex-start',
      }}
    >
      無限に広がるキャリアパス
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
      <div
        className="neo-card"
        style={{ padding: '20px', borderLeft: '16px solid #FF5C00' }}
      >
        <h4
          style={{ fontWeight: '900', fontSize: '18px', marginBottom: '4px' }}
        >
          制作会社（Webプロダクション）
        </h4>
        <p
          style={{
            fontSize: '13px',
            lineHeight: '1.6',
            fontWeight: 'bold',
            color: '#475569',
          }}
        >
          プロのクリエイターが集まるモノづくりの最前線。様々な企業のWebサイトやキャンペーン企画をチームで作り上げます。毎日違う刺激が欲しい人にぴったり！
        </p>
      </div>
      <div
        className="neo-card"
        style={{ padding: '20px', borderLeft: '16px solid #00E0FF' }}
      >
        <h4
          style={{ fontWeight: '900', fontSize: '18px', marginBottom: '4px' }}
        >
          自社開発・事業会社
        </h4>
        <p
          style={{
            fontSize: '13px',
            lineHeight: '1.6',
            fontWeight: 'bold',
            color: '#475569',
          }}
        >
          SNS、ECサイト、動画サービスなど、自社のサービスを企画から開発まで行います。ユーザーの反応をダイレクトに見ながら、じっくりサービスを育てていく達成感があります。
        </p>
      </div>
      <div
        className="neo-card"
        style={{ padding: '20px', borderLeft: '16px solid #FFDE00' }}
      >
        <h4
          style={{ fontWeight: '900', fontSize: '18px', marginBottom: '4px' }}
        >
          一般企業の広報・Web担当
        </h4>
        <p
          style={{
            fontSize: '13px',
            lineHeight: '1.6',
            fontWeight: 'bold',
            color: '#475569',
          }}
        >
          IT以外の企業（食品、アパレル、自動車など）でもWebの力は必須。社内のIT番長として、デジタル面から企業を支える重要なポジションです。
        </p>
      </div>
    </div>

    <div
      className="neo-card"
      style={{ padding: '24px', backgroundColor: '#000', color: '#fff' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
          borderBottom: '2px solid #333',
          paddingBottom: '12px',
        }}
      >
        <Briefcase size={24} color="#FFDE00" />
        <h4 style={{ fontWeight: '900', fontSize: '20px' }}>
          データで見るリアル
        </h4>
      </div>
      <ul
        style={{
          fontSize: '15px',
          fontWeight: 'bold',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          paddingLeft: '8px',
        }}
      >
        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>👨‍🎓</span>{' '}
          男女比はほぼ半々！性別問わず実力で輝ける世界。
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🏢</span>{' '}
          地元エリアの優良IT企業への就職実績も多数！
        </li>
        <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>💻</span>{' '}
          Notionなどの最新ツールを使いこなし、私服やリモートワークなど自由な働き方を実現する先輩が急増中。
        </li>
      </ul>
    </div>
  </div>
);

const TabLearn = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      textAlign: 'left',
      paddingBottom: '40px',
    }}
  >
    <div
      className="neo-card"
      style={{ padding: '24px', backgroundColor: '#FFDE00' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
        }}
      >
        <Zap size={28} fill="black" />
        <h4 style={{ fontWeight: '900', fontSize: '22px' }}>
          実践！企業プロジェクト
        </h4>
      </div>
      <p style={{ fontSize: '14px', lineHeight: '1.8', fontWeight: 'bold' }}>
        ただ教科書を読むだけじゃつまらない。実在するクライアント様から直接依頼を受け、学生チームでヒアリングからデザイン、公開まで全てを行う超・実践的な授業があります。「本物」を作る経験が、就職活動での最大の武器になります。
      </p>
    </div>

    <div className="neo-card" style={{ padding: '24px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
        }}
      >
        <Palette size={24} color="#FF00E5" strokeWidth={3} />
        <h4 style={{ fontWeight: '900', fontSize: '18px' }}>
          デザイン × プログラミング
        </h4>
      </div>
      <p
        style={{
          fontSize: '14px',
          lineHeight: '1.8',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        見た目を美しく作る「デザイン」と、それに命を吹き込み動かす「プログラミング」。両方の基礎をしっかり学ぶことで、アニメーションやアートなど、表現力豊かなクリエイティブを生み出せます。
      </p>
    </div>

    <div
      className="neo-card"
      style={{
        padding: '24px',
        backgroundColor: '#e2e8f0',
        boxShadow: '4px 4px 0px 0px #94a3b8',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px',
        }}
      >
        <GraduationCap size={24} color="#000" strokeWidth={3} />
        <h4 style={{ fontWeight: '900', fontSize: '18px' }}>
          一生モノの「社会人基礎力」
        </h4>
      </div>
      <p
        style={{
          fontSize: '14px',
          lineHeight: '1.8',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        パソコンのスキルだけではありません。自分のアイデアを伝えるプレゼン力、チームで協力するコミュニケーション力、企業研究など、社会に出てからずっと役立つチカラを徹底的に鍛えます。
      </p>
    </div>
  </div>
);

// ==========================================
// ▼ フルスクリーン情報モーダル
// ==========================================
const FullScreenInfoModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('world');

  // モーダル表示中は背面のスクロールを無効化する
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999, // 画面の最前面へ
        backgroundColor: '#e8edf2',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* モーダルヘッダー */}
      <div
        style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '4px solid #fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Zap size={24} fill="#FFDE00" color="#FFDE00" />
          <span
            style={{
              fontWeight: '900',
              fontSize: '20px',
              fontStyle: 'italic',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Explore Web World
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={32} strokeWidth={3} />
        </button>
      </div>

      {/* タブナビゲーション */}
      <div
        style={{
          display: 'flex',
          borderBottom: '6px solid black',
          backgroundColor: '#fff',
        }}
      >
        {[
          { id: 'world', label: '広がるWebの世界' },
          { id: 'learn', label: 'トライデントでの学び' },
          { id: 'future', label: '卒業後の自分' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '20px 8px',
              fontWeight: '900',
              fontSize: '15px',
              backgroundColor: activeTab === tab.id ? '#FFDE00' : 'transparent',
              border: 'none',
              borderRight: '4px solid black',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* タブコンテンツ（スクロール領域） */}
      <div
        className="custom-scrollbar"
        style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 80px 24px' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'world' && <TabWorld />}
            {activeTab === 'future' && <TabFuture />}
            {activeTab === 'learn' && <TabLearn />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 閉じるボタン（フッター固定） */}
      <div
        style={{
          padding: '16px',
          backgroundColor: '#fff',
          borderTop: '4px solid black',
        }}
      >
        <button
          onClick={onClose}
          className="neo-btn"
          style={{
            width: '100%',
            padding: '20px',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '20px',
          }}
        >
          診断結果に戻る
        </button>
      </div>
    </motion.div>
  );
};

// ==========================================
// ▼ Result 本体コンポーネント
// ==========================================

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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                paddingBottom: '8px',
                borderBottom: '2px solid black',
              }}
            >
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

        <hr className="section-divider" />

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
            <h3 style={{ fontSize: '18px', fontWeight: '900' }}>主な仕事</h3>
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

          <div className="neo-card" style={{ marginTop: '32px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                borderBottom: '2px solid black',
                paddingBottom: '8px',
                fontSize: '10px',
                textTransform: 'uppercase',
                fontWeight: '900',
                opacity: 0.5,
              }}
            >
              <Users size={16} strokeWidth={3} />
              <h3 style={{ fontSize: '18px', fontWeight: '900' }}>
                相性の良い職種
              </h3>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                textAlign: 'left',
              }}
            >
              {jobDetails.compatibility?.map((c, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '900',
                      color: '#FF5C00',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '4px',
                    }}
                  >
                    <ArrowRightCircle size={14} strokeWidth={3} /> {c.title}
                  </div>
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#64748b',
                      fontStyle: 'italic',
                      paddingLeft: '20px',
                      lineHeight: '1.6',
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
          <ClipboardList size={22} /> Webの世界をもっと知る
        </button>
        <button
          onClick={onReset}
          className="neo-btn control-btn"
          style={{ width: '64px', height: '64px' }}
        >
          <RefreshCcw size={28} />
        </button>
      </footer>

      {/* フルスクリーンモーダル */}
      <AnimatePresence>
        {showFlow && <FullScreenInfoModal onClose={() => setShowFlow(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default Result;
