from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter()

@router.get("/workouts", response_model=schemas.PaginatedWorkoutResponse)
def get_workouts(page:int = Query(1, ge=1), limit:int = Query(10, le=100), db: Session = Depends(get_db)):
    
    offset = (page - 1) * limit
    total_count = db.query(models.Workout).count()

    workouts = db.query(models.Workout).order_by(models.Workout.id.desc()).offset(offset).limit(limit).all()
    
    return{
        "data": workouts,
        "total": total_count,
        "page": page,
        "limit": limit
    }

@router.post("/workouts", response_model=schemas.WorkoutSchema)
def create_workout(workout: schemas.WorkoutSchema, db: Session = Depends(get_db)):
    db_workout = models.Workout(
        date=workout.date,
        athlete=workout.athlete,
        workoutName=workout.workoutName,
        totalSets=workout.totalSets,
        totalLoad= workout.totalLoad
    )
    for ex in workout.exercises:
        db_exercise = models.Exercise(
            name = ex.name,
            totalExerciseLoad = ex.totalExerciseLoad
        )
        for s in ex.sets:
            db_set = models.Set(
                label = s.label,
                rep = s.rep,
                load = s.load
            ) 
            db_exercise.sets.append(db_set)
        db_workout.exercises.append(db_exercise)
    db.add(db_workout)
    db.commit()
    db.refresh(db_workout)
    return db_workout                              
    

@router.put("/workouts/{workout_id}", response_model=schemas.WorkoutSchema)
def update_workout(workout_id: int, workout: schemas.WorkoutSchema, db: Session = Depends(get_db)):

    db_workout = db.query(models.Workout).filter(models.Workout.id == workout_id).first()
    if not db_workout:
        raise HTTPException(status_code=404, detail="Treino não encontrado")
    
    db_workout.date = workout.date
    db_workout.athlete = workout.athlete
    db_workout.workoutName = workout.workoutName
    db_workout.totalSets = workout.totalSets
    db_workout.totalLoad = workout.totalLoad

    db.query(models.Exercise).filter(models.Exercise.workout_id == workout_id).delete()

    for ex in workout.exercises:
        db_exercise = models.Exercise(
            workout_id = workout_id,
            name = ex.name,
            totalExerciseLoad = ex.totalExerciseLoad
    )
        
        for s in ex.sets:
            db_set = models.Set(
                label=s.label,
                rep=s.rep,
                load=s.load
            )
            db_exercise.sets.append(db_set)
        
        db.add(db_exercise)
    
    db.commit()
    db.refresh(db_workout)
    return db_workout

@router.delete("/workouts/{workout_id}")
def delete_workout(workout_id: int, db : Session = Depends(get_db)):
    workout = db.query(models.Workout).filter(models.Workout.id == workout_id).first()
    if not workout:
        raise HTTPException(status_code=404, detail = "Treino não encontrado")
    
    db.delete(workout)
    db.commit()

    return { "message": "Treino excluido com sucesso"}

