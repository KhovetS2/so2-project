from fastapi import File
from pydantic import BaseModel
from datetime import date, datetime
from typing import List, Optional


class UserBase(BaseModel):
    name: str
    email: str
    password: str


class Login(BaseModel):
    email: str
    password: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


class UserGet(User):
    pass


class ReservationBase(BaseModel):
    idReservation: str
    name_room: str
    localization: str
    start_hour: datetime
    end_hour: datetime
    responsible: int
    use_reason: str
    general_info: str
    foto: str


class ReservationsCreate(ReservationBase):
    pass


class ReservationsUpdate(ReservationBase):
    id: int

    class Config:
        from_attributes = True


class Reservations(ReservationBase):
    id: int

    class Config:
        from_attributes = True


class InvitesBase(BaseModel):
    user_id: int
    reservation_id: int


class InvitesCreate(InvitesBase):
    pass


class Invites(InvitesBase):
    user: Optional[User]
    reservations: Optional[Reservations]

    class Config:
        from_attributes = True


class ReservationsAll(Reservations):
    invitations: List[Invites]
