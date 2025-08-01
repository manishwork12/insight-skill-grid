from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class EmployeeBase(BaseModel):
    email: EmailStr
    name: str
    department: Optional[str] = None
    experience: Optional[int] = None
    avatar: Optional[str] = None

class EmployeeCreate(EmployeeBase):
    password: str

class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    department: Optional[str] = None
    experience: Optional[int] = None
    avatar: Optional[str] = None

class EmployeeResponse(EmployeeBase):
    id: str
    role: str = "employee"
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class EmployeeWithScores(EmployeeResponse):
    scores: List['ScoreResponse'] = []
    
    class Config:
        from_attributes = True

# Import here to avoid circular imports
from .score import ScoreResponse

# Rebuild the model to resolve forward references
EmployeeWithScores.model_rebuild() 