import { createContext, useContext, useState } from 'react'

const IdeaContext = createContext(null)

export const INDUSTRIES = [
  'Education & Learning',
  'Health & Wellness',
  'Finance & FinTech',
  'E-commerce & Retail',
  'Productivity & Tools',
  'Travel & Hospitality',
  'Food & Nutrition',
  'Real Estate & PropTech',
  'Entertainment & Media',
  'Sustainability & CleanTech',
  'Social & Community',
  'AI & Machine Learning',
  'Logistics & Supply Chain',
  'HR & Recruitment',
  'Other',
]

const EMPTY_IDEA = {
  name: '',
  description: '',
  industry: '',
  problem: '',
  solution: '',
  audience: '',
}

export function IdeaProvider({ children }) {
  const [idea, setIdea] = useState(EMPTY_IDEA)

  const [mode, setMode] = useState('quick')

  // Stores the response received from the FastAPI backend
  const [analysisResult, setAnalysisResult] = useState(null)

  // Tracks backend submission status
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Stores submission errors
  const [submitError, setSubmitError] = useState('')

  function updateIdea(fields) {
    setIdea(prev => ({ ...prev, ...fields }))
  }

  function resetIdea() {
    setIdea(EMPTY_IDEA)
    setMode('quick')
    setAnalysisResult(null)
    setIsSubmitting(false)
    setSubmitError('')
  }

  return (
    <IdeaContext.Provider
      value={{
        idea,
        updateIdea,
        resetIdea,
        mode,
        setMode,
        analysisResult,
        setAnalysisResult,
        isSubmitting,
        setIsSubmitting,
        submitError,
        setSubmitError,
      }}
    >
      {children}
    </IdeaContext.Provider>
  )
}

export function useIdea() {
  const ctx = useContext(IdeaContext)

  if (!ctx) {
    throw new Error('useIdea must be used inside <IdeaProvider>')
  }

  return ctx
}