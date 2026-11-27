import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ExternalLink,
  TrendingUp,
  Building2,
  Activity,
  Search,
  Lightbulb,
  Globe,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Sparkles,
  RefreshCw,
} from 'lucide-react'

import { useIdea } from '../data/IdeaContext'

export default function ResultsPage() {
  const { idea, analysisResult } = useIdea()

  const marketAnalysis = analysisResult?.market_analysis || {}

  const marketInsights = marketAnalysis.market_insights || []
  const existingSolutions = marketAnalysis.existing_solutions || []
  const researchSignals = marketAnalysis.research_signals || []
  const webResults = analysisResult?.web_search_results || []

  const [activeSection, setActiveSection] = useState('overview')

  const sections = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'insights', label: 'Market Insights', icon: TrendingUp },
    { id: 'solutions', label: 'Existing Solutions', icon: Building2 },
    { id: 'signals', label: 'Research Signals', icon: Activity },
    { id: 'sources', label: 'Web Sources', icon: Globe },
  ]

  const scrollToSection = (id) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const hasResults =
    marketInsights.length > 0 ||
    existingSolutions.length > 0 ||
    researchSignals.length > 0 ||
    webResults.length > 0

  return (
    <div className="results-page">
      <style>{`
        .results-page {
          min-height: 100vh;
          background: #f7f8fc;
          color: #20243a;
          padding: 32px 5%;
          font-family: inherit;
        }

        .results-container {
          max-width: 1200px;
          margin: auto;
        }

        .results-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #555b72;
          text-decoration: none;
          font-weight: 600;
        }

        .back-link:hover {
          color: #6558d3;
        }

        .results-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #eeebff;
          color: #6558d3;
          padding: 8px 13px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 700;
        }

        .results-hero {
          background: linear-gradient(120deg, #29234f, #5143a6);
          color: white;
          border-radius: 20px;
          padding: 36px;
          margin-bottom: 25px;
        }

        .results-hero h1 {
          font-size: 30px;
          margin: 15px 0 10px;
        }

        .results-hero p {
          color: #e0dcff;
          line-height: 1.7;
          margin: 0;
        }

        .idea-name {
          color: #c9c1ff;
          font-weight: 700;
        }

        .results-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        .stat-card {
          background: white;
          padding: 22px;
          border-radius: 15px;
          border: 1px solid #ececf3;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .stat-icon {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: #eeebff;
          color: #6558d3;
          flex-shrink: 0;
        }

        .stat-card h3 {
          margin: 0;
          font-size: 24px;
        }

        .stat-card p {
          margin: 4px 0 0;
          color: #777b8e;
          font-size: 13px;
        }

        .results-nav {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          background: white;
          border: 1px solid #ececf3;
          padding: 12px;
          border-radius: 14px;
          margin-bottom: 30px;
        }

        .results-nav button {
          border: none;
          background: transparent;
          color: #666b80;
          padding: 11px 15px;
          border-radius: 9px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
        }

        .results-nav button.active {
          background: #eeebff;
          color: #6558d3;
        }

        .results-section {
          margin-bottom: 35px;
          scroll-margin-top: 20px;
        }

        .section-heading {
          margin-bottom: 18px;
        }

        .section-heading h2 {
          font-size: 22px;
          margin: 0 0 7px;
        }

        .section-heading p {
          color: #777b8e;
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
        }

        .section-label {
          color: #6558d3;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .result-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 17px;
        }

        .result-card {
          background: white;
          border: 1px solid #ececf3;
          border-radius: 15px;
          padding: 22px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .result-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(30, 30, 70, 0.07);
        }

        .result-card h3 {
          font-size: 16px;
          margin: 10px 0;
          line-height: 1.5;
        }

        .result-card p {
          color: #70758a;
          font-size: 14px;
          line-height: 1.7;
          margin: 8px 0;
        }

        .card-tag {
          display: inline-block;
          background: #f0efff;
          color: #6558d3;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }

        .source-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #6558d3;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          margin-top: 12px;
        }

        .source-link:hover {
          text-decoration: underline;
        }

        .signal-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .signal-icon {
          background: #eaf8f1;
          color: #20976b;
          padding: 10px;
          border-radius: 10px;
          flex-shrink: 0;
        }

        .strength {
          display: inline-block;
          margin-top: 8px;
          padding: 5px 10px;
          background: #eaf8f1;
          color: #20976b;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }

        .empty-state {
          background: white;
          border: 1px dashed #d8d8e5;
          padding: 30px;
          border-radius: 14px;
          text-align: center;
          color: #777b8e;
        }

        .empty-state svg {
          color: #aaa5d9;
          margin-bottom: 10px;
        }

        .notice-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #fff8e9;
          border: 1px solid #f3e2b9;
          color: #806326;
          border-radius: 13px;
          padding: 17px;
          margin: 25px 0;
          font-size: 13px;
          line-height: 1.7;
        }

        .notice-box svg {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .idea-summary {
          background: white;
          padding: 24px;
          border-radius: 15px;
          border: 1px solid #ececf3;
          line-height: 1.8;
        }

        .idea-summary h3 {
          margin-top: 0;
        }

        .idea-summary p {
          color: #70758a;
          margin-bottom: 0;
        }

        .results-footer {
          text-align: center;
          color: #898da0;
          font-size: 12px;
          padding: 25px 0;
        }

        @media (max-width: 800px) {
          .results-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .result-grid {
            grid-template-columns: 1fr;
          }

          .results-hero {
            padding: 25px;
          }
        }

        @media (max-width: 480px) {
          .results-page {
            padding: 20px 4%;
          }

          .results-stats {
            grid-template-columns: 1fr 1fr;
          }

          .stat-card {
            padding: 14px;
            gap: 9px;
          }

          .stat-card h3 {
            font-size: 20px;
          }

          .results-hero h1 {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="results-container">

        {/* Top bar */}
        <div className="results-topbar">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <span className="results-badge">
            <Sparkles size={15} />
            AI Research Report
          </span>
        </div>

        {/* Hero section */}
        <div className="results-hero">
          <span className="idea-name">
            {idea?.name || 'Your Startup Idea'}
          </span>

          <h1>Your Startup Research Results</h1>

          <p>
            Your submitted idea has been processed using AI-powered
            extraction, web search, and market analysis.
          </p>
        </div>

        {/* Statistics */}
        <div className="results-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <Globe size={22} />
            </div>
            <div>
              <h3>{webResults.length}</h3>
              <p>Web Sources</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUp size={22} />
            </div>
            <div>
              <h3>{marketInsights.length}</h3>
              <p>Market Insights</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Building2 size={22} />
            </div>
            <div>
              <h3>{existingSolutions.length}</h3>
              <p>Potential Solutions</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Activity size={22} />
            </div>
            <div>
              <h3>{researchSignals.length}</h3>
              <p>Research Signals</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="results-nav">
          {sections.map((section) => {
            const Icon = section.icon

            return (
              <button
                key={section.id}
                className={activeSection === section.id ? 'active' : ''}
                onClick={() => scrollToSection(section.id)}
              >
                <Icon size={16} />
                {section.label}
              </button>
            )
          })}
        </div>

        {/* Overview */}
        <section id="overview" className="results-section">
          <div className="section-heading">
            <div className="section-label">01 — Overview</div>
            <h2>Research Overview</h2>
            <p>
              A summary of the idea submitted for validation.
            </p>
          </div>

          <div className="idea-summary">
            <h3>{idea?.name || 'Your Startup Idea'}</h3>

            <p>
              <strong>Industry:</strong>{' '}
              {idea?.industry || 'Not specified'}
            </p>

            <p>
              <strong>Problem:</strong>{' '}
              {idea?.problem || 'See the extracted idea details.'}
            </p>

            <p>
              <strong>Solution:</strong>{' '}
              {idea?.solution || idea?.description || 'See the extracted idea details.'}
            </p>

            <p>
              <strong>Target Audience:</strong>{' '}
              {idea?.audience || 'Not specified'}
            </p>
          </div>

          <div className="notice-box">
            <AlertCircle size={19} />
            <div>
              <strong>Important:</strong> Tavily provides the web search
              results, and Groq generates the market analysis from those
              results. AI-generated findings are not independently verified.
              Open the original sources before relying on a claim.
            </div>
          </div>
        </section>

        {/* Market Insights */}
        <section id="insights" className="results-section">
          <div className="section-heading">
            <div className="section-label">02 — Market Research</div>
            <h2>Market Insights</h2>
            <p>
              AI-generated findings based on web search results for your idea.
            </p>
          </div>

          {marketInsights.length > 0 ? (
            <div className="result-grid">
              {marketInsights.map((item, index) => (
                <div className="result-card" key={index}>
                  <span className="card-tag">
                    {item.category || 'Market Finding'}
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.snippet}</p>

                  {item.source && (
                    <p>
                      <strong>Source:</strong> {item.source}
                    </p>
                  )}

                  {item.sourceUrl && (
                    <a
                      className="source-link"
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Original Source
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No market insights were returned for this idea." />
          )}
        </section>

        {/* Existing Solutions */}
        <section id="solutions" className="results-section">
          <div className="section-heading">
            <div className="section-label">03 — Competition</div>
            <h2>Existing Solutions</h2>
            <p>
              Companies and products identified by AI as potentially relevant
              to your startup idea.
            </p>
          </div>

          {existingSolutions.length > 0 ? (
            <div className="result-grid">
              {existingSolutions.map((solution, index) => (
                <div className="result-card" key={index}>
                  <span className="card-tag">
                    Potential Competitor
                  </span>

                  <h3>
                    {solution.company || solution.title || 'Unnamed Solution'}
                  </h3>

                  {solution.title && solution.company && (
                    <p><strong>{solution.title}</strong></p>
                  )}

                  <p>{solution.description}</p>

                  {solution.whyMatters && (
                    <p>
                      <strong>Why it matters:</strong>{' '}
                      {solution.whyMatters}
                    </p>
                  )}

                  {solution.sourceUrl && (
                    <a
                      className="source-link"
                      href={solution.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website / Source
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No relevant existing solutions were identified." />
          )}
        </section>

        {/* Research Signals */}
        <section id="signals" className="results-section">
          <div className="section-heading">
            <div className="section-label">04 — Analysis</div>
            <h2>Research Signals</h2>
            <p>
              Important themes identified during the AI market analysis.
            </p>
          </div>

          {researchSignals.length > 0 ? (
            <div className="result-grid">
              {researchSignals.map((signal, index) => (
                <div className="result-card signal-card" key={index}>
                  <div className="signal-icon">
                    <CheckCircle size={20} />
                  </div>

                  <div>
                    <h3>{signal.label}</h3>

                    <p>{signal.desc}</p>

                    {signal.strength && (
                      <span className="strength">
                        Strength: {signal.strength}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No research signals were returned." />
          )}
        </section>

        {/* Web Sources */}
        <section id="sources" className="results-section">
          <div className="section-heading">
            <div className="section-label">05 — References</div>
            <h2>Web Search Sources</h2>
            <p>
              Original pages returned by Tavily during research for your idea.
            </p>
          </div>

          {webResults.length > 0 ? (
            <div className="result-grid">
              {webResults.map((result, index) => (
                <div className="result-card" key={index}>
                  <span className="card-tag">
                    Tavily Web Search
                  </span>

                  <h3>{result.title || 'Untitled Source'}</h3>

                  <p>{result.content || 'No description available.'}</p>

                  {result.url && (
                    <a
                      className="source-link"
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Original Source
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No web search sources were returned." />
          )}
        </section>

        {!hasResults && (
          <div className="empty-state">
            <RefreshCw size={25} />
            <h3>No research data available</h3>
            <p>
              Submit an idea again to generate its research report.
            </p>
            <Link to="/submit" className="source-link">
              Submit an Idea
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="results-footer">
          WorthIt AI · AI-powered Startup Idea Validation
        </div>

      </div>
    </div>
  )
}

function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <Search size={25} />
      <p>{message}</p>
    </div>
  )
}