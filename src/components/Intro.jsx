import { motion } from 'motion/react';
import { ArrowRight, Zap } from 'lucide-react';

const Intro = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="intro-container"
    >
      <motion.div
        animate={{ y: [-10, 0, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="main-visual-wrapper"
      >
        <h1>
          <img
            src="/images/main-visual.png"
            alt="Web才能発見 適職診断"
            className="main-visual-img"
          />
        </h1>
      </motion.div>

      <div className="text-content-group">
        <div className="question-badge">
          <Zap size={20} fill="#FFDE00" strokeWidth={3} />
          <p>10個の質問で暴き出す</p>
          <Zap size={20} fill="#FFDE00" strokeWidth={3} />
        </div>
        <h2 className="intro-title">
          <span className="talent-highlight">「Webの才能」</span>
        </h2>
        <p className="time-hint"># 所要時間：約3分</p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05, x: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="neo-btn btn-start"
      >
        診断スタート！
        <ArrowRight size={32} strokeWidth={4} />
      </motion.button>

      <p className="powered-text">Powered by Gemini 2.0 Flash</p>
    </motion.div>
  );
};

export default Intro;
