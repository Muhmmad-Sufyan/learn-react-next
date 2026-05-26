'use client'

import { useState, useCallback } from 'react'

export function useQuiz(questions) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [isCompleted, setIsCompleted] = useState(false)

  const selectedAnswer = selectedAnswers[currentIndex] ?? null
  const isAnswered = selectedAnswer !== null

  const score = Object.entries(selectedAnswers).filter(
    ([idx, ans]) => questions[Number(idx)]?.correctIndex === ans
  ).length

  const handleAnswer = useCallback(
    (answerIndex) => {
      if (isAnswered) return
      setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: answerIndex }))
    },
    [currentIndex, isAnswered]
  )

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }, [currentIndex, questions.length])

  const handleRestart = useCallback(() => {
    setCurrentIndex(0)
    setSelectedAnswers({})
    setIsCompleted(false)
  }, [])

  return {
    currentIndex,
    selectedAnswer,
    isAnswered,
    isCompleted,
    score,
    total: questions.length,
    handleAnswer,
    handleNext,
    handleRestart,
  }
}
