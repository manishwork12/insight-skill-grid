import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.db.session import get_db
from app.db import crud

client = TestClient(app)


def create_super_user(db):
    existing = crud.get_user_by_email(db, "admin@example.com")
    if existing:
        return existing
    return crud.create_user(
        db=db,
        email="admin@example.com",
        name="Admin",
        password="adminpass",
        role="super-user"
    )


def get_auth_headers(token: str):
    return {"Authorization": f"Bearer {token}"}


def login(email: str, password: str):
    resp = client.post("/api/v1/auth/login", json={"email": email, "password": password})
    assert resp.status_code == 200
    return resp.json()["access_token"]


def test_manager_crud_flow():
    db = next(get_db())
    super_user = create_super_user(db)
    token = login("admin@example.com", "adminpass")

    # Create manager
    create_payload = {
        "email": "manager1@example.com",
        "name": "Manager One",
        "password": "managerpass",
        "department": "Ops",
        "experience": 5
    }
    resp = client.post("/api/v1/managers/", json=create_payload, headers=get_auth_headers(token))
    assert resp.status_code == 201, resp.text
    manager = resp.json()
    manager_id = manager["id"]

    # List managers
    resp = client.get("/api/v1/managers/", headers=get_auth_headers(token))
    assert resp.status_code == 200
    managers = resp.json()
    assert any(m["id"] == manager_id for m in managers)

    # Get single manager
    resp = client.get(f"/api/v1/managers/{manager_id}", headers=get_auth_headers(token))
    assert resp.status_code == 200
    assert resp.json()["email"] == "manager1@example.com"

    # Update manager
    update_payload = {"name": "Manager 1 Updated", "experience": 6}
    resp = client.put(f"/api/v1/managers/{manager_id}", json=update_payload, headers=get_auth_headers(token))
    assert resp.status_code == 200
    assert resp.json()["name"] == "Manager 1 Updated"
    assert resp.json()["experience"] == 6

    # Delete manager
    resp = client.delete(f"/api/v1/managers/{manager_id}", headers=get_auth_headers(token))
    assert resp.status_code == 204

    # Confirm removed
    resp = client.get(f"/api/v1/managers/{manager_id}", headers=get_auth_headers(token))
    assert resp.status_code == 404 