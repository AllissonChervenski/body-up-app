from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import workout
from app.database import engine
from app import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [

    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(workout.router)

@app.get("/")
def home():
    return {"message" : "API body up estruturada!"}