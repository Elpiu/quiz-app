"use client"

import React, {useState} from 'react';
import {useParams, useRouter} from "next/navigation";
import {useCtxQuestionsContextForGetChapter} from "../../../../../context/CtxQuestions";

// Utility function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function QuizPage() {

  const params = useParams()
  const id = params.id;

  if(!id){
    throw new Error("Id must be present");
  }
  let chapter: Chapter | undefined = useCtxQuestionsContextForGetChapter(params.id[0]);

  const [questions, setQuestions] = useState(chapter?.questions || []);
  const [showHint, setShowHint] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string[]>>({});
  

  const handleOptionChange = (questionId: number, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: prev[questionId] ? [...prev[questionId], optionId] : [optionId],
    }));
  };

  const handleValidate = (question: Question) => {
    const userAnswers = selectedOptions[question.id_question] || [];
    const correctAnswers = question.answer?.id_options || [];
    if (userAnswers.sort().join() === correctAnswers.sort().join()) {
      alert("Correct!");
    } else {
      alert("Incorrect. Try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="bg-primary text-primary-content p-4 rounded-lg">
        <h1 className="text-2xl font-bold">{chapter?.chapterName}</h1>
        <p className="text-lg">Number of Questions: {chapter?.questions.length}</p>
      </header>


      <div className="mt-4 space-y-4">
        {questions.map((question, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold">{question.question}</h2>
            <div className="mt-2 space-y-2">
              {question.options.map((option) => (
                <label key={option.id_option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question-${question.id_question}`}
                    value={option.id_option}
                    onChange={() => handleOptionChange(question.id_question, option.id_option)}
                  />
                  <span>{option.option}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                className="btn btn-sm btn-info"
                onClick={() => setShowHint((prev) => !prev)}
              >
                {showHint ? "Hide Hint" : "Show Hint"}
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={() => handleValidate(question)}
              >
                Validate
              </button>
            </div>
            {showHint && question.answer && (
              <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                <p className="text-gray-700">{question.answer.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

}