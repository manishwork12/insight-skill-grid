# Frontend-Backend Integration Guide

This guide explains how to integrate the React frontend with the FastAPI backend.

## 🚀 Quick Start

### 1. Start the Backend

```bash
cd backend
pip install -r requirements.txt
python3 init_db.py
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Start the Frontend

```bash
cd frontend
npm install
cp env.example .env
npm run dev
```

## 🔧 Configuration

### Frontend Environment Variables

Create `.env` file in the `frontend/` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api/v1

# Mock Data Mode (set to 'true' to use mock data instead of API)
VITE_MOCK_MODE=false

# Feature Flags
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_PROFILE_EDITING=true
```

### Backend Environment Variables

Create `.env` file in the `backend/` directory:

```env
# Database Configuration
DATABASE_URL=sqlite:///./skills_tracking.db

# Security
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Settings
FRONTEND_URL=http://localhost:8080

# Environment
ENVIRONMENT=development
DEBUG=true
```

## 🔐 Authentication Flow

### Login Process

1. **Frontend**: User enters email/password
2. **Frontend**: Calls `POST /api/v1/auth/login`
3. **Backend**: Validates credentials, returns JWT token
4. **Frontend**: Stores token in localStorage
5. **Frontend**: Includes token in subsequent API calls

### API Calls with Authentication

All authenticated API calls include the JWT token in the Authorization header:

```typescript
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

## 📡 API Endpoints

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

### Trainers
- `GET /api/v1/trainers/` - List all trainers
- `POST /api/v1/trainers/` - Create trainer
- `GET /api/v1/trainers/{id}` - Get trainer by ID
- `PUT /api/v1/trainers/{id}` - Update trainer
- `DELETE /api/v1/trainers/{id}` - Delete trainer

### Skills
- `GET /api/v1/skills/` - List all skills
- `POST /api/v1/skills/` - Create skill
- `GET /api/v1/skills/{id}` - Get skill by ID
- `PUT /api/v1/skills/{id}` - Update skill
- `DELETE /api/v1/skills/{id}` - Delete skill

### Scores
- `GET /api/v1/scores/` - List all scores
- `POST /api/v1/scores/` - Create score
- `GET /api/v1/scores/{id}` - Get score by ID
- `PUT /api/v1/scores/{id}` - Update score
- `DELETE /api/v1/scores/{id}` - Delete score

## 🧪 Testing the Integration

### 1. Test Authentication

```bash
# Test login
curl -X POST "http://localhost:8000/api/v1/auth/login" \
     -H "Content-Type: application/json" \
     -d '{"email": "john.employee@company.com", "password": "password123"}'
```

### 2. Test API Endpoints

```bash
# Get all skills
curl "http://localhost:8000/api/v1/skills/"

# Get all employees (requires auth)
curl "http://localhost:8000/api/v1/employees/" \
     -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Test Frontend

1. Open `http://localhost:8080`
2. Login with sample credentials:
   - **Employee**: john.employee@company.com / password123
   - **Trainer**: sarah.trainer@company.com / password123
   - **Manager**: mike.manager@company.com / password123
   - **Admin**: admin@company.com / password123

## 🔄 Data Flow

### Frontend → Backend
1. User interacts with React components
2. Components call service functions
3. Service functions make HTTP requests to FastAPI
4. FastAPI processes requests and returns responses
5. Frontend updates UI with response data

### Backend → Frontend
1. FastAPI receives HTTP requests
2. Validates JWT tokens for authentication
3. Processes business logic
4. Returns JSON responses
5. Frontend receives and displays data

## 🛠️ Development Mode

### Mock Mode
Set `VITE_MOCK_MODE=true` in frontend `.env` to use mock data instead of API calls.

### API Mode
Set `VITE_MOCK_MODE=false` (or remove the variable) to use real API calls.

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured for `http://localhost:8080`
   - Check that frontend is running on port 8080

2. **Authentication Errors**
   - Verify JWT token is being sent in Authorization header
   - Check token expiration (default: 30 minutes)

3. **Database Errors**
   - Run `python3 init_db.py` to initialize database
   - Check database file permissions

4. **Port Conflicts**
   - Backend: Port 8000
   - Frontend: Port 8080
   - Ensure ports are available

### Debug Mode

Enable debug logging in backend:

```python
# In backend/app/core/config.py
DEBUG = True
```

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🔒 Security Notes

- JWT tokens are stored in localStorage (consider httpOnly cookies for production)
- CORS is configured for development only
- Database uses SQLite for development (use PostgreSQL for production)
- Passwords are hashed with bcrypt
- All API endpoints require authentication except login/register 