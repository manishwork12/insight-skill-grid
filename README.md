# ? Employee Skills Tracking Portal

A comprehensive full-stack application for managing employee skills, feedback, training status, and more. This portal supports trainers, managers, and employees with role-based access, filtering, performance tracking, and notifications.

---

## ? Tech Stack

### Frontend
- ? [Vite](https://vitejs.dev/)
- ?? [React](https://reactjs.org/)
- ? [TypeScript](https://www.typescriptlang.org/)
- ? [Tailwind CSS](https://tailwindcss.com/)
- ? [shadcn/ui](https://ui.shadcn.com/)

### Backend
- ? [FastAPI](https://fastapi.tiangolo.com/)
- ? [SQLAlchemy](https://www.sqlalchemy.org/)
- ? [Pydantic](https://pydantic-docs.helpmanual.io/)
- ? [JWT Authentication](https://jwt.io/)
- ? [Python](https://www.python.org/)

---

## ?? Local Development Setup

Make sure Node.js (v18+) and Python (3.8+) are installed. We recommend using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to manage Node.js versions.

### Full Stack Setup

```bash
# 1. Clone the repository
git clone https://github.com/SAIEE12/Employee-Skills-Tracking-Portal.git

# 2. Navigate to the project directory
cd Employee-Skills-Tracking-Portal

# 3. Setup Backend
cd backend
pip install -r requirements.txt
python3 init_db.py  # Initialize database with sample data
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# 4. Setup Frontend (in a new terminal)
cd ../frontend
npm i
cp env.example .env  # Configure environment variables
npm run dev
```

### Frontend Only (Mock Mode)

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm i

# 3. Enable mock mode
echo "VITE_MOCK_MODE=true" > .env

# 4. Start the development server
npm run dev
```
