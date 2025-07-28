from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ...db.session import get_db
from ...schemas.trainer import TrainerCreate, TrainerUpdate, TrainerResponse
from ...services.trainer_service import TrainerService
from ...api.dependencies import get_current_manager, get_current_trainer

router = APIRouter(prefix="/trainers", tags=["trainers"])

@router.post("/", response_model=TrainerResponse)
def create_trainer(
    trainer_data: TrainerCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Create a new trainer."""
    service = TrainerService(db)
    return service.create_trainer(trainer_data)

@router.get("/", response_model=List[TrainerResponse])
def get_trainers(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Get all trainers."""
    service = TrainerService(db)
    return service.get_trainers(skip, limit)

@router.get("/{trainer_id}", response_model=TrainerResponse)
def get_trainer(
    trainer_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Get trainer by ID."""
    service = TrainerService(db)
    trainer = service.get_trainer(trainer_id)
    if not trainer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trainer not found"
        )
    return trainer

@router.put("/{trainer_id}", response_model=TrainerResponse)
def update_trainer(
    trainer_id: str,
    trainer_data: TrainerUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Update trainer."""
    service = TrainerService(db)
    trainer = service.update_trainer(trainer_id, trainer_data)
    if not trainer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trainer not found"
        )
    return trainer

@router.delete("/{trainer_id}")
def delete_trainer(
    trainer_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Delete trainer."""
    service = TrainerService(db)
    success = service.delete_trainer(trainer_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trainer not found"
        )
    return {"message": "Trainer deleted successfully"}

@router.get("/me/profile", response_model=TrainerResponse)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_trainer)
):
    """Get current trainer's profile."""
    service = TrainerService(db)
    trainer = service.get_trainer(current_user.id)
    if not trainer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trainer not found"
        )
    return trainer 