<<<<<<< HEAD
import React, { useState, useEffect } from 'react';

interface MathQuizProps {
  day: number;
  onCorrect: () => void;
}

interface Question {
  a: number;
  b: number;
  operator: string;
  answer: number;
}

const generateQuestion = (day: number): Question => {
  // difficulty scales with day
  const maxNum = Math.min(5 + day * 3, 50);

  let operator = '+';
  if (day >= 3) {
    const ops = ['+', '-', '*'];
    operator = ops[Math.floor(Math.random() * (day >= 5 ? 3 : 2))];
  } else if (day >= 2) {
    operator = Math.random() > 0.5 ? '+' : '-';
  }

  const a = Math.floor(Math.random() * maxNum) + 1;
  const b = Math.floor(Math.random() * maxNum) + 1;

  let answer = 0;
  if (operator === '+') answer = a + b;
  if (operator === '-') answer = a - b;
  if (operator === '*') answer = a * b;

  return { a, b, operator, answer };
};

export const MathQuiz: React.FC<MathQuizProps> = ({ day, onCorrect }) => {
  const [question, setQuestion] = useState<Question>(() => generateQuestion(day));
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // generate new question when day changes
  useEffect(() => {
    setQuestion(generateQuestion(day));
    setInput('');
    setFeedback(null);
  }, [day]);

  const handleSubmit = () => {
    const userAnswer = parseInt(input);
    if (userAnswer === question.answer) {
      setFeedback('correct');
      onCorrect();
      setTimeout(() => {
        setQuestion(generateQuestion(day));
        setInput('');
        setFeedback(null);
      }, 800);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        setInput('');
      }, 800);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="bg-slate-800 border-2 border-slate-600 rounded-lg p-4 w-64">
      <div className="text-xs text-slate-400 mb-2 text-center">🧮 Solve for a coin!</div>

      {/* Question */}
      <div className="text-2xl font-bold text-white text-center mb-3">
        {question.a} {question.operator} {question.b} = ?
      </div>

      {/* Input */}
      <input
        type="number"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Your answer"
        className="w-full bg-slate-700 text-white text-center rounded-lg px-3 py-2 text-lg border-2 border-slate-500 focus:border-blue-400 outline-none mb-2"
      />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-1.5 rounded-lg border-2 border-green-500 transition-all duration-200 text-sm"
      >
        Submit
      </button>

      {/* Feedback */}
      {feedback === 'correct' && (
        <div className="text-center text-green-400 font-bold mt-2 animate-pulse">✅ +1 Coin!</div>
      )}
      {feedback === 'wrong' && (
        <div className="text-center text-red-400 font-bold mt-2 animate-pulse">❌ Wrong!</div>
      )}
    </div>
  );
=======
import React, { useState, useEffect } from 'react';

interface MathQuizProps {
  day: number;
  onCorrect: () => void;
}

interface Question {
  a: number;
  b: number;
  operator: string;
  answer: number;
}

const generateQuestion = (day: number): Question => {
  // difficulty scales with day
  const maxNum = Math.min(5 + day * 3, 50);

  let operator = '+';
  if (day >= 3) {
    const ops = ['+', '-', '*'];
    operator = ops[Math.floor(Math.random() * (day >= 5 ? 3 : 2))];
  } else if (day >= 2) {
    operator = Math.random() > 0.5 ? '+' : '-';
  }

  const a = Math.floor(Math.random() * maxNum) + 1;
  const b = Math.floor(Math.random() * maxNum) + 1;

  let answer = 0;
  if (operator === '+') answer = a + b;
  if (operator === '-') answer = a - b;
  if (operator === '*') answer = a * b;

  return { a, b, operator, answer };
};

export const MathQuiz: React.FC<MathQuizProps> = ({ day, onCorrect }) => {
  const [question, setQuestion] = useState<Question>(() => generateQuestion(day));
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  // generate new question when day changes
  useEffect(() => {
    setQuestion(generateQuestion(day));
    setInput('');
    setFeedback(null);
  }, [day]);

  const handleSubmit = () => {
    const userAnswer = parseInt(input);
    if (userAnswer === question.answer) {
      setFeedback('correct');
      onCorrect();
      setTimeout(() => {
        setQuestion(generateQuestion(day));
        setInput('');
        setFeedback(null);
      }, 800);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        setInput('');
      }, 800);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="bg-slate-800 border-2 border-slate-600 rounded-lg p-4 w-64">
      <div className="text-xs text-slate-400 mb-2 text-center">🧮 Solve for a coin!</div>

      {/* Question */}
      <div className="text-2xl font-bold text-white text-center mb-3">
        {question.a} {question.operator} {question.b} = ?
      </div>

      {/* Input */}
      <input
        type="number"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Your answer"
        className="w-full bg-slate-700 text-white text-center rounded-lg px-3 py-2 text-lg border-2 border-slate-500 focus:border-blue-400 outline-none mb-2"
      />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-1.5 rounded-lg border-2 border-green-500 transition-all duration-200 text-sm"
      >
        Submit
      </button>

      {/* Feedback */}
      {feedback === 'correct' && (
        <div className="text-center text-green-400 font-bold mt-2 animate-pulse">✅ +1 Coin!</div>
      )}
      {feedback === 'wrong' && (
        <div className="text-center text-red-400 font-bold mt-2 animate-pulse">❌ Wrong!</div>
      )}
    </div>
  );
>>>>>>> eb30028916e28f64c0980fac1a0791b6b792021d
};