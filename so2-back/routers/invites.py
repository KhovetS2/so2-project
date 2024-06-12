from fastapi import APIRouter, Depends, HTTPException
from database import schemas
from sqlalchemy.orm import Session
from database.database import get_db
from typing import Optional, Annotated
from models import user_crud

router = APIRouter(tags=["Processes_Users"])


# Processo Usuario rotas


@router.get(
    "/invites",
    response_model=Optional[list[schemas.Invites]],
)
async def get_all_invite(
    db: Session = Depends(get_db),
):
    """Rota para buscar todas as relação Usuario-inviteso"""
    invite = user_crud.get_all_invites(
        db=db
    )
    if not invite:
        raise HTTPException(
            status_code=404, detail="Relação de inviteso e usuário não encontrada "
        )
    return invite


@router.post("/invites/", response_model=Optional[schemas.InvitesCreate])
async def create_invite(
    invite: schemas.InvitesCreate,
    db: Session = Depends(get_db),
):
    """Rota para criar uma relação Usuario-inviteso"""
    return user_crud.create_invites(db=db, invites=invite)


@router.delete("/invites/", response_model=Optional[schemas.InvitesBase])
def delete_invite(
    invite: schemas.InvitesBase,
    db: Session = Depends(get_db),
):
    """Rota para deletar uma relação Usuario-inviteso"""
    return user_crud.delete_invites(db=db, user_id=invite.user_id, reservation_id=invite.reservation_id)
