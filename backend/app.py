from typing import List

from data.db import SpaceDB
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from models import PaginatedResponse, Source, HistoryItem

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = SpaceDB()


@app.get("/api/sources", response_model=PaginatedResponse[Source])
def get_sources(
    page: int = Query(1, ge=1, description="Page number (1-indexed)"),
    page_size: int = Query(10, ge=1, le=100, description="Number of items per page"),
    q: str = Query(None, description="Search query")
):
    """Get paginated space sources."""
    items, total = db.get_sources(page=page, page_size=page_size, q=q)
    total_pages = (total + page_size - 1) // page_size  # Ceiling division
    
    return PaginatedResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        q=q
    )


@app.get("/api/history", response_model=List[HistoryItem])
def get_history():
    history = db.get_history()
    return history
   


@app.delete("/api/history/{q}")
def delete_history(q: str):
    try:
        db.delete_history(q)
        return {"message": "History deleted successfully"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return {"message": "History deleted successfully"}