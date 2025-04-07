from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import requests
from datetime import datetime

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Job(BaseModel):
    id: str
    title: str
    company: str
    location: str
    salary: Optional[str]
    tags: List[str]
    description: str
    posted: str
    easy_apply: bool

# LinkedIn API configuration
LINKEDIN_API_KEY = os.getenv("LINKEDIN_API_KEY")
LINKEDIN_API_SECRET = os.getenv("LINKEDIN_API_SECRET")

# Indeed API configuration
INDEED_PUBLISHER_ID = os.getenv("INDEED_PUBLISHER_ID")

@app.get("/")
async def root():
    return {"message": "Job Search API is running"}

@app.get("/api/jobs", response_model=List[Job])
async def get_jobs(query: str = "", location: str = "", page: int = 1):
    jobs = []
    
    # LinkedIn Jobs API
    try:
        linkedin_jobs = await fetch_linkedin_jobs(query, location, page)
        jobs.extend(linkedin_jobs)
    except Exception as e:
        print(f"LinkedIn API error: {str(e)}")

    # Indeed Jobs API
    try:
        indeed_jobs = await fetch_indeed_jobs(query, location, page)
        jobs.extend(indeed_jobs)
    except Exception as e:
        print(f"Indeed API error: {str(e)}")

    # Deduplicate jobs based on title and company
    unique_jobs = {}
    for job in jobs:
        key = f"{job.title}-{job.company}"
        if key not in unique_jobs:
            unique_jobs[key] = job

    return list(unique_jobs.values())

async def fetch_linkedin_jobs(query: str, location: str, page: int) -> List[Job]:
    # LinkedIn Jobs API implementation
    # Note: This is a placeholder. You'll need to implement the actual API calls
    # using your LinkedIn API credentials
    
    # Mock data for development
    return [
        Job(
            id="1",
            title="Senior Frontend Developer",
            company="TechCorp",
            location="San Francisco, CA (Remote)",
            salary="$120,000 - $150,000",
            tags=["React", "TypeScript", "Tailwind CSS", "5+ years"],
            description="We're looking for a Senior Frontend Developer with expertise in React and TypeScript to join our product team...",
            posted="2 days ago",
            easy_apply=True
        )
    ]

async def fetch_indeed_jobs(query: str, location: str, page: int) -> List[Job]:
    # Indeed Jobs API implementation
    # Note: This is a placeholder. You'll need to implement the actual API calls
    # using your Indeed Publisher ID
    
    # Mock data for development
    return [
        Job(
            id="2",
            title="Full Stack Developer",
            company="StartupCo",
            location="New York, NY",
            salary="$130,000 - $160,000",
            tags=["Python", "React", "Node.js", "3+ years"],
            description="Join our growing team as a Full Stack Developer...",
            posted="1 day ago",
            easy_apply=True
        )
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)