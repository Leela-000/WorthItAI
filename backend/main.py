from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
import models
from routes.idea_routes import router as idea_router

app = FastAPI(title="WorthIt AI")

# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    idea_router,
    prefix="/api/ideas",
    tags=["Ideas"]
)

# Create database tables
Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {
        "message": "Welcome to WorthIt AI Backend!"
    }


@app.get("/api/health")
def health():
    return {
        "status": "Backend is working successfully"
    }