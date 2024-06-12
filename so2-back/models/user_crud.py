from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session
from database import schemas
from database.database import Base, get_db
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey,  BLOB, Text
from sqlalchemy.orm import relationship, Mapped, mapped_column
from typing import List


class User(Base):

    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(60))
    email = Column(String(64), unique=True, index=True)
    password = Column(String(64))
    invitations: Mapped[List["Invites"]] = relationship(
        back_populates="user"
    )
    reservations = relationship("Reservations")


def get_user(db: Session, id: int):
    return db.query(User).filter(User.id == id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_all_user(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = User(
        email=user.email,
        name=user.name,
        password=user.password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user: schemas.User):
    db_user = db.query(User).filter(User.id == user.id).first()

    if db_user:
        db_user.email = user.email
        db_user.name = user.name
        db_user.password = user.password
        db.commit()
        db.refresh(db_user)

    return db_user


def delete_user(db: Session, id: int):
    """Recebe o sessão do banco e o id do usuario a ser deletado, primeiro realiza a busca dele no banco, se ele existir, o deleta e salva a alteração no banco"""
    db_user = db.query(User).filter(User.id == id).first()

    if db_user:
        db.delete(db_user)
        db.commit()

    return db_user


class Reservations(Base):

    __tablename__ = "reservation"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    idReservation = Column(String(60))
    foto = Column(Text())
    name_room = Column(String(60))
    start_hour = Column(String(60))
    end_hour = Column(String(60))
    responsible = Column(ForeignKey(User.id))
    use_reason = Column(String(300))
    general_info = Column(String(200))
    invitations: Mapped[List["Invites"]] = relationship(
        back_populates="reservation")


def get_reservations(db: Session, id: int):
    return db.query(Reservations).filter(Reservations.id == id).first()


def get_all_reservations(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Reservations)
        .order_by(Reservations.id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_reservations(db: Session, reservation: schemas.ReservationsCreate):
    db_reservations = Reservations(
        foto=reservation.foto,
        idReservation=reservation.idReservation,
        name_room=reservation.name_room,
        start_hour=reservation.start_hour,
        end_hour=reservation.end_hour,
        responsible=reservation.responsible,
        use_reason=reservation.use_reason,
        general_info=reservation.general_info,
    )
    db.add(db_reservations)
    db.commit()
    db.refresh(db_reservations)
    return db_reservations


def update_reservations(db: Session, reservation: schemas.ReservationsUpdate):
    db_reservations = db.query(Reservations).filter(
        Reservations.id == reservation.id).first()

    if db_reservations:
        db_reservations.idReservation = reservation.idReservation
        db_reservations.name_room = reservation.name_room
        db_reservations.start_hour = reservation.start_hour
        db_reservations.end_hour = reservation.end_hour
        db_reservations.responsible = reservation.responsible
        db_reservations.use_reason = reservation.use_reason
        db_reservations.general_info = reservation.general_info

        db.commit()
        db.refresh(db_reservations)

    return db_reservations


def delete_reservations(db: Session, id: int):
    db_reservations = db.query(Reservations).filter(
        Reservations.id == id).first()

    if db_reservations:

        db.delete(db_reservations)
        db.commit()

    return db_reservations


class Invites(Base):

    __tablename__ = "invites"
    user_id: Mapped[int] = mapped_column(
        ForeignKey("user.id"), primary_key=True)
    reservation_id: Mapped[int] = mapped_column(
        ForeignKey("reservation.id"), primary_key=True)
    user: Mapped[User] = relationship()
    reservation: Mapped[Reservations] = relationship()


def get_invites_by_user_and_reservation_id(db: Session, user_id: int, reservation_id: int):
    return (
        db.query(Invites)
        .filter((Invites.user_id == user_id) & (Invites.reservation_id == reservation_id))
        .first()
    )


def get_invites_by_user_id_all(
    db: Session, user_id: int, skip: int = 0, limit: int = 100
):
    """Busca todas as relação do usuario com processos e retorna os 100 primeiros
    registro com capacidade para ir seguindo a busca"""
    return (
        db.query(Invites)
        .filter(Invites.user_id == user_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_invites_by_reservation_id_all(
    db: Session, reservation_id: int, skip: int = 0, limit: int = 100
):
    """Busca todas as relação do processo com usuarios e retorna os 100 primeiros
    registro com capacidade para ir seguindo a busca"""
    return (
        db.query(Invites)
        .filter(Invites.reservation_id == reservation_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_all_invites(db: Session, skip: int = 0, limit: int = 100):
    """Busca todas as relação de usuario-processo e retorna os 100 primeiros
    registro com capacidade para ir seguindo a busca"""
    return db.query(Invites).offset(skip).limit(limit).all()


def create_invites(db: Session, invites: schemas.InvitesCreate):
    """Cria uma relação de processo com usuario"""
    db_invites = Invites(
        user_id=invites.user_id, reservation_id=invites.reservation_id
    )
    db.add(db_invites)
    db.commit()
    db.refresh(db_invites)
    return db_invites


def delete_invites(db: Session, user_id: int, reservation_id: int):
    """Se a relação existir, deleta a relação do banco"""

    db_invites = (
        db.query(Invites)
        .filter((Invites.user_id == user_id) & (Invites.reservation_id == reservation_id))
        .first()
    )

    if db_invites:
        db.delete(db_invites)
        db.commit()

    return db_invites
