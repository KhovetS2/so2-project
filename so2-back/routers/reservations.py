from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from pydantic import Json
from database import schemas
from sqlalchemy.orm import Session
from models import user_crud
from database.database import get_db
from typing import Annotated, Optional
import json

router = APIRouter(tags=["reservations"])


# Reservations rotas


@router.get("/reservations/{id}", response_model=Optional[schemas.ReservationsAll])
async def get_reservations(
    id: int,
    db: Session = Depends(get_db),
):
    """Rota para buscar reservationso pelo id"""
    return user_crud.get_reservations(id=id, db=db)


@router.get("/reservations", response_model=Optional[list[schemas.ReservationsAll]])
async def get_reservations_all(
    db: Session = Depends(get_db),
):
    """Rota para buscar reservationso pelo id"""
    return user_crud.get_all_reservations(db=db)


@ router.post("/reservations/", )
async def create_reservations(
    reservations: schemas.ReservationsCreate,
    db: Session = Depends(get_db),
):
    """Rota para criar um novo reservationso"""

    return user_crud.create_reservations(db=db, reservation=reservations)


@ router.put("/reservations/", response_model=Optional[schemas.Reservations])
async def update_reservations(
    reservations: schemas.ReservationsUpdate,
    db: Session = Depends(get_db),
):
    """Rota para alterar reservationso pelo id"""
    return user_crud.update_reservations(reservation=reservations, db=db)


@ router.delete("/reservations/{id}")
async def delete_reservations(
    id: int,
    db: Session = Depends(get_db),
):
    """Rota para deletar reservationso pelo id"""
    return user_crud.delete_reservations(id=id, db=db)
