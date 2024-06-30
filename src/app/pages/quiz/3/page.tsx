"use client"

import React, { useState } from 'react';
import { useContainer } from "@/lib/core/hook/genericHookForBaseContainer";
import { MainDataContainer } from "@/lib/custom-container/MainDataContainer";
import { injectMainDataContainer } from "@/lib/config/ioc";


export default function QuizPage() {


  const { getChapter } = useContainer<MainDataContainer, any>(MainDataContainer, injectMainDataContainer);
  const chapter = getChapter(3);
  const [score, setScore] = useState(0);

  const handleQuestionValidate = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="bg-primary text-primary-content p-4 rounded-lg mb-4">
        <h1 className="text-2xl font-bold">{chapter?.chapterName}</h1>
        <p className="text-lg">Numero di Domande: {chapter?.questions.length}</p>
        <p className="text-lg">Punteggio: {score}/{chapter?.questions.length}</p>
      </header>

      <div className="space-y-4">
        {chapter.questions.map((question: Question) => (
          <QuestionCard
            key={question.id_question}
            question={question}
            onValidate={handleQuestionValidate}
          />
        ))}
      </div>
    </div>
  );
}

type QuestionCardProps = {
  question: Question,
  onValidate: (isCorrect: boolean) => void;
}

const QuestionCard = ({ question, onValidate }: QuestionCardProps) => {
  const [showHint, setShowHint] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleValidate = () => {
    const isAnswerCorrect = question.answer?.id_options.includes(selectedOption);
    if(isAnswerCorrect) {
      setIsCorrect(isAnswerCorrect);
      onValidate(isAnswerCorrect);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{question.question}</h2>
      <div className="space-y-2 mb-4">
        {question.options.map((option: Option) => (
          <label key={option.id_option} className="flex items-center space-x-2">
            <input
              type="radio"
              name={`question-${question.id_question}`}
              value={option.id_option}
              checked={selectedOption === option.id_option}
              onChange={() => handleOptionChange(option.id_option)}
            />
            <span>{option.option}</span>
          </label>
        ))}
      </div>
      <div className="flex space-x-2 mb-2">
        <button
          className="btn btn-sm btn-info"
          onClick={() => setShowHint((prev) => !prev)}
        >
          {showHint ? "Nascondi Suggerimento" : "Mostra Suggerimento"}
        </button>
        <button
          className="btn btn-sm btn-success"
          onClick={handleValidate}
          disabled={!selectedOption}
        >
          Valida
        </button>
      </div>
      {showHint && question.answer && (
        <div className="p-2 bg-gray-100 rounded-lg">
          <p className="text-gray-700">{question.answer.explanation}</p>
        </div>
      )}
      {isCorrect !== null && (
        <div className={`mt-2 p-2 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isCorrect ? 'Corretto!' : 'Sbagliato. Riprova.'}
        </div>
      )}
    </div>
  );
};
