import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  User,
  Target,
  Lightbulb,
  Briefcase,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Edit3,
  X,
  Save,
  Search,
  ExternalLink,
  Globe,
} from 'lucide-react'

import { useIdea } from '../data/IdeaContext'

const STEPS = [
  'Describe Idea',
  'Review Understanding',
  'Market Research',
]

function StepBar({ current }) {
  return (
    <div className="step-indicator" style={{ marginBottom: 32 }}>
      {STEPS.map((s, i) => (
        <div
          key={s}
          className="step-item"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div
            className={`step-bubble ${
              i < current
                ? 'completed'
                : i === current
                ? 'active'
                : 'pending'
            }`}
          >
            {i < current ? <CheckCircle size={14} /> : i + 1}
          </div>

          <span
            className={`step-label ${
              i < current
                ? 'completed'
                : i === current
                ? 'active'
                : ''
            }`}
            style={{ marginLeft: 6 }}
          >
            {s}
          </span>

          {i < STEPS.length - 1 && (
            <div
              className={`step-connector ${
                i < current ? 'completed' : ''
              }`}
              style={{ margin: '0 10px' }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

/* Extraction field */

function ExtractionField({
  icon: Icon,
  label,
  value,
  colour,
  onEdit,
}) {
  return (
    <div className="extraction-card">
      <div
        className="extraction-card__label"
        style={{ color: colour || 'var(--color-teal)' }}
      >
        <Icon size={13} />
        {label}
      </div>

      <div className="extraction-card__value">
        {value || '—'}
      </div>

      {onEdit && (
        <button
          type="button"
          className="extraction-card__edit-btn"
          onClick={onEdit}
          aria-label={`Edit ${label}`}
        >
          <Edit3 size={12} />
          Edit
        </button>
      )}
    </div>
  )
}

/* Editable field */

function EditableField({
  icon: Icon,
  label,
  fieldKey,
  value,
  colour,
  onSave,
  onCancel,
}) {
  const [draft, setDraft] = useState(value)

  return (
    <div className="extraction-card extraction-card--editing">
      <div
        className="extraction-card__label"
        style={{ color: colour || 'var(--color-teal)' }}
      >
        <Icon size={13} />
        {label}
      </div>

      <textarea
        className="form-textarea"
        rows={3}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        style={{ marginBottom: 10, minHeight: 72 }}
        autoFocus
      />

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          className="btn btn--primary btn--sm"
          onClick={() => onSave(fieldKey, draft)}
          style={{ gap: 5 }}
        >
          <Save size={12} />
          Save
        </button>

        <button
          type="button"
          className="btn btn--ghost btn--sm"
          onClick={onCancel}
          style={{ gap: 5 }}
        >
          <X size={12} />
          Cancel
        </button>
      </div>
    </div>
  )
}

/* Tavily search results */

function WebSearchResults({ results }) {
  return (
    <div style={{ marginBottom: 32 }}>

      <div style={{ marginBottom: 18 }}>
        <div
          className="extraction-card__label"
          style={{
            color: 'var(--color-teal)',
            marginBottom: 8,
          }}
        >
          <Globe size={15} />
          Live Web Research — Tavily
        </div>

        <h2
          style={{
            color: 'var(--color-navy)',
            marginBottom: 8,
          }}
        >
          Related Web Search Results
        </h2>

        <p
          style={{
            color: 'var(--color-muted)',
            fontSize: '0.875rem',
            lineHeight: 1.7,
          }}
        >
          These websites were discovered through Tavily web
          search based on your submitted startup idea.
        </p>
      </div>

      {results.length > 0 ? (

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 16,
          }}
        >
          {results.map((result, index) => (
            <div
              key={index}
              className="extraction-card"
              style={{
                padding: 20,
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 12,
                  color: 'var(--color-teal)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                <Search size={14} />
                TAVILY SEARCH RESULT {index + 1}
              </div>

              <h3
                style={{
                  color: 'var(--color-navy)',
                  fontSize: '1rem',
                  marginBottom: 10,
                  lineHeight: 1.5,
                }}
              >
                {result.title || 'Untitled Result'}
              </h3>

              <p
                style={{
                  color: 'var(--color-muted)',
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  marginBottom: 14,
                }}
              >
                {result.content || 'No description available.'}
              </p>

              {result.url && (
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: 'var(--color-teal)',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    textDecoration: 'none',
                  }}
                >
                  Visit Original Source
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          ))}
        </div>

      ) : (

        <div className="extraction-card">
          <p style={{ color: 'var(--color-muted)' }}>
            No web search results were returned for this idea.
          </p>
        </div>

      )}

    </div>
  )
}

/* Main page */

export default function ExtractionPage() {
  const {
    idea,
    updateIdea,
    analysisResult,
  } = useIdea()

  const navigate = useNavigate()

  const [editing, setEditing] = useState(null)

  // Actual details returned by Groq
  const details = analysisResult?.extracted_details

  // Actual results returned by Tavily
  const webResults = analysisResult?.web_search_results || []

  const [display, setDisplay] = useState(() => ({
    name: details?.startup_name || idea.name || '',
    industry: details?.industry || idea.industry || '',
    problem: details?.problem || idea.problem || '',
    solution: details?.solution || idea.solution || '',
    audience: details?.target_audience || idea.audience || '',
    summary: details?.summary || idea.description || '',
  }))

  function handleSave(field, value) {
    setDisplay(prev => ({
      ...prev,
      [field]: value,
    }))

    updateIdea({ [field]: value })

    setEditing(null)
  }

  const FIELDS = [
    {
      key: 'problem',
      icon: Target,
      label: 'Problem Identified',
      colour: 'var(--color-teal)',
    },
    {
      key: 'solution',
      icon: Lightbulb,
      label: 'Proposed Solution',
      colour: 'var(--color-amber)',
    },
    {
      key: 'audience',
      icon: User,
      label: 'Target Audience',
      colour: '#7C3AED',
    },
    {
      key: 'industry',
      icon: Briefcase,
      label: 'Industry',
      colour: 'var(--color-info)',
    },
  ]

  // Handle direct access without a submitted idea
  if (!details) {
    return (
      <div className="section">
        <div className="container container--narrow">
          <h2>No analysis found</h2>

          <p>Please submit your idea first.</p>

          <button
            className="btn btn--primary"
            onClick={() => navigate('/submit')}
          >
            Submit Your Idea
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="page-header">
        <div
          className="container container--narrow"
          style={{ textAlign: 'center' }}
        >
          <span
            className="badge badge--teal"
            style={{
              marginBottom: 16,
              display: 'inline-flex',
            }}
          >
            Step 2 of 3
          </span>

          <h1 style={{ color: 'white', marginBottom: 10 }}>
            Here's how we understood your idea
          </h1>

          <p
            style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: '1rem',
            }}
          >
            Review the details extracted by AI.
            You can edit any incorrect information.
          </p>
        </div>
      </div>

      <div className="section section--sm">
        <div className="container container--narrow">

          <StepBar current={1} />

          {/* Idea name banner */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginBottom: 24,
              padding: '20px 24px',
              background: 'var(--color-teal-pale)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #99E6DC',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                background: 'var(--color-teal)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={22} color="white" />
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--color-teal)',
                  marginBottom: 2,
                }}
              >
                Idea Name — extracted by AI
              </div>

              <h3
                style={{
                  color: 'var(--color-navy)',
                  marginBottom: 0,
                }}
              >
                {display.name}
              </h3>
            </div>

            <span className="badge badge--teal">
              {display.industry}
            </span>
          </div>

          {/* Extraction information */}

          <div
            style={{
              padding: '12px 16px',
              background: 'var(--color-info-bg)',
              border: '1px solid #BAE6FD',
              borderRadius: 'var(--radius-md)',
              marginBottom: 20,
              fontSize: '0.875rem',
              color: 'var(--color-info)',
              display: 'flex',
              gap: 8,
            }}
          >
            <span style={{ fontWeight: 600 }}>
              AI Extraction:
            </span>

            <span>
              These details were extracted from your submitted
              idea using the AI backend. Review and edit them
              before continuing to market research.
            </span>
          </div>

          {/* Extraction fields */}

          <div
            className="extraction-grid"
            style={{ marginBottom: 24 }}
          >
            {FIELDS.map(f =>
              editing === f.key ? (
                <EditableField
                  key={f.key}
                  icon={f.icon}
                  label={f.label}
                  fieldKey={f.key}
                  value={display[f.key]}
                  colour={f.colour}
                  onSave={handleSave}
                  onCancel={() => setEditing(null)}
                />
              ) : (
                <ExtractionField
                  key={f.key}
                  icon={f.icon}
                  label={f.label}
                  value={display[f.key]}
                  colour={f.colour}
                  onEdit={() => setEditing(f.key)}
                />
              )
            )}
          </div>

          {/* AI summary */}

          <div
            className="extraction-card extraction-card--full"
            style={{
              marginBottom: 32,
              borderRadius: 'var(--radius-lg)',
              padding: '28px 32px',
            }}
          >
            <div className="extraction-card__label">
              <Sparkles size={13} />
              Idea Summary — generated by AI
            </div>

            <p
              style={{
                color: 'rgba(255,255,255,0.88)',
                lineHeight: 1.8,
                fontSize: '0.9375rem',
                margin: 0,
              }}
            >
              {display.summary || 'No summary available.'}
            </p>
          </div>

          {/* NEW: Tavily web search results */}

          <WebSearchResults results={webResults} />

          {/* Edit notice */}

          <div
            style={{
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-surface-alt)',
              border: '1px solid var(--color-border)',
              fontSize: '0.8125rem',
              color: 'var(--color-muted)',
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Edit3 size={13} color="var(--color-teal)" />

            Each field has an Edit button.
            Correct any details before continuing.
          </div>

          {/* Navigation */}

          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => navigate('/results')}
              className="btn btn--primary btn--lg"
              style={{ flex: 1 }}
            >
              Continue to Market Research
              <ArrowRight size={18} />
            </button>

            <Link
              to="/submit"
              className="btn btn--outline btn--lg"
              style={{ flexShrink: 0 }}
            >
              Edit My Idea
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}