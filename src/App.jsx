import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Intro from './components/Intro';
import Chat from './components/Chat';
import Result from './components/Result';
import { jobData } from './data/jobData';
import './App.css';

const MOCK_RESULT = {
  ...jobData.find((j) => j.id === 1),
  aiReason:
    '君の回答からは、細部への並々ならぬこだわりと、使う人への深い思いやりが感じられたよ！それはWebの世界では「最高のユーザー体験」を創り出す武器になる。チームを支え、画面の向こうの誰かを笑顔にするデザイナーとして活躍する姿が目に浮かぶよ！',
  scores: {
    planning: 80,
    creative: 100,
    technical: 40,
    analysis: 90,
    communication: 70,
  },
};

function App() {
  // 本番用
  // const [step, setStep] = useState('intro');
  // const [diagnosisResult, setDiagnosisResult] = useState(null);

  // デバッグ用
  const [step, setStep] = useState('result');
  const [diagnosisResult, setDiagnosisResult] = useState(MOCK_RESULT);

  const handleStart = () => setStep('chat');
  const handleFinish = (aiData) => {
    const jobDetails = jobData.find((j) => j.id === Number(aiData.job_id));
    if (jobDetails) {
      setDiagnosisResult({
        ...jobDetails,
        aiReason: aiData.aiReason,
        scores: aiData.scores,
      });
      setStep('result');
    }
  };

  return (
    <div className="app-container">
      <div className={`diagnosis-card ${step === 'intro' ? 'is-intro' : ''}`}>
        <AnimatePresence mode="wait">
          {step === 'intro' && <Intro key="intro" onStart={handleStart} />}
          {step === 'chat' && <Chat key="chat" onFinish={handleFinish} />}
          {step === 'result' && (
            <Result
              key="result"
              result={diagnosisResult}
              onReset={() => setStep('intro')}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
