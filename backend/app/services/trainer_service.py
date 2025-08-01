from sqlalchemy.orm import Session
from typing import List, Optional
from ..db import crud
from ..db.models import User
from ..schemas.trainer import TrainerCreate, TrainerUpdate, TrainerResponse
from ..utils.email import send_welcome_email

class TrainerService:
    def __init__(self, db: Session):
        self.db = db
    
    def create_trainer(self, trainer_data: TrainerCreate) -> TrainerResponse:
        """Create a new trainer."""
        db_trainer = crud.create_user(
            db=self.db,
            email=trainer_data.email,
            name=trainer_data.name,
            password=trainer_data.password,
            role="trainer",
            avatar=trainer_data.avatar,
            department=trainer_data.department,
            experience=trainer_data.experience
        )
        
        # Send welcome email
        send_welcome_email(trainer_data.email, trainer_data.name)
        
        return TrainerResponse.model_validate(db_trainer)
    
    def get_trainer(self, trainer_id: str) -> Optional[TrainerResponse]:
        """Get trainer by ID."""
        db_trainer = crud.get_user(self.db, trainer_id)
        if db_trainer and db_trainer.role == "trainer":
            return TrainerResponse.model_validate(db_trainer)
        return None
    
    def get_trainers(self, skip: int = 0, limit: int = 100) -> List[TrainerResponse]:
        """Get all trainers."""
        db_trainers = crud.get_users(self.db, skip, limit)
        return [
            TrainerResponse.model_validate(trainer) 
            for trainer in db_trainers 
            if trainer.role == "trainer"
        ]
    
    def update_trainer(self, trainer_id: str, trainer_data: TrainerUpdate) -> Optional[TrainerResponse]:
        """Update trainer."""
        db_trainer = crud.update_user(self.db, trainer_id, **trainer_data.model_dump(exclude_unset=True))
        if db_trainer and db_trainer.role == "trainer":
            return TrainerResponse.model_validate(db_trainer)
        return None
    
    def delete_trainer(self, trainer_id: str) -> bool:
        """Delete trainer."""
        db_trainer = crud.get_user(self.db, trainer_id)
        if db_trainer and db_trainer.role == "trainer":
            return crud.delete_user(self.db, trainer_id)
        return False 