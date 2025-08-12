from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from ..db.session import get_db
from ..core.security import get_current_user
from ..db.models import User

security = HTTPBearer()

def get_current_user_dependency(credentials: HTTPAuthorizationCredentials = Depends(security)) -> User:
    """Get current authenticated user."""
    user = get_current_user(credentials.credentials)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

def get_current_employee(current_user: User = Depends(get_current_user_dependency)) -> User:
    """Get current employee user."""
    if current_user.role != "employee":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user

def get_current_trainer(current_user: User = Depends(get_current_user_dependency)) -> User:
    """Get current trainer user."""
    if current_user.role != "trainer":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user

def get_current_manager(current_user: User = Depends(get_current_user_dependency)) -> User:
    """Get current manager user."""
    if current_user.role not in ["manager", "super-user"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user

def get_current_super_user(current_user: User = Depends(get_current_user_dependency)) -> User:
    """Get current super user."""
    if current_user.role != "super-user":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user 