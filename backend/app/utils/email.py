from typing import Optional
from ..core.config import settings

def send_email(to_email: str, subject: str, body: str) -> bool:
    """
    Mock email sending function.
    In production, this would integrate with a real email service.
    """
    if settings.smtp_host and settings.smtp_user and settings.smtp_password:
        # TODO: Implement real email sending logic
        print(f"Mock email sent to {to_email}: {subject}")
        return True
    else:
        print(f"Email configuration not set. Mock email to {to_email}: {subject}")
        return True

def send_password_reset_email(email: str, reset_token: str) -> bool:
    """Send password reset email."""
    subject = "Password Reset Request"
    body = f"Your password reset token is: {reset_token}"
    return send_email(email, subject, body)

def send_welcome_email(email: str, name: str) -> bool:
    """Send welcome email to new users."""
    subject = "Welcome to Skills Tracking Portal"
    body = f"Welcome {name}! Your account has been created successfully."
    return send_email(email, subject, body) 