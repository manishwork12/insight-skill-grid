from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class TrainerBase(BaseModel):
    email: EmailStr
    name: str
    department: Optional[str] = None
    experience: Optional[int] = None
    avatar: Optional[str] = None

class TrainerCreate(TrainerBase):
    password: str

class TrainerUpdate(BaseModel):
    name: Optional[str] = None
    department: Optional[str] = None
    experience: Optional[int] = None
    avatar: Optional[str] = None

class TrainerResponse(TrainerBase):
    id: str
    role: str = "trainer"
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True 