from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ...db.session import get_db
from ...schemas.employee import EmployeeCreate, EmployeeUpdate, EmployeeResponse, EmployeeWithScores
from ...services.employee_service import EmployeeService
from ...api.dependencies import get_current_manager, get_current_employee

router = APIRouter(prefix="/employees", tags=["employees"])

@router.post("/", response_model=EmployeeResponse)
def create_employee(
    employee_data: EmployeeCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Create a new employee."""
    service = EmployeeService(db)
    return service.create_employee(employee_data)

@router.get("/", response_model=List[EmployeeResponse])
def get_employees(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Get all employees."""
    service = EmployeeService(db)
    return service.get_employees(skip, limit)

@router.get("/{employee_id}", response_model=EmployeeResponse)
def get_employee(
    employee_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Get employee by ID."""
    service = EmployeeService(db)
    employee = service.get_employee(employee_id)
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    return employee

@router.get("/{employee_id}/with-scores", response_model=EmployeeWithScores)
def get_employee_with_scores(
    employee_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Get employee with their scores."""
    service = EmployeeService(db)
    employee = service.get_employee_with_scores(employee_id)
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    return employee

@router.put("/{employee_id}", response_model=EmployeeResponse)
def update_employee(
    employee_id: str,
    employee_data: EmployeeUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Update employee."""
    service = EmployeeService(db)
    employee = service.update_employee(employee_id, employee_data)
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    return employee

@router.delete("/{employee_id}")
def delete_employee(
    employee_id: str,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_manager)
):
    """Delete employee."""
    service = EmployeeService(db)
    success = service.delete_employee(employee_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    return {"message": "Employee deleted successfully"}

@router.get("/me/profile", response_model=EmployeeResponse)
def get_my_profile(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_employee)
):
    """Get current employee's profile."""
    service = EmployeeService(db)
    employee = service.get_employee(current_user.id)
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    return employee 