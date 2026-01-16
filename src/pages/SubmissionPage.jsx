import { useState } from 'react';
import AnswerForm from '../components/AnswerForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { analyzeAnswer } from '../utils/riskDetection';

const sampleQuestions = [
  'Explain what machine learning is and provide examples.',
  'Describe the difference between supervised and unsupervised learning.',
  'What is neural network and how does it work?',
  'Explain the concept of overfitting in machine learning.',
];

export default function SubmissionPage({ onNavigate, onSubmit }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFormSubmit = (formData) => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const analysis = analyzeAnswer(formData.answer, '');
      const submission = {
        id: `SUB-${Date.now()}`,
        question: formData.question,
        answer: formData.answer,
        analysis,
        timestamp: new Date().toISOString(),
      };

      setIsAnalyzing(false);
      onSubmit(submission);
      onNavigate('shadow-validation', { submission });
    }, 1500);
  };

  if (isAnalyzing) {
    return (
      <div className="page-container">
        <LoadingSpinner message="Analyzing your answer with AI safety checks..." />
      </div>
    );
  }

  return (
    <div className="submission-page">
      <div className="submission-header">
        <button className="btn btn-secondary" onClick={() => onNavigate('student-dashboard')}>
          ← Back to Dashboard
        </button>
        <h1>Submit Answer</h1>
      </div>

      <div className="submission-container">
        <AnswerForm questions={sampleQuestions} onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}
