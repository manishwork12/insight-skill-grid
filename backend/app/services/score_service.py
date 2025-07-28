from sqlalchemy.orm import Session
from typing import List, Optional
from ..db import crud
from ..schemas.score import ScoreCreate, ScoreUpdate, ScoreResponse, ScoreWithDetails

class ScoreService:
    def __init__(self, db: Session):
        self.db = db
    
    def create_score(self, score_data: ScoreCreate) -> ScoreResponse:
        """Create a new score."""
        db_score = crud.create_score(
            db=self.db,
            employee_id=score_data.employee_id,
            skill_id=score_data.skill_id,
            score=score_data.score,
            trainer_id=score_data.trainer_id,
            feedback=score_data.feedback
        )
        return ScoreResponse.model_validate(db_score)
    
    def get_score(self, score_id: str) -> Optional[ScoreResponse]:
        """Get score by ID."""
        db_score = crud.get_score(self.db, score_id)
        if db_score:
            return ScoreResponse.model_validate(db_score)
        return None
    
    def get_scores(self, skip: int = 0, limit: int = 100) -> List[ScoreResponse]:
        """Get all scores."""
        db_scores = crud.get_scores(self.db, skip, limit)
        return [ScoreResponse.model_validate(score) for score in db_scores]
    
    def get_scores_by_employee(self, employee_id: str) -> List[ScoreResponse]:
        """Get scores for a specific employee."""
        db_scores = crud.get_scores_by_employee(self.db, employee_id)
        return [ScoreResponse.model_validate(score) for score in db_scores]
    
    def get_score_with_details(self, score_id: str) -> Optional[ScoreWithDetails]:
        """Get score with additional details."""
        db_score = crud.get_score(self.db, score_id)
        if db_score:
            # Get related data
            skill = crud.get_skill(self.db, db_score.skill_id)
            trainer = crud.get_user(self.db, db_score.trainer_id)
            employee = crud.get_user(self.db, db_score.employee_id)
            
            score_data = ScoreResponse.model_validate(db_score)
            return ScoreWithDetails(
                **score_data.model_dump(),
                skill_name=skill.name if skill else None,
                trainer_name=trainer.name if trainer else None,
                employee_name=employee.name if employee else None
            )
        return None
    
    def update_score(self, score_id: str, score_data: ScoreUpdate) -> Optional[ScoreResponse]:
        """Update score."""
        db_score = crud.update_score(self.db, score_id, **score_data.model_dump(exclude_unset=True))
        if db_score:
            return ScoreResponse.model_validate(db_score)
        return None
    
    def delete_score(self, score_id: str) -> bool:
        """Delete score."""
        return crud.delete_score(self.db, score_id)
    
    def get_employee_average_score(self, employee_id: str) -> Optional[float]:
        """Get average score for an employee."""
        scores = self.get_scores_by_employee(employee_id)
        if scores:
            return sum(score.score for score in scores) / len(scores)
        return None 