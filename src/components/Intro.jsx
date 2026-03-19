import { motion } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';

const Intro = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="intro-container"
    >
      {/* メインビジュアル */}
      <motion.div
        animate={{ y: [-5, -10, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="main-visual-wrapper"
      >
        <h1>
          <img
            src="/images/main-visual.png"
            alt="AIが判定！Web才能発見 適職診断"
            className="main-visual-img"
          />
        </h1>
      </motion.div>

      {/* キャッチコピー */}
      <div className="text-content-group">
        <div className="question-badge">
          <Zap size={20} fill="#FFDE00" strokeWidth={3} />
          <p>10個の質問で</p>
          <Zap size={20} fill="#FFDE00" strokeWidth={3} />
        </div>

        <h2 className="intro-title">
          <span className="talent-highlight">「Webの才能」</span> を暴き出す！
        </h2>

        <p className="time-hint"># 所要時間：約3分</p>
      </div>

      <button onClick={onStart} className="neo-btn btn-start">
        診断スタート！
        <ArrowRight size={32} strokeWidth={3} />
      </button>

      <p className="powered-text">Powered by Gemini AI</p>
    </motion.div>
  );
};

export default Intro;
