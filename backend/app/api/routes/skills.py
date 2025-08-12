from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ...db.session import get_db
from ...schemas.skill import SkillCreate, SkillUpdate, SkillResponse
from ...services.skill_service import SkillService
from ...api.dependencies import get_current_manager

router = APIRouter(prefix="/skills", tags=["skills"])

@router.post("/", response_model=SkillResponse)
def create_skill(
    skill_data: SkillCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Create a new skill."""
    service = SkillService(db)
    return service.create_skill(skill_data)

@router.get("/", response_model=List[SkillResponse])
def get_skills(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get all skills."""
    service = SkillService(db)
    return service.get_skills(skip, limit)

@router.get("/category/{category}", response_model=List[SkillResponse])
def get_skills_by_category(
    category: str,
    db: Session = Depends(get_db)
):
    """Get skills by category."""
    service = SkillService(db)
    return service.get_skills_by_category(category)

@router.get("/{skill_id}", response_model=SkillResponse)
def get_skill(
    skill_id: str,
    db: Session = Depends(get_db)
):
    """Get skill by ID."""
    service = SkillService(db)
    skill = service.get_skill(skill_id)
    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )
    return skill

@router.put("/{skill_id}", response_model=SkillResponse)
def update_skill(
    skill_id: str,
    skill_data: SkillUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Update skill."""
    service = SkillService(db)
    skill = service.update_skill(skill_id, skill_data)
    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )
    return skill

@router.delete("/{skill_id}")
def delete_skill(
    skill_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Delete skill."""
    service = SkillService(db)
    success = service.delete_skill(skill_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found"
        )
 