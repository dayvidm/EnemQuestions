'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import QuestionComponent from '@/components/QuestionComponent';

const Question = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/test');
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

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

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

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