from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Idea
from schemas import IdeaCreate

from agents.idea_extraction import extract_idea
from agents.web_search import search_web
from agents.market_analysis import analyze_market

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# API 1: Submit a startup idea
@router.post("/submit")
def submit_idea(idea: IdeaCreate, db: Session = Depends(get_db)):

    # Step 1: Extract idea details using Groq
    try:
        extracted_details = extract_idea(idea.idea_text)

    except Exception as e:
        print("Groq Error:", str(e))
        raise HTTPException(
            status_code=502,
            detail="AI idea extraction failed. Please check your Groq API configuration."
        )

    # Step 2: Save idea details in database
    new_idea = Idea(
        idea_text=idea.idea_text,
        startup_name=extracted_details.get("startup_name"),
        industry=extracted_details.get("industry"),
        problem=extracted_details.get("problem"),
        solution=extracted_details.get("solution"),
        target_audience=extracted_details.get("target_audience"),
        summary=extracted_details.get("summary")
    )

    db.add(new_idea)
    db.commit()
    db.refresh(new_idea)

    # Step 3: Prepare Tavily search query
    search_query = f"""
    Find similar startups, competitors and existing solutions.

    Industry: {extracted_details.get("industry")}
    Problem: {extracted_details.get("problem")}
    Solution: {extracted_details.get("solution")}
    Target Audience: {extracted_details.get("target_audience")}
    """

    # Step 4: Search the web using Tavily
    web_results = search_web(search_query)

    # Step 5: Analyze market using Groq
    try:
        market_analysis = analyze_market(
            extracted_details,
            web_results
        )

    except Exception as e:
        print("Market Analysis Error:", str(e))

        market_analysis = {
            "market_insights": [],
            "existing_solutions": [],
            "research_signals": []
        }

    # Step 6: Return complete response
    return {
        "message": "Idea submitted and analyzed successfully!",
        "idea_id": new_idea.id,
        "extracted_details": extracted_details,
        "web_search_results": web_results,
        "market_analysis": market_analysis
    }


# API 2: Retrieve all submitted ideas
@router.get("/")
def get_all_ideas(db: Session = Depends(get_db)):

    ideas = db.query(Idea).order_by(Idea.id.desc()).all()

    return {
        "message": "Ideas retrieved successfully!",
        "total_ideas": len(ideas),
        "ideas": [
            {
                "id": idea.id,
                "idea_text": idea.idea_text,
                "startup_name": idea.startup_name,
                "industry": idea.industry,
                "problem": idea.problem,
                "solution": idea.solution,
                "target_audience": idea.target_audience,
                "summary": idea.summary,
                "created_at": idea.created_at
            }
            for idea in ideas
        ]
    }


# API 3: Retrieve a single idea using its ID
@router.get("/{idea_id}")
def get_idea_by_id(idea_id: int, db: Session = Depends(get_db)):

    idea = db.query(Idea).filter(Idea.id == idea_id).first()

    if not idea:
        raise HTTPException(
            status_code=404,
            detail="Idea not found!"
        )

    return {
        "message": "Idea retrieved successfully!",
        "idea": {
            "id": idea.id,
            "idea_text": idea.idea_text,
            "startup_name": idea.startup_name,
            "industry": idea.industry,
            "problem": idea.problem,
            "solution": idea.solution,
            "target_audience": idea.target_audience,
            "summary": idea.summary,
            "created_at": idea.created_at
        }
    }