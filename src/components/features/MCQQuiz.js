'use client'

// WHY "use client":
// This component uses useState (via useQuiz), so it MUST be a Client Component.
// The parent concept page is a Server Component — we pass the questions as a prop.
// This is the correct pattern: fetch data server-side, render interaction client-side.

import { useQuiz } from '@/hooks/useQuiz'

export default function MCQQuiz({ questions }) {
  const {
    currentIndex,
    selectedAnswer,
    isAnswered,
    isCompleted,
    score,
    total,
    handleAnswer,
    handleNext,
    handleRestart,
  } = useQuiz(questions)

  if (isCompleted) {
    return <QuizResults score={score} total={total} onRestart={handleRestart} />
  }

  const question = questions[currentIndex]

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      {/* Progress bar */}
      <div className="h-1.5 bg-neutral-100">
        <div
          className="h-full bg-primary-600 transition-all duration-300"
          style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <div className="p-6 sm:p-8">
        {/* Question counter */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            Question {currentIndex + 1} of {total}
          </span>
          <span className="text-sm text-neutral-400">
            {score} correct so far
          </span>
        </div>

        {/* Question text */}
        <p className="font-heading font-semibold text-neutral-900 text-lg mb-6 leading-snug whitespace-pre-line">
          {question.question}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <AnswerOption
              key={index}
              text={option}
              index={index}
              isSelected={selectedAnswer === index}
              isCorrect={question.correctIndex === index}
              isAnswered={isAnswered}
              onSelect={() => handleAnswer(index)}
            />
          ))}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className={`mt-6 p-4 rounded-xl ${
            selectedAnswer === question.correctIndex
              ? 'bg-success-100 border border-green-200'
              : 'bg-error-100 border border-red-200'
          }`}>
            <p className={`text-sm font-semibold mb-1 ${
              selectedAnswer === question.correctIndex ? 'text-success-600' : 'text-error-600'
            }`}>
              {selectedAnswer === question.correctIndex ? '✓ Correct!' : '✗ Not quite'}
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        {/* Next button */}
        {isAnswered && (
          <button
            onClick={handleNext}
            className="mt-6 w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            {currentIndex < total - 1 ? 'Next Question →' : 'See Results'}
          </button>
        )}
      </div>
    </div>
  )
}

function AnswerOption({ text, index, isSelected, isCorrect, isAnswered, onSelect }) {
  let style = 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-300 hover:bg-primary-50 cursor-pointer'

  if (isAnswered) {
    if (isCorrect) {
      style = 'border-green-400 bg-success-100 text-success-600 cursor-default'
    } else if (isSelected) {
      style = 'border-red-400 bg-error-100 text-error-600 cursor-default'
    } else {
      style = 'border-neutral-200 bg-neutral-50 text-neutral-400 cursor-default'
    }
  } else if (isSelected) {
    style = 'border-primary-400 bg-primary-50 text-primary-700 cursor-pointer'
  }

  const letter = ['A', 'B', 'C', 'D'][index]

  return (
    <button
      onClick={onSelect}
      disabled={isAnswered}
      className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-150 ${style}`}
    >
      <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold mt-0.5 ${
        isAnswered && isCorrect ? 'bg-success-600 text-white'
        : isAnswered && isSelected ? 'bg-error-600 text-white'
        : isSelected ? 'bg-primary-600 text-white'
        : 'bg-neutral-100 text-neutral-500'
      }`}>
        {letter}
      </span>
      <span className="text-sm leading-relaxed">{text}</span>
    </button>
  )
}

function QuizResults({ score, total, onRestart }) {
  const percent = Math.round((score / total) * 100)
  const isGreat = percent >= 75

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl ${
        isGreat ? 'bg-success-100' : 'bg-accent-50'
      }`}>
        {isGreat ? '🎉' : '📚'}
      </div>

      <h3 className="font-heading font-bold text-2xl text-neutral-900 mb-2">
        {isGreat ? 'Great work!' : 'Keep practicing!'}
      </h3>

      <p className="text-neutral-500 mb-6">
        You got <span className={`font-bold ${isGreat ? 'text-success-600' : 'text-accent-600'}`}>{score} out of {total}</span> correct ({percent}%)
      </p>

      {/* Score bar */}
      <div className="h-3 bg-neutral-100 rounded-full mb-8 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${isGreat ? 'bg-success-600' : 'bg-accent-500'}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-sm text-neutral-500 mb-6">
        {isGreat
          ? 'You have a solid understanding. Move on to the next concept!'
          : 'Read through the concept again and focus on the explanations.'}
      </p>

      <button
        onClick={onRestart}
        className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}
