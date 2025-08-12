from sqlalchemy.orm import Session
from typing import List, Optional
from ..db import crud
from ..schemas.manager import ManagerCreate, ManagerUpdate, ManagerOut
from ..utils.email import send_welcome_email

class ManagerService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_managers(self, skip: int = 0, limit: int = 100) -> List[ManagerOut]:
        users = crud.get_users(self.db, skip, limit)
        return [ManagerOut.model_validate(u) for u in users if u.role == "manager"]

    def get_manager_by_id(self, manager_id: str) -> Optional[ManagerOut]:
        user = crud.get_user(self.db, manager_id)
        if user and user.role == "manager":
            return ManagerOut.model_validate(user)
        return None

    def create_manager(self, manager_in: ManagerCreate) -> ManagerOut:
        user = crud.create_user(
            db=self.db,
            email=manager_in.email,
            name=manager_in.name,
            password=manager_in.password,
            role="manager",
            avatar=manager_in.avatar,
            department=manager_in.department,
            experience=manager_in.experience,
        )
        send_welcome_email(manager_in.email, manager_in.name)
        return ManagerOut.model_validate(user)

    def update_manager(self, manager_id: str, manager_in: ManagerUpdate) -> Optional[ManagerOut]:
        updated = crud.update_user(self.db, manager_id, **manager_in.model_dump(exclude_unset=True))
        if updated and updated.role == "manager":
            return ManagerOut.model_validate(updated)
        return None

    def delete_manager(self, manager_id: str) -> bool:
        user = crud.get_user(self.db, manager_id)
        if user and user.role == "manager":
            return crud.delete_user(self.db, manager_id)
        return False 