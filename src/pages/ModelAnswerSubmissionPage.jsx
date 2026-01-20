import { useState } from 'react';
import ModelAnswerForm from '../components/ModelAnswerForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { analyzeAnswer } from '../utils/riskDetection';

const sampleQuestions = [
  'Explain what machine learning is and provide examples.',
  'Describe the difference between supervised and unsupervised learning.',
  'What is neural network and usage of it.how does it work?',
  'Explain the concept of overfitting in machine learning.',
];

export default function ModelAnswerSubmissionPage({ onNavigate, onSubmit }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFormSubmit = (formData) => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const analysis = analyzeAnswer(formData.modelAnswer, '');
      const modelAnswer = {
        id: `MODEL-${Date.now()}`,
        question: formData.question,
        modelAnswer: formData.modelAnswer,
        analysis,
        timestamp: new Date().toISOString(),
      };

      setIsAnalyzing(false);
      onSubmit(modelAnswer);
      onNavigate('teacher-dashboard');
    }, 1500);
  };

  if (isAnalyzing) {
    return (
      <div className="page-container">
        <LoadingSpinner message="Validating model answer for security and quality..." />
      </div>
    );
  }

  return (
    <div className="submission-page">
      <div className="submission-header">
        <button className="btn btn-secondary" onClick={() => onNavigate('teacher-dashboard')}>
          ← Back to Dashboard
        </button>
        <h1>Submit Model Answer</h1>
      </div>

      <div className="submission-container">
        <ModelAnswerForm questions={sampleQuestions} onSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}
