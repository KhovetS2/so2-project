from database import schemas, database
from sqlalchemy.orm import Session
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database.database import SessionLocal, engine
from routers import user, reservations, invites, login

database.Base.metadata.create_all(bind=engine)

app = FastAPI()

user.create_admin()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ou especifique origens específicas
    allow_credentials=True,
    # Ou especifique métodos específicos (GET, POST, etc.)
    allow_methods=["*"],
    allow_headers=["*"],  # Ou especifique cabeçalhos específicos
)

app.include_router(user.router)
app.include_router(reservations.router)
app.include_router(invites.router)
app.include_router(login.router)
