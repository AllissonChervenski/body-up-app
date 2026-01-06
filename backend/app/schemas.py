from pydantic import BaseModel
from typing import List, Optional

class SetSchema(BaseModel):
    label: str
    rep: int
    load: int

    class Config:
        from_attributes = True

class ExerciseSchema(BaseModel):
    name: str
    totalExerciseLoad: str | int | float
    sets: List[SetSchema] = []

    class Config:
        from_attributes = True


class WorkoutSchema(BaseModel):
    id: Optional[int] = None
    date: str
    athlete: str
    workoutName: str
    totalSets: int
    totalLoad: str | int | float
    exercises: List[ExerciseSchema] = []
    
    class Config:
        from_attributes = True

class PaginatedWorkoutResponse(BaseModel):
    data: List[WorkoutSchema]
    total: int
    page: int
    limit: int