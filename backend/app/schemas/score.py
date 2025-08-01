from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ScoreBase(BaseModel):
    score: float
    feedback: Optional[str] = None

class ScoreCreate(ScoreBase):
    employee_id: str
    skill_id: str
    trainer_id: str

class ScoreUpdate(BaseModel):
    score: Optional[float] = None
    feedback: Optional[str] = None

class ScoreResponse(ScoreBase):
    id: str
    employee_id: str
    skill_id: str
    trainer_id: str
    date: datetime
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class ScoreWithDetails(ScoreResponse):
    skill_name: Optional[str] = None
    trainer_name: Optional[str] = None
    employee_name: Optional[str] = None
    
    class Config:
        from_attributes = True 