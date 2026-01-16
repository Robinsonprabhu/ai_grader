import { useState } from 'react';

export default function AnswerForm({ onSubmit, questions }) {
  const [formData, setFormData] = useState({
    question: questions && questions.length > 0 ? questions[0] : '',
    answer: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.question && formData.answer) {
      onSubmit(formData);
      setFormData({
        question: questions && questions.length > 0 ? questions[0] : '',
        answer: '',
      });
    }
  };

  return (
    <form className="answer-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="question">Select Question</label>
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
        <label htmlFor="answer">Your Answer</label>
        <textarea
          id="answer"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          placeholder="Type your answer here..."
          rows="6"
          required
        />
        <span className="char-count">{formData.answer.length} characters</span>
      </div>

      <button type="submit" className="btn btn-primary btn-large">
        Submit Answer
      </button>
    </form>
  );
}
