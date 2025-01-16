'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import QuestionComponent from '@/components/QuestionComponent';

const questions = [
  {
    textoPergunta: "Quanto é 1 + 1?",
    opcoesPergunta: ["2", "3", "4", "5"],
    respostaCorreta: "2",
  },
  {
    textoPergunta: "Quanto é 1 + 3?",
    opcoesPergunta: ["15", "20", "4", "55"],
    respostaCorreta: "4",
  },
];

const Question = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  return (
    <div>
      <h1>Simulado {type === 'padrao' ? 'Padrão' : 'Rápido'}</h1>
      <QuestionComponent
        question={questions[currentQuestionIndex]}
        onNext={handleNext}
        onPrevious={handlePrevious}
        selectedOption={answers[currentQuestionIndex]}
        onAnswerChange={handleAnswerChange}
      />
    </div>
  );
};

export default Question;
