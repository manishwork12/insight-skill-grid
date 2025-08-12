from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ManagerBase(BaseModel):
    email: EmailStr
    name: str
    department: Optional[str] = None
    experience: Optional[int] = None
    avatar: Optional[str] = None

class ManagerCreate(ManagerBase):
    password: str

class ManagerUpdate(BaseModel):
    name: Optional[str] = None
    department: Optional[str] = None
    experience: Optional[int] = None
    avatar: Optional[str] = None

class ManagerOut(ManagerBase):
    id: str
    role: str = "manager"
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 