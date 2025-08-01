from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ...db.session import get_db
from ...schemas.score import ScoreCreate, ScoreUpdate, ScoreResponse, ScoreWithDetails
from ...services.score_service import ScoreService
from ...api.dependencies import get_current_trainer, get_current_manager

router = APIRouter(prefix="/scores", tags=["scores"])

@router.post("/", response_model=ScoreResponse)
def create_score(
    score_data: ScoreCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_trainer)
):
    """Create a new score."""
    service = ScoreService(db)
    return service.create_score(score_data)

@router.get("/", response_model=List[ScoreResponse])
def get_scores(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Get all scores."""
    service = ScoreService(db)
    return service.get_scores(skip, limit)

@router.get("/employee/{employee_id}", response_model=List[ScoreResponse])
def get_scores_by_employee(
    employee_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Get scores for a specific employee."""
    service = ScoreService(db)
    return service.get_scores_by_employee(employee_id)

@router.get("/{score_id}", response_model=ScoreResponse)
def get_score(
    score_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Get score by ID."""
    service = ScoreService(db)
    score = service.get_score(score_id)
    if not score:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Score not found"
        )
    return score

@router.get("/{score_id}/details", response_model=ScoreWithDetails)
def get_score_with_details(
    score_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Get score with additional details."""
    service = ScoreService(db)
    score = service.get_score_with_details(score_id)
    if not score:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Score not found"
        )
    return score

@router.put("/{score_id}", response_model=ScoreResponse)
def update_score(
    score_id: str,
    score_data: ScoreUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_trainer)
):
    """Update score."""
    service = ScoreService(db)
    score = service.update_score(score_id, score_data)
    if not score:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Score not found"
        )
    return score

@router.delete("/{score_id}")
def delete_score(
    score_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Delete score."""
    service = ScoreService(db)
    success = service.delete_score(score_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Score not found"
        )
    return {"message": "Score deleted successfully"}

@router.get("/employee/{employee_id}/average")
def get_employee_average_score(
    employee_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Get average score for an employee."""
    service = ScoreService(db)
    average = service.get_employee_average_score(employee_id)
    if average is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No scores found for employee"
        )
    return {"employee_id": employee_id, "average_score": average} 