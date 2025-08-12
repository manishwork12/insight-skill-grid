#!/usr/bin/env python3
"""
Database initialization script with sample data
"""

from app.db.base import engine
from app.db import models
from app.db import crud
from app.utils.password import get_password_hash

def init_db():
    """Initialize database with sample data."""
    # Create tables
    models.Base.metadata.create_all(bind=engine)
    
    # Get database session
    from app.db.session import get_db
    db = next(get_db())
    
    try:
        # Create sample skills
        skills_data = [
            {"name": "JavaScript", "category": "Programming", "description": "Frontend programming language"},
            {"name": "React", "category": "Frontend", "description": "JavaScript library for building user interfaces"},
            {"name": "Python", "category": "Programming", "description": "Backend programming language"},
            {"name": "FastAPI", "category": "Backend", "description": "Modern web framework for building APIs"},
            {"name": "SQL", "category": "Database", "description": "Database query language"},
            {"name": "Docker", "category": "DevOps", "description": "Containerization platform"},
        ]
        
        for skill_data in skills_data:
            existing_skill = crud.get_skills(db)
            skill_names = [skill.name for skill in existing_skill]
            if skill_data["name"] not in skill_names:
                crud.create_skill(
                    db=db,
                    name=skill_data["name"],
                    category=skill_data["category"],
                    description=skill_data["description"]
                )
        
        # Create sample users
        users_data = [
            {
                "email": "john.employee@company.com",
                "name": "John Smith",
                "password": "password123",
                "role": "employee",
                "department": "Engineering",
                "experience": 3,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            },
            {
                "email": "sarah.trainer@company.com",
                "name": "Sarah Johnson",
                "password": "password123",
                "role": "trainer",
                "department": "Training",
                "experience": 8,
                "avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            },
            {
                "email": "mike.manager@company.com",
                "name": "Mike Wilson",
                "password": "password123",
                "role": "manager",
                "department": "Management",
                "experience": 12,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            },
            {
                "email": "admin@company.com",
                "name": "System Administrator",
                "password": "password123",
                "role": "super-user",
                "department": "IT Administration",
                "experience": 15,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            }
        ]
        
        for user_data in users_data:
            existing_user = crud.get_user_by_email(db, user_data["email"])
            if not existing_user:
                crud.create_user(
                    db=db,
                    email=user_data["email"],
                    name=user_data["name"],
                    password=user_data["password"],
                    role=user_data["role"],
                    avatar=user_data["avatar"],
                    department=user_data["department"],
                    experience=user_data["experience"]
                )
        
        print("Database initialized successfully!")
        print("Sample users created:")
        print("- john.employee@company.com (password: password123)")
        print("- sarah.trainer@company.com (password: password123)")
        print("- mike.manager@company.com (password: password123)")
        print("- admin@company.com (password: password123)")
        
    except Exception as e:
        print(f"Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db() 