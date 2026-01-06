import React from 'react';
import { Dumbbell, Weight } from 'lucide-react';

export function ExerciseCard({ exercise }) {
    return (
      <div className="mb-6 last:mb-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2 sm:gap-0">
              {/* Nome do Exercício */}
              <div className="flex items-center">
                  <div className="bg-[#8c6b4f] p-1.5 rounded mr-3 text-white">
                      <Dumbbell size={16} />
                  </div>
                  <h4 className="font-bold text-[#4a3b2a] text-lg uppercase tracking-wide">
                      {exercise.name}
                  </h4>
              </div>
              
              {/* Badge de Carga Total */}
              <div className="flex items-center self-start sm:self-auto bg-[#dccfb9] px-3 py-1 rounded-full border border-[#b09b82]">
                  <Weight size={14} className="mr-2 text-[#5c4d3c]" />
                  <span className="text-xs font-bold text-[#5c4d3c] uppercase mr-1">Total:</span>
                  <span className="text-sm font-black text-[#4a3b2a] mr-2">{exercise.totalExerciseLoad}</span>
              </div>
          </div>
  
          {/* Lista de Séries */}
          <div className="space-y-2 pl-4 border-l-2 border-[#b09b82] ml-4">
              {exercise.sets.map((set, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center text-[#4a3b2a] text-sm font-medium bg-[#fdfbf7] p-2 rounded shadow-sm border border-[#d3c7b8]">
                      <span className="font-bold mr-2 text-[#8c6b4f] uppercase text-xs sm:text-sm">Série: {set.label}</span>
                      <span className="text-gray-700 uppercase text-xs sm:text-sm mr-2">Rep: {set.rep}</span>
                      <span className="text-gray-700 uppercase text-xs sm:text-sm">Carga: {set.load}</span>
                  </div>
              ))}
          </div>
      </div>
    );
  }