from sqlalchemy.orm import Session
from typing import List, Optional
from ..db import crud
from ..db.models import User
from ..schemas.employee import EmployeeCreate, EmployeeUpdate, EmployeeResponse, EmployeeWithScores
from ..utils.email import send_welcome_email

class EmployeeService:
    def __init__(self, db: Session):
        self.db = db
    
    def create_employee(self, employee_data: EmployeeCreate) -> EmployeeResponse:
        """Create a new employee."""
        db_employee = crud.create_user(
            db=self.db,
            email=employee_data.email,
            name=employee_data.name,
            password=employee_data.password,
            role="employee",
            avatar=employee_data.avatar,
            department=employee_data.department,
            experience=employee_data.experience
        )
        
        # Send welcome email
        send_welcome_email(employee_data.email, employee_data.name)
        
        return EmployeeResponse.model_validate(db_employee)
    
    def get_employee(self, employee_id: str) -> Optional[EmployeeResponse]:
        """Get employee by ID."""
        db_employee = crud.get_user(self.db, employee_id)
        if db_employee and db_employee.role == "employee":
            return EmployeeResponse.model_validate(db_employee)
        return None
    
    def get_employees(self, skip: int = 0, limit: int = 100) -> List[EmployeeResponse]:
        """Get all employees."""
        db_employees = crud.get_users(self.db, skip, limit)
        return [
            EmployeeResponse.model_validate(emp) 
            for emp in db_employees 
            if emp.role == "employee"
        ]
    
    def update_employee(self, employee_id: str, employee_data: EmployeeUpdate) -> Optional[EmployeeResponse]:
        """Update employee."""
        db_employee = crud.update_user(self.db, employee_id, **employee_data.model_dump(exclude_unset=True))
        if db_employee and db_employee.role == "employee":
            return EmployeeResponse.model_validate(db_employee)
        return None
    
    def delete_employee(self, employee_id: str) -> bool:
        """Delete employee."""
        db_employee = crud.get_user(self.db, employee_id)
        if db_employee and db_employee.role == "employee":
            return crud.delete_user(self.db, employee_id)
        return False
    
    def get_employee_with_scores(self, employee_id: str) -> Optional[EmployeeWithScores]:
        """Get employee with their scores."""
        db_employee = crud.get_user(self.db, employee_id)
        if db_employee and db_employee.role == "employee":
            return EmployeeWithScores.model_validate(db_employee)
        return None 