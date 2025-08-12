from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ...db.session import get_db
from ...schemas.manager import ManagerCreate, ManagerUpdate, ManagerOut
from ...services.manager_service import ManagerService
from ...api.dependencies import get_current_super_user

router = APIRouter(prefix="/managers", tags=["managers"])

@router.get("/", response_model=List[ManagerOut])
def get_managers(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_super_user)
):
    service = ManagerService(db)
    return service.get_all_managers(skip, limit)

@router.get("/{manager_id}", response_model=ManagerOut)
def get_manager(
    manager_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_super_user)
):
    service = ManagerService(db)
    manager = service.get_manager_by_id(manager_id)
    if not manager:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Manager not found")
    return manager

@router.post("/", response_model=ManagerOut, status_code=status.HTTP_201_CREATED)
def create_manager(
    manager_in: ManagerCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_super_user)
):
    service = ManagerService(db)
    return service.create_manager(manager_in)

@router.put("/{manager_id}", response_model=ManagerOut)
def update_manager(
    manager_id: str,
    manager_in: ManagerUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_super_user)
):
    service = ManagerService(db)
    updated = service.update_manager(manager_id, manager_in)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Manager not found")
    return updated

@router.delete("/{manager_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_manager(
    manager_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_super_user)
):
    service = ManagerService(db)
    deleted = service.delete_manager(manager_id)
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Manager not found")
    return None 