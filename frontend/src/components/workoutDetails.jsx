import React from 'react';
import { ExerciseCard } from './exerciseCard';
import { Trash2, Edit } from 'lucide-react';

export function WorkoutDetails({ workout, editWorkout, deleteWorkout}) {
  return (
    <div className="bg-[#e8e2d4] px-4 md:px-10 py-6 border-t border-[#d3c7b8] shadow-inner animate-in fade-in slide-in-from-top-2 duration-200 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#b09b82] pb-3 mb-5 gap-3 sm:gap-0">
          <h3 className="font-bold text-[#5c4d3c] uppercase text-xs tracking-widest inline-block">
            Exercícios Realizados
          </h3>
          <div className="flex gap-2 self-end sm:self-auto">
            {/* Botão Excluir */}
            <button 
              onClick={() => deleteWorkout(workout.id)} 
              className="bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded hover:bg-red-200 transition duration-200 flex items-center gap-2 font-bold text-xs uppercase"
            >
              <Trash2 size={16} /> <span className="hidden sm:inline">Excluir</span>
            </button>
            {/* Botão Editar */}
            <button 
              onClick={() => editWorkout(workout)} 
              className="bg-[#5c4d3c] text-white px-4 py-2 rounded hover:bg-[#4b3d2f] transition duration-200 flex items-center gap-2 font-bold text-xs uppercase"
            >
               <Edit size={16} /> <span className="hidden sm:inline">Editar</span>
            </button>
        
          </div>
      </div>
      
      <div className="flex flex-col">
        {workout.exercises.map((exercise, idx) => (
            <ExerciseCard key={idx} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}