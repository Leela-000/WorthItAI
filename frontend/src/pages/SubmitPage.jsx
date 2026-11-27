import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Lightbulb, ChevronDown, AlertCircle, CheckCircle,
  ArrowRight, Zap, BookOpen, Info, Eye, EyeOff,
} from 'lucide-react'
import { useIdea, INDUSTRIES } from '../data/IdeaContext'
import {
  validateQuickForm, validateGuidedForm,
  isFormValid, charCountStatus,
} from '../data/validation'

const STEPS = ['Describe Idea', 'Review Understanding', 'Market Research']

// Example idea shown to users
const EXAMPLE_IDEA = {
  name: 'FoodBridge',
  industry: 'Food & Nutrition',
  description: 'A platform that connects home cooks with people in their neighbourhood who want home-made food. Home cooks list what they\'re making today, and nearby buyers can order a portion — reducing food waste and creating income for cooks.',
  problem: 'Many people want healthy, home-cooked food but can\'t cook themselves, while home cooks often make too much and throw the excess away.',
  solution: 'A mobile app where home cooks list their daily meals and local buyers can discover and order them like a food delivery service.',
  audience: 'Working professionals aged 25–40 who value home-cooked meals, and home cooks (mostly homemakers) who want to earn extra income.',
}

function StepBar({ current }) {
  return (
    <div className="step-indicator" style={{ marginBottom: 32 }}>
      {STEPS.map((s, i) => (
        <div key={s} className="step-item" style={{ display: 'flex', alignItems: 'center' }}>
          <div className={`step-bubble ${i < current ? 'completed' : i === current ? 'active' : 'pending'}`}>
            {i < current ? <CheckCircle size={14} /> : i + 1}
          </div>

          <span
            className={`step-label ${i < current ? 'completed' : i === current ? 'active' : ''}`}
            style={{ marginLeft: 6 }}
          >
            {s}
          </span>

          {i < STEPS.length - 1 && (
            <div
              className={`step-connector ${i < current ? 'completed' : ''}`}
              style={{ margin: '0 10px' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function FieldError({ msg }) {
  if (!msg) return null

  return (
    <span className="form-error">
      <AlertCircle size={13} />
      {msg}
    </span>
  )
}

function CharCounter({ value, max }) {
  const { count, status } = charCountStatus(value, max)

  return (
    <span className={`char-count ${status !== 'ok' ? status : ''}`}>
      {count}/{max}
    </span>
  )
}

/* Example idea panel */
function ExamplePanel({ onUse }) {
  return (
    <div className="example-panel">
      <div className="example-panel__header">
        <Eye size={14} style={{ flexShrink: 0 }} />
        <strong>Example idea</strong>

        <span style={{
          fontWeight: 400,
          color: 'var(--color-muted)',
          marginLeft: 4
        }}>
          — click to fill the form with this example
        </span>
      </div>

      <div className="example-panel__body">
        <div className="example-panel__label">
          FoodBridge · Food & Nutrition
        </div>

        <p style={{
          fontSize: '0.875rem',
          margin: '6px 0 0',
          color: 'var(--color-text-light)'
        }}>
          {EXAMPLE_IDEA.description}
        </p>
      </div>

      <button
        type="button"
        className="btn btn--outline btn--sm"
        style={{ marginTop: 10, alignSelf: 'flex-start' }}
        onClick={onUse}
      >
        Use this example
      </button>
    </div>
  )
}

/* Quick form */
function QuickForm({
  values,
  errors,
  onChange,
  showExample,
  onToggleExample,
  onUseExample
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>

      {/* Idea name */}
      <div className="form-group">
        <label className="form-label">
          Startup Idea Name
          <span className="optional"> (optional)</span>
        </label>

        <input
          className={`form-input ${errors.name ? 'error' : ''}`}
          placeholder="e.g. AI Learning Path, FoodBridge, GreenRoute…"
          value={values.name}
          onChange={e => onChange('name', e.target.value)}
          maxLength={100}
        />

        <FieldError msg={errors.name} />
      </div>

      {/* Description */}
      <div className="form-group">
        <label className="form-label">
          Describe Your Idea
          <span style={{
            color: 'var(--color-error)',
            marginLeft: 2
          }}>
            *
          </span>
        </label>

        <textarea
          className={`form-textarea ${errors.description ? 'error' : ''}`}
          rows={5}
          placeholder="e.g. An AI-powered personalised learning platform for college students that creates custom study plans based on their goals, pace and schedule."
          value={values.description}
          onChange={e => onChange('description', e.target.value)}
          maxLength={2000}
        />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <FieldError msg={errors.description} />
          <CharCounter value={values.description} max={2000} />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 4
        }}>
          <span className="form-hint" style={{
            display: 'flex',
            gap: 5,
            alignItems: 'center'
          }}>
            <Lightbulb size={12} color="var(--color-teal)" />
            2–3 sentences is enough. Your idea doesn't need to be perfect.
          </span>

          <button
            type="button"
            className="btn btn--ghost btn--sm"
            style={{
              fontSize: '0.8125rem',
              gap: 5,
              padding: '4px 10px'
            }}
            onClick={onToggleExample}
          >
            {showExample ? <EyeOff size={12} /> : <Eye size={12} />}
            {showExample ? 'Hide example' : 'See an example'}
          </button>
        </div>

        {showExample && (
          <ExamplePanel
            onUse={() => {
              onUseExample()
              onToggleExample()
            }}
          />
        )}
      </div>

      {/* Industry */}
      <div className="form-group">
        <label className="form-label">
          Industry / Domain
          <span className="optional"> (optional)</span>
        </label>

        <div style={{ position: 'relative' }}>
          <select
            className="form-select form-input"
            value={values.industry}
            onChange={e => onChange('industry', e.target.value)}
            style={{ paddingRight: 40 }}
          >
            <option value="">Select an industry…</option>

            {INDUSTRIES.map(ind => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            style={{
              position: 'absolute',
              right: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-muted)',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>
    </div>
  )
}

/* Guided form */
function GuidedForm({
  values,
  errors,
  onChange,
  showExample,
  onToggleExample,
  onUseExample
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>

      {showExample && (
        <ExamplePanel
          onUse={() => {
            onUseExample()
            onToggleExample()
          }}
        />
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }}>

        {/* Name */}
        <div className="form-group">
          <label className="form-label">
            Startup Idea Name
            <span style={{ color: 'var(--color-error)' }}>*</span>
          </label>

          <input
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="e.g. AI Learning Path"
            value={values.name}
            onChange={e => onChange('name', e.target.value)}
          />

          <FieldError msg={errors.name} />
        </div>

        {/* Industry */}
        <div className="form-group">
          <label className="form-label">
            Industry / Domain
            <span className="optional"> (optional)</span>
          </label>

          <div style={{ position: 'relative' }}>
            <select
              className="form-select form-input"
              value={values.industry}
              onChange={e => onChange('industry', e.target.value)}
              style={{ paddingRight: 40 }}
            >
              <option value="">Select industry…</option>

              {INDUSTRIES.map(ind => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              style={{
                position: 'absolute',
                right: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-muted)',
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Problem */}
      <div className="form-group">
        <label className="form-label">
          What problem are you trying to solve?
          <span style={{ color: 'var(--color-error)' }}>*</span>
        </label>

        <span className="form-hint" style={{
          marginBottom: 6,
          display: 'flex',
          gap: 5,
          alignItems: 'center'
        }}>
          <Info size={12} color="var(--color-teal)" />
          Describe the frustration or gap you noticed. No need for formal language.
        </span>

        <textarea
          className={`form-textarea ${errors.problem ? 'error' : ''}`}
          rows={3}
          placeholder="e.g. College students don't have a structured, personalised way to plan their own learning outside of class."
          value={values.problem}
          onChange={e => onChange('problem', e.target.value)}
        />

        <FieldError msg={errors.problem} />
      </div>

      {/* Solution */}
      <div className="form-group">
        <label className="form-label">
          What is your proposed solution?
          <span style={{ color: 'var(--color-error)' }}>*</span>
        </label>

        <span className="form-hint" style={{
          marginBottom: 6,
          display: 'flex',
          gap: 5,
          alignItems: 'center'
        }}>
          <Info size={12} color="var(--color-teal)" />
          Your rough idea of what you'd build. It doesn't need to be fully formed.
        </span>

        <textarea
          className={`form-textarea ${errors.solution ? 'error' : ''}`}
          rows={3}
          placeholder="e.g. An AI platform that generates a custom learning path based on the student's goals, available time, and preferred learning style."
          value={values.solution}
          onChange={e => onChange('solution', e.target.value)}
        />

        <FieldError msg={errors.solution} />
      </div>

      {/* Audience */}
      <div className="form-group">
        <label className="form-label">
          Who do you think will use this?
          <span style={{ color: 'var(--color-error)' }}>*</span>
        </label>

        <span className="form-hint" style={{
          marginBottom: 6,
          display: 'flex',
          gap: 5,
          alignItems: 'center'
        }}>
          <Info size={12} color="var(--color-teal)" />
          Think about who has the problem you described — age, occupation, situation.
        </span>

        <textarea
          className={`form-textarea ${errors.audience ? 'error' : ''}`}
          rows={2}
          placeholder="e.g. College and university students aged 18–26, especially those studying STEM subjects or preparing for certifications."
          value={values.audience}
          onChange={e => onChange('audience', e.target.value)}
        />

        <FieldError msg={errors.audience} />
      </div>

      {/* Description */}
      <div className="form-group">
        <label className="form-label">
          Overall Idea Description
          <span style={{ color: 'var(--color-error)' }}>*</span>
        </label>

        <span className="form-hint" style={{
          marginBottom: 6,
          display: 'flex',
          gap: 5,
          alignItems: 'center'
        }}>
          <Info size={12} color="var(--color-teal)" />
          Summarise everything in a few sentences — this is what gets researched.
        </span>

        <textarea
          className={`form-textarea ${errors.description ? 'error' : ''}`}
          rows={4}
          placeholder="Summarise your idea in 2–4 sentences."
          value={values.description}
          onChange={e => onChange('description', e.target.value)}
          maxLength={2000}
        />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <FieldError msg={errors.description} />
          <CharCounter value={values.description} max={2000} />
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button
          type="button"
          className="btn btn--ghost btn--sm"
          style={{
            fontSize: '0.8125rem',
            gap: 5
          }}
          onClick={onToggleExample}
        >
          {showExample ? <EyeOff size={12} /> : <Eye size={12} />}
          {showExample ? 'Hide example' : 'See an example idea'}
        </button>
      </div>
    </div>
  )
}

/* Main page */
export default function SubmitPage() {

  const {
    idea,
    updateIdea,
    mode,
    setMode,
    setAnalysisResult,
    isSubmitting,
    setIsSubmitting,
    submitError,
    setSubmitError,
  } = useIdea()

  const navigate = useNavigate()

  const [errors, setErrors] = useState({})
  const [showExample, setShowExample] = useState(false)

  function handleChange(field, val) {
    updateIdea({ [field]: val })

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  function handleUseExample() {
    updateIdea({
      name: EXAMPLE_IDEA.name,
      industry: EXAMPLE_IDEA.industry,
      description: EXAMPLE_IDEA.description,
      problem: EXAMPLE_IDEA.problem,
      solution: EXAMPLE_IDEA.solution,
      audience: EXAMPLE_IDEA.audience,
    })

    setErrors({})
  }

  // Submit idea to FastAPI backend
  async function handleSubmit(e) {

    e.preventDefault()

    const errs = mode === 'quick'
      ? validateQuickForm(idea)
      : validateGuidedForm(idea)

    setErrors(errs)

    if (!isFormValid(errs)) return

    // Prepare idea details for the backend
    const ideaText = [
      `Startup Name: ${idea.name}`,
      `Industry: ${idea.industry}`,
      `Description: ${idea.description}`,
      `Problem: ${idea.problem}`,
      `Solution: ${idea.solution}`,
      `Target Audience: ${idea.audience}`,
    ]
      .filter(item => !item.endsWith(': '))
      .join('\n')

    try {

      setIsSubmitting(true)
      setSubmitError('')
      setAnalysisResult(null)

      const response = await fetch(
        'http://127.0.0.1:8000/api/ideas/submit',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            idea_text: ideaText,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.detail || 'Unable to analyse your idea.'
        )
      }

      // Store actual backend response
      setAnalysisResult(data)

      // Navigate after successful analysis
      navigate('/extraction')

    } catch (error) {

      console.error('Idea submission error:', error)

      setSubmitError(
        error.message || 'Something went wrong. Please try again.'
      )

    } finally {

      setIsSubmitting(false)

    }
  }

  return (
    <>

      {/* Page header */}
      <div className="page-header">
        <div
          className="container container--narrow"
          style={{ textAlign: 'center' }}
        >
          <span
            className="badge badge--teal"
            style={{
              marginBottom: 16,
              display: 'inline-flex'
            }}
          >
            Step 1 of 3
          </span>

          <h1 style={{
            color: 'white',
            marginBottom: 10
          }}>
            Tell us about your idea
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '1rem'
          }}>
            There's no right or wrong answer — just share what's on your mind.
            Even a rough 2–3 sentence description works perfectly.
          </p>
        </div>
      </div>

      <div className="section section--sm">
        <div className="container container--narrow">

          <StepBar current={0} />

          {/* Mode toggle */}
          <div style={{ marginBottom: 28 }}>

            <div className="tab-group">

              <button
                type="button"
                className={`tab-btn ${mode === 'quick' ? 'active' : ''}`}
                onClick={() => setMode('quick')}
              >
                <Zap
                  size={14}
                  style={{
                    display: 'inline',
                    marginRight: 6
                  }}
                />
                Quick — just describe it
              </button>

              <button
                type="button"
                className={`tab-btn ${mode === 'guided' ? 'active' : ''}`}
                onClick={() => setMode('guided')}
              >
                <BookOpen
                  size={14}
                  style={{
                    display: 'inline',
                    marginRight: 6
                  }}
                />
                Guided — step by step
              </button>

            </div>

            <p className="form-hint" style={{
              marginTop: 10,
              display: 'flex',
              gap: 6,
              alignItems: 'center'
            }}>
              <Info size={12} color="var(--color-teal)" />

              {mode === 'quick'
                ? 'Describe your idea in a few sentences. We\'ll extract the key details automatically.'
                : 'Answer a few focused questions to help us understand your idea better.'
              }
            </p>

          </div>

          {/* Form card */}
          <div className="card" style={{ padding: '36px' }}>

            <form onSubmit={handleSubmit} noValidate>

              {mode === 'quick' ? (

                <QuickForm
                  values={idea}
                  errors={errors}
                  onChange={handleChange}
                  showExample={showExample}
                  onToggleExample={() => setShowExample(s => !s)}
                  onUseExample={handleUseExample}
                />

              ) : (

                <GuidedForm
                  values={idea}
                  errors={errors}
                  onChange={handleChange}
                  showExample={showExample}
                  onToggleExample={() => setShowExample(s => !s)}
                  onUseExample={handleUseExample}
                />

              )}

              <div style={{
                marginTop: 32,
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}>

                <button
                  type="submit"
                  className="btn btn--primary btn--lg"
                  disabled={isSubmitting}
                  style={{ width: '100%' }}
                >

                  {isSubmitting ? (

                    <>
                      <span
                        className="loading-spinner"
                        style={{
                          width: 18,
                          height: 18,
                          borderWidth: 2
                        }}
                      />
                      Analysing your idea…
                    </>

                  ) : (

                    <>
                      Analyse My Idea
                      <ArrowRight size={18} />
                    </>

                  )}

                </button>

                {/* Display backend errors */}
                {submitError && (
                  <p style={{
                    color: 'var(--color-error)',
                    textAlign: 'center'
                  }}>
                    {submitError}
                  </p>
                )}

                <p style={{
                  textAlign: 'center',
                  fontSize: '0.8125rem',
                  color: 'var(--color-muted)'
                }}>
                  Your idea doesn't need to be perfect. Start with what you have. ✨
                </p>

              </div>

            </form>

          </div>

        </div>
      </div>

    </>
  )
}