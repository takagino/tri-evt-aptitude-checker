import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, TrendingUp, Users, Building } from 'lucide-react';
import TabTimeline from './TabTimeline';
import TabDemographics from './TabDemographics';
import TabCareer from './TabCareer';

const FullScreenInfoModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('timeline');

  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('width(-1) and height(-1)')
      )
        return;
      originalWarn(...args);
    };

    document.body.style.overflow = 'hidden';
    return () => {
      console.warn = originalWarn;
      document.body.style.overflow = 'auto';
    };
  }, []);

  const tabs = [
    {
      id: 'timeline',
      label: 'なにを学ぶの？',
      icon: <TrendingUp size={20} />,
      component: <TabTimeline />,
    },
    {
      id: 'demographics',
      label: 'どんな学生がいるの？',
      icon: <Users size={20} />,
      component: <TabDemographics />,
    },
    {
      id: 'career',
      label: 'どこへ就職するの？',
      icon: <Building size={20} />,
      component: <TabCareer />,
    },
  ];

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="info-modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: '#e8edf2',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* モーダルヘッダー */}
      <header
        style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '16px 24px',
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
              fontSize: '18px',
              fontStyle: 'italic',
              letterSpacing: '1px',
            }}
          >
            ABOUT COURSE
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          <X size={32} strokeWidth={3} />
        </button>
      </header>

      {/* タブナビゲーション */}
      <nav
        style={{
          display: 'flex',
          borderBottom: '6px solid black',
          backgroundColor: '#fff',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '12px 4px',
              fontWeight: '900',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              border: 'none',
              borderRight: '4px solid black',
              backgroundColor: activeTab === tab.id ? '#FFDE00' : 'transparent',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.1s',
            }}
          >
            {tab.icon}
            <span
              style={{
                transform: activeTab === tab.id ? 'scale(1.05)' : 'none',
              }}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </nav>

      {/* コンテンツエリア */}
      <main
        className="custom-scrollbar"
        style={{ flex: 1, overflowY: 'auto', padding: '24px' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {tabs.find((t) => t.id === activeTab).component}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* フッター（閉じるボタン） */}
      <footer
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
            padding: '16px',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '18px',
          }}
        >
          診断結果に戻る
        </button>
      </footer>
    </motion.div>
  );
};

export default FullScreenInfoModal;
