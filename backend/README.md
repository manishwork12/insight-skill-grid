# Employee Skills Tracking Portal - Backend

A FastAPI backend for the Employee Skills Tracking Portal with role-based authentication and comprehensive CRUD operations.

## Features

- **FastAPI** with automatic API documentation
- **SQLAlchemy** ORM with SQLite/PostgreSQL support
- **JWT Authentication** with role-based access control
- **Pydantic** models for request/response validation
- **CORS** enabled for frontend integration
- **Modular architecture** with services, schemas, and routes

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── employees.py
│   │   │   ├── trainers.py
│   │   │   ├── skills.py
│   │   │   └── scores.py
│   │   └── dependencies.py
│   ├── core/
│   │   ├── config.py
│   │   └── security.py
│   ├── db/
│   │   ├── base.py
│   │   ├── models.py
│   │   ├── crud.py
│   │   └── session.py
│   ├── schemas/
│   │   ├── auth.py
│   │   ├── employee.py
│   │   ├── trainer.py
│   │   ├── skill.py
│   │   └── score.py
│   ├── services/
│   │   ├── employee_service.py
│   │   ├── trainer_service.py
│   │   ├── skill_service.py
│   │   └── score_service.py
│   ├── utils/
│   │   ├── password.py
│   │   └── email.py
│   └── main.py
├── requirements.txt
├── env.example
└── README.md
```

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment configuration:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Run the application:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/register` - Register new user
- `GET /api/v1/auth/me` - Get current user info

### Employees
- `GET /api/v1/employees/` - List all employees
- `POST /api/v1/employees/` - Create employee
- `GET /api/v1/employees/{id}` - Get employee by ID
- `PUT /api/v1/employees/{id}` - Update employee
- `DELETE /api/v1/employees/{id}` - Delete employee
- `GET /api/v1/employees/{id}/with-scores` - Get employee with scores
- `GET /api/v1/employees/me/profile` - Get current employee profile

### Trainers
- `GET /api/v1/trainers/` - List all trainers
- `POST /api/v1/trainers/` - Create trainer
- `GET /api/v1/trainers/{id}` - Get trainer by ID
- `PUT /api/v1/trainers/{id}` - Update trainer
- `DELETE /api/v1/trainers/{id}` - Delete trainer
- `GET /api/v1/trainers/me/profile` - Get current trainer profile

### Skills
- `GET /api/v1/skills/` - List all skills
- `POST /api/v1/skills/` - Create skill
- `GET /api/v1/skills/{id}` - Get skill by ID
- `PUT /api/v1/skills/{id}` - Update skill
- `DELETE /api/v1/skills/{id}` - Delete skill
- `GET /api/v1/skills/category/{category}` - Get skills by category

### Scores
- `GET /api/v1/scores/` - List all scores
- `POST /api/v1/scores/` - Create score
- `GET /api/v1/scores/{id}` - Get score by ID
- `PUT /api/v1/scores/{id}` - Update score
- `DELETE /api/v1/scores/{id}` - Delete score
- `GET /api/v1/scores/{id}/details` - Get score with details
- `GET /api/v1/scores/employee/{id}` - Get scores by employee
- `GET /api/v1/scores/employee/{id}/average` - Get employee average score

## Role-Based Access Control

- **Employee**: Can view own profile and scores
- **Trainer**: Can create/update scores, view employees
- **Manager**: Can manage employees, trainers, skills, and scores
- **Super User**: Full administrative access

## Database Models

- **User**: Base user model with roles
- **Skill**: Skills that can be assessed
- **Score**: Assessment scores with feedback
- **LearningPath**: Learning paths for employees
- **LearningStep**: Individual steps in learning paths
- **Notification**: User notifications

## Environment Variables

- `DATABASE_URL`: Database connection string
- `SECRET_KEY`: JWT secret key
- `ALGORITHM`: JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time
- `FRONTEND_URL`: Frontend URL for CORS

## Development

The backend is configured to work with the frontend running on `http://localhost:8080`. CORS is enabled to allow cross-origin requests from the frontend.

## API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc` 