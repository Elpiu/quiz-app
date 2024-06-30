"use client"

import React, { useState, useEffect } from 'react';
import { useContainer } from "@/lib/core/hook/genericHookForBaseContainer";
import { MainDataContainer, MainData } from "@/lib/custom-container/MainDataContainer";
import { injectMainDataContainer } from "@/lib/config/ioc";
import Link from "next/link";

interface MainDataContainerMethods {
  getRandomQuestion: (howMany: number) => Question[];
}

interface Option {
  id_option: string;
  option: string;
}

interface Question {
  id_question: number;
  question: string;
  options: Option[];
  answer: {
    id_options: string[];
  };
}

interface QuizState {
  listQuestion: Question[];
  currentIndex: number;
  correctAnswers: number;
  wrongAnswers: number;
  skippedAnswers: number;
  wrongQuestions: Question[];
  skippedQuestions: Question[];
}

export default function RandQuiz() {
  const numberOfQuestions = 60;
  const { getRandomQuestion } = useContainer<MainData, any>(MainDataContainer, injectMainDataContainer);
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const questions = getRandomQuestion(numberOfQuestions);
    setQuizState({
      listQuestion: questions,
      currentIndex: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      skippedAnswers: 0,
      wrongQuestions: [],
      skippedQuestions: []
    });
  }, []);

  if (!quizState) return <div>Loading...</div>;

  const currentQuestion = quizState.listQuestion[quizState.currentIndex];
  const isQuizCompleted = quizState.currentIndex >= quizState.listQuestion.length;

  const loadNextQuestion = () => {
    setQuizState(prev => ({
      ...prev!,
      currentIndex: prev!.currentIndex + 1
    }));
    setSelectedAnswers([]);
    setIsAnswered(false);
    setIsCorrect(null);
  };

  const onSelectAnswer = (id: string) => {
    setSelectedAnswers(prev => {
      if (prev.includes(id)) {
        return prev.filter(answerId => answerId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleAnswer = () => {
    if (!isAnswered) {
      const correct = JSON.stringify(selectedAnswers.sort()) === JSON.stringify(currentQuestion.answer.id_options.sort());
      setIsCorrect(correct);
      setQuizState(prev => ({
        ...prev!,
        correctAnswers: correct ? prev!.correctAnswers + 1 : prev!.correctAnswers,
        wrongAnswers: !correct ? prev!.wrongAnswers + 1 : prev!.wrongAnswers,
        wrongQuestions: !correct ? [...prev!.wrongQuestions, currentQuestion] : prev!.wrongQuestions
      }));
      setIsAnswered(true);
    } else {
      loadNextQuestion();
    }
  };

  const handleSkip = () => {
    setQuizState(prev => ({
      ...prev!,
      skippedAnswers: prev!.skippedAnswers + 1,
      skippedQuestions: [...prev!.skippedQuestions, currentQuestion]
    }));
    loadNextQuestion();
  };

  if (isQuizCompleted) {
    return (
      <ScoreQuiz
        correctAnswers={quizState.correctAnswers}
        wrongAnswers={quizState.wrongAnswers}
        skippedAnswers={quizState.skippedAnswers}
        wrongQuestions={quizState.wrongQuestions}
        skippedQuestions={quizState.skippedQuestions}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="prose pb-5">
        <h1>Question {quizState.currentIndex + 1}/{quizState.listQuestion.length}</h1>
      </div>

      <CardQuestion
        question={currentQuestion}
        selectedAnswers={selectedAnswers}
        onSelectAnswer={onSelectAnswer}
        isMultipleChoice={currentQuestion.answer.id_options.length > 1}
        isAnswered={isAnswered}
        isCorrect={isCorrect}
      />
      <div className="mt-4 space-x-4">
        <button
          className="btn btn-primary"
          onClick={handleAnswer}
          disabled={selectedAnswers.length === 0}
        >
          {isAnswered ? "Next Question" : "Confirm Answer"}
        </button>
        {!isAnswered && (
          <button
            className="btn btn-secondary"
            onClick={handleSkip}
          >
            Skip Question
          </button>
        )}
      </div>
      <div className="mt-4">
        Correct: {quizState.correctAnswers} | Wrong: {quizState.wrongAnswers} | Skipped: {quizState.skippedAnswers}
      </div>
    </div>
  );
}

interface CardQuestionProps {
  question: Question;
  selectedAnswers: string[];
  onSelectAnswer: (id: string) => void;
  isMultipleChoice: boolean;
  isAnswered: boolean;
  isCorrect: boolean | null;
}

function CardQuestion({ question, selectedAnswers, onSelectAnswer, isMultipleChoice, isAnswered, isCorrect }: CardQuestionProps) {
  return (
    <div className="card bg-primary text-primary-content w-4/5 max-w-4xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">{question.question}</h2>
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id_option}
              className={`btn w-full text-lg py-3 h-auto ${
                selectedAnswers.includes(option.id_option) ? 'btn-secondary' : 'bg-gray-200'
              } ${
                isAnswered && question.answer.id_options.includes(option.id_option) ? 'border-red-500 border-4' : ''
              }`}
              onClick={() => !isAnswered && onSelectAnswer(option.id_option)}
              //disabled={isAnswered}
            >
              {option.option}
            </button>
          ))}
        </div>
        {isAnswered && (
          <div className={`mt-4 p-3 rounded text-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect. The correct answer(s) are highlighted.'}
          </div>
        )}
        {isMultipleChoice && !isAnswered && (
          <div className="mt-3 p-2 bg-yellow-100 text-yellow-800 rounded text-center font-semibold">
            Multiple answers allowed for this question
          </div>
        )}
      </div>
    </div>
  );
}

interface ScoreQuizProps {
  correctAnswers: number;
  wrongAnswers: number;
  skippedAnswers: number;
  wrongQuestions: Question[];
  skippedQuestions: Question[];
}

function ScoreQuiz({ correctAnswers, wrongAnswers, skippedAnswers, wrongQuestions, skippedQuestions }: ScoreQuizProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-5">
        <div className="card bg-white shadow-xl w-4/5 max-w-4xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Quiz Completed!</h2>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Correct Answers</div>
                <div className="stat-value text-success">{correctAnswers}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Wrong Answers</div>
                <div className="stat-value text-error">{wrongAnswers}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Skipped Questions</div>
                <div className="stat-value text-warning">{skippedAnswers}</div>
              </div>
            </div>
            {wrongQuestions.length > 0 && (
              <QuestionList title="Incorrect Answers" questions={wrongQuestions}/>
            )}
            {skippedQuestions.length > 0 && (
              <QuestionList title="Skipped Questions" questions={skippedQuestions}/>
            )}
          </div>
        </div>
        <div className="py-5 prose text-center ">
          <Link href="/" className="btn btn-primary">Back to Home!</Link>
        </div>
      </div>


    </>

  );
}

interface QuestionListProps {
  title: string;
  questions: Question[];
}

function QuestionList({title, questions}: QuestionListProps) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">{title}:</h3>
      {questions.map((q, index) => (
        <div key={q.id_question} className="mb-4 p-4 bg-base-200 rounded-lg">
          <p className="font-semibold">{index + 1}. {q.question}</p>
          <p className="mt-2">Correct answer(s):</p>
          <ul className="list-disc list-inside">
            {q.options
              .filter(opt => q.answer.id_options.includes(opt.id_option))
              .map(opt => (
                <li key={opt.id_option}>{opt.option}</li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}