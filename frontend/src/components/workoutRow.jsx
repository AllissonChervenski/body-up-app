import React from 'react';
import { ChevronDown, ChevronRight, Calendar, User, Layers } from 'lucide-react';
import { WorkoutDetails } from './workoutDetails';

export function WorkoutRow({ workout, isOpen, onToggle, onEdit, onDelete }) {
  // Função extra de segurança para exibir na tabela
  const displayDate = (dateStr) => {
    if (!dateStr) return '';
    // Se vier como aaaa-mm-dd (ISO), transforma em dd/mm/aaaa
    if (dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    }
    return dateStr; // Se já for dd/mm/aaaa, retorna normal
  };

  
  return (
    <div className="flex flex-col w-full border-b border-[#d3c7b8] last:border-0">
      <div 
        onClick={() => onToggle(workout.id)}
        className={`grid grid-cols-1 md:grid-cols-12 py-5 px-4 md:px-6 items-center cursor-pointer transition-colors hover:bg-[#e6dfd1] ${isOpen ? 'bg-[#dccfb9]' : 'bg-[#f4f1eb]'} gap-3 md:gap-0 w-full`}
      >
        {/* Mobile Header: Data, Atleta e Toggle */}
        <div className="flex justify-between items-start md:hidden w-full mb-1">
            <div className="flex flex-col">
                <div className="flex items-center text-[#8c6b4f] font-bold mb-1">
                    <Calendar size={16} className="mr-2" />
                    {displayDate(workout.date)}
                </div>
                <div className="flex items-center text-[#4a3b2a] font-bold text-sm uppercase">
                    <User size={14} className="mr-1.5" />
                    {workout.athlete}
                </div>
            </div>
            {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>

        {/* --- COLUNAS DESKTOP --- */}
        
        {/* 1. Data (2 cols) */}
        <div className="hidden md:flex col-span-2 font-medium text-[#4a3b2a] items-center text-sm lg:text-base">
            {displayDate(workout.date)}
        </div>

        {/* 2. Atleta (3 cols) */}
        <div className="hidden md:flex col-span-3 font-bold text-[#4a3b2a] uppercase items-center text-sm lg:text-base">
           <div className="bg-[#dccfb9] p-1 rounded-full mr-2">
               <User size={14} className="text-[#5c4d3c]" />
           </div>
           {workout.athlete}
        </div>
        
        {/* 3. Nome do Treino (3 cols) */}
        <div className="col-span-3 font-black text-[#4a3b2a] uppercase flex items-center text-lg md:text-sm lg:text-base">
          <span className="md:hidden font-bold mr-2 text-xs text-gray-500 w-24">TREINO:</span>
          {workout.workoutName}
        </div>
        
        {/* 4. Carga Total (2 cols) */}
        <div className="col-span-2 text-[#4a3b2a] flex items-center font-medium">
           <span className="md:hidden font-bold mr-2 text-xs text-gray-500 w-24">CARGA TOTAL:</span>
           <span className="bg-[#e4dacd] px-2 py-1 rounded text-sm border border-[#d3c7b8] whitespace-nowrap">
             {workout.totalLoad}
           </span>
        </div>

        {/* 5. Resumo de Séries (1 col) */}
        <div className="col-span-1 text-[#4a3b2a] flex items-center justify-start md:justify-center">
            <span className="md:hidden font-bold mr-2 text-xs text-gray-500 w-24">VOLUME:</span>
            <div className="flex items-center text-sm font-semibold whitespace-nowrap" title={`${workout.totalSets} Séries Totais`}>
                <Layers size={16} className="mr-1.5 text-[#8c6b4f]" />
                {workout.totalSets}
            </div>
        </div>
        
        {/* 6. Seta Desktop (1 col) */}
        <div className="hidden md:flex col-span-1 justify-center text-[#4a3b2a]">
          {isOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
        </div>
      </div>

      {isOpen && <WorkoutDetails workout={workout} editWorkout={onEdit} deleteWorkout={onDelete} />}
    </div>
  );
}
