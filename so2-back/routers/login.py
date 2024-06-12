from fastapi import APIRouter, Depends, HTTPException, status
from database import schemas
from sqlalchemy.orm import Session
from models import user_crud
from database.database import get_db

router = APIRouter(tags=["Login"])


@router.post("/login")
async def login(login: schemas.Login, db: Session = Depends(get_db)):
    user = user_crud.get_user_by_email(email=login.email, db=db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Usuário não exite"
        )
    if not login.password == user.password:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"Invalid Credentials"
        )
    return {"logar": True}
