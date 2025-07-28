# Quick Setup Guide

## Prerequisites
- Python 3.8+
- pip

## Installation

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment:**
   ```bash
   cp env.example .env
   # Edit .env if needed (defaults work for development)
   ```

3. **Initialize database with sample data:**
   ```bash
   python3 init_db.py
   ```

4. **Start the server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## Test the API

1. **Visit the API docs:** http://localhost:8000/docs

2. **Test login with sample user:**
   ```bash
   curl -X POST "http://localhost:8000/api/v1/auth/login" \
        -H "Content-Type: application/json" \
        -d '{"email": "john.employee@company.com", "password": "password123"}'
   ```

3. **Get all skills:**
   ```bash
   curl "http://localhost:8000/api/v1/skills/"
   ```

## Sample Users

- **Employee**: john.employee@company.com / password123
- **Trainer**: sarah.trainer@company.com / password123  
- **Manager**: mike.manager@company.com / password123
- **Admin**: admin@company.com / password123

## Frontend Integration

The backend is configured to work with the frontend running on `http://localhost:8080`. CORS is enabled to allow cross-origin requests.

## API Base URL

All API endpoints are prefixed with `/api/v1/`:
- Authentication: `/api/v1/auth/`
- Employees: `/api/v1/employees/`
- Trainers: `/api/v1/trainers/`
- Skills: `/api/v1/skills/`
- Scores: `/api/v1/scores/` 