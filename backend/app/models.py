from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Workout(Base):
    __tablename__ = "workouts"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(String(50))
    athlete = Column(String(50))
    workoutName = Column(String(100))
    totalSets = Column(Integer)
    totalLoad = Column(Integer)


    exercises = relationship("Exercise", back_populates="workouts", cascade="all, delete-orphan")

class Exercise(Base):
    __tablename__ = "exercise"
    id = Column(Integer, primary_key=True, index = True)
    workout_id = Column(Integer, ForeignKey("workouts.id", ondelete="CASCADE"))
    name = Column(String(100))
    totalExerciseLoad = Column(Integer)

    workouts = relationship("Workout", back_populates="exercises")

    sets = relationship("Set", back_populates="exercises", cascade="all, delete-orphan")

class Set(Base):
    __tablename__="sets"

    id = Column(Integer, primary_key=True, index=True)
    exercise_id = Column(Integer, ForeignKey("exercise.id", ondelete="CASCADE"))
    label = Column(String(100))
    rep = Column(Integer)
    load = Column(Integer)

    exercises = relationship("Exercise", back_populates="sets")