import os
import json
from pathlib import Path
from groq import Groq
from dotenv import load_dotenv

# Load API key from backend/.env
env_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(env_path)

# Connect to Groq
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def analyze_market(extracted_details, web_results):

    prompt = f"""
    You are a startup market research analyst.

    Analyze the startup idea using the provided startup details
    and Tavily web search results.

    STARTUP DETAILS:
    {json.dumps(extracted_details, indent=2)}

    TAVILY SEARCH RESULTS:
    {json.dumps(web_results, indent=2)}

    Generate the following sections:

    1. market_insights:
       Identify up to 4 relevant market trends or findings.
       Each item must contain:
       category, title, snippet, source, sourceUrl.

    2. existing_solutions:
       Identify up to 5 actual companies or products relevant
       to the startup idea.
       Each item must contain:
       company, title, description, sourceUrl, whyMatters.

    3. research_signals:
       Identify up to 4 important themes.
       Each item must contain:
       label, desc, strength.

    IMPORTANT RULES:
    - Base your analysis only on the supplied Tavily results.
    - Do not invent companies, sources, URLs, statistics or facts.
    - Use the original source URLs provided by Tavily.
    - If evidence is insufficient, return an empty list.
    - Do not present assumptions as verified facts.

    Return valid JSON using exactly these keys:
    market_insights, existing_solutions, research_signals.
    """

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        response_format={"type": "json_object"}
    )

    result = response.choices[0].message.content

    return json.loads(result)