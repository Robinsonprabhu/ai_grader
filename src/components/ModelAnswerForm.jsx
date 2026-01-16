import { useState } from 'react';

export default function ModelAnswerForm({ onSubmit, questions }) {
  const [formData, setFormData] = useState({
    question: questions && questions.length > 0 ? questions[0] : '',
    modelAnswer: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.question && formData.modelAnswer) {
      onSubmit(formData);
      setFormData({
        question: questions && questions.length > 0 ? questions[0] : '',
        modelAnswer: '',
      });
    }
  };

  return (
    <form className="answer-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="question">Question</label>
        <select
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
        >
          {questions && questions.map((q, idx) => (
            <option key={idx} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="modelAnswer">Model Answer</label>
        <textarea
          id="modelAnswer"
          name="modelAnswer"
          value={formData.modelAnswer}
          onChange={handleChange}
          placeholder="Enter the correct/model answer here..."
          rows="6"
          required
        />
        <span className="char-count">{formData.modelAnswer.length} characters</span>
      </div>

      <button type="submit" className="btn btn-primary btn-large">
        Submit Model Answer
      </button>
    </form>
  );
}
