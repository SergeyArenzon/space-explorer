from datetime import datetime
from typing import Generic, List, Optional, TypeVar

from pydantic import BaseModel

T = TypeVar('T')


class Source(BaseModel):
    id: int
    name: str
    type: str
    launch_date: str
    description: str
    image_url: Optional[str]
    status: str
    confidence: Optional[int] = None


class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    page_size: int
    total_pages: int
    q: Optional[str] = None


class HistoryResult(BaseModel):
    source_id: int
    confidence: int

class HistoryItem(BaseModel):
    q: str
    items: List[HistoryResult]
    created_at: datetime
    total: int

