# WorthIt AI 🚀

### AI-Based Startup Idea Validator with Market Analysis Assistance

WorthIt AI is an AI-assisted platform designed to help entrepreneurs and aspiring founders evaluate startup ideas through structured idea extraction and market research assistance.

The project uses Large Language Models (LLMs), web-search capabilities and a modular agent-based architecture to support the early-stage startup validation process.

## 1. Problem Statement

Entrepreneurs often struggle to determine whether their startup ideas have market potential. Understanding customer needs, existing competitors, industry trends and business opportunities requires time and research.

WorthIt AI aims to simplify this initial validation process by providing AI-assisted idea understanding and relevant market information.

## 2. Project Objectives

- Help users submit and organise startup ideas.
- Extract structured information from submitted ideas using an LLM.
- Retrieve relevant information from the web.
- Assist with market and competitor research.
- Provide useful insights to support startup decision-making.

## 3. Key Features

### Startup Idea Submission
Users can submit their startup ideas through a structured interface.

### AI-Based Idea Extraction
The planned LLM integration identifies important details such as the problem, proposed solution, industry and target audience.

### Web Search Agent
The Web Search Agent uses the Tavily Search API to retrieve relevant online information and source links.

### Market Research Assistance
The platform is designed to support the exploration of market trends, competitors and customer demand.

### Modular Agent Architecture
Specialised agents are planned to handle different aspects of startup validation.

## 4. Technology Stack

| Component | Technology |
|---|---|
| Frontend | React 18, JavaScript, Vite |
| Styling | CSS |
| Routing | React Router DOM |
| Icons | Lucide React |
| Backend | Python, FastAPI |
| Database | SQLite |
| LLM Integration | Groq |
| Web Search | Tavily Search API |

## 5. System Architecture

The proposed system follows a modular client-server architecture consisting of:

1. **Presentation Layer:** React-based user interface.
2. **Backend Layer:** FastAPI handles requests and application logic.
3. **AI Agent Layer:** Coordinates specialised agents.
4. **External API Layer:** Integrates Groq and Tavily.
5. **Data Storage Layer:** SQLite stores application data.

## 6. Agent Responsibilities

| Agent | Responsibility |
|---|---|
| Web Search Agent | Retrieves relevant web information using Tavily |
| Market Research Agent | Studies market trends and opportunities |
| Competitor Analysis Agent | Identifies and compares competitors |
| Customer Demand Agent | Examines customer needs and demand signals |
| Final Validation Agent | Combines findings into a validation report |
| Agent Coordinator | Coordinates agent execution and information flow |

The initial milestone focuses on the idea-submission and web-search foundation. Additional specialised agents are part of the planned development roadmap.

## 7. Project Structure

```text
WorthItAI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── requirements.txt
│   └── application files
│
├── docs/
│   ├── research-note.md
│   └── architecture.md
│
├── agile/
│   ├── milestone-1-sprint-plan.md
│   ├── milestone-1-task-sheet.md
│   └── milestone-1-completion-tracker.md
│
├── README.md
└── LICENSE
```

## 8. Installation and Setup

### Prerequisites

- Node.js and npm
- Python 3
- Git
- Required API credentials for Groq and Tavily

### Frontend Setup

Open a terminal in the project directory and execute:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will provide a local URL. Open that URL in your browser.

### Backend Setup

Open another terminal and navigate to the backend directory:

```bash
cd backend
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI application using the actual entry-point module and command configured in the backend project.

**Note:** Verify the backend entry-point filename and startup command before running the application.

## 9. Environment Variables

The backend requires the appropriate API credentials for external services.

- Groq API key
- Tavily API key

Configure these using the exact environment variable names expected by the backend implementation.

Do not upload API keys, passwords or other sensitive credentials to GitHub. Keep local environment files out of version control.

## 10. Milestone 1 Scope

The first milestone focuses on establishing the initial startup idea validation workflow:

- Startup idea submission.
- Structured idea extraction using Groq.
- Web search integration using Tavily.
- Backend request handling.
- Display of relevant research information and source URLs.
- Project architecture and research documentation.

## 11. Future Enhancements

- Market opportunity analysis.
- Competitor discovery and comparison.
- Customer-demand analysis.
- SWOT and risk analysis.
- MVP feature recommendations.
- Go-to-market strategy.
- Comprehensive startup validation report.

## 12. Sample Startup Idea

**Idea:** An AI-powered platform that connects local farmers directly with customers.

**Problem:** Farmers may struggle to reach customers directly, while consumers may have limited access to fresh local produce.

**Proposed Solution:** A digital platform that connects farmers and customers, helping improve accessibility and reduce food wastage.

## 13. Team Information

**Team Name:** Team Orion

**Program:** Infosys Springboard Virtual Internship – Batch 5

## 14. License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
