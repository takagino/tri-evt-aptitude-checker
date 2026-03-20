import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import Intro from './components/Intro';
import Chat from './components/Chat';
import Result from './components/Result';
import { jobData } from './data/jobData';
import './App.css';

// デバッグ用フラグ
const IS_DEBUG = false;

const MOCK_RESULT = {
  ...jobData[0],
  aiReason: '君の回答からは、細部への並々ならぬこだわりが感じられたよ！',
  scores: {
    planning: 80,
    creative: 100,
    technical: 40,
    analysis: 90,
    communication: 70,
  },
};

function App() {
  const [step, setStep] = useState(IS_DEBUG ? 'result' : 'intro');
  const [diagnosisResult, setDiagnosisResult] = useState(
    IS_DEBUG ? MOCK_RESULT : null,
  );

  const handleStart = () => setStep('chat');

  const handleFinish = useCallback((aiData) => {
    const jobDetails = jobData.find((j) => j.id === Number(aiData.job_id));
    if (jobDetails) {
      setDiagnosisResult({
        ...jobDetails,
        aiReason: aiData.aiReason,
        scores: aiData.scores,
      });
      setStep('result');
    }
  }, []);

  const handleReset = () => {
    setDiagnosisResult(null);
    setStep('intro');
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
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
