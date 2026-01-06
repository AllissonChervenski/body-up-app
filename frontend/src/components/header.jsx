import React from 'react';
import { ChevronLeft, Plus, X } from 'lucide-react';

export function Header({ ondAddWorkout }) {
  return (
    <div className="p-6 md:p-8 border-b border-[#d3c7b8] flex flex-col md:flex-row justify-between items-center gap-4">
      <button className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center bg-[#5c4d3c] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-[#4a3b2a] transition-colors hidden">
        <ChevronLeft size={20} className="mr-1" />
        <span className="hidden sm:inline">VOLTAR</span>
      </button>

      
      
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-wide bg-gradient-to-b from-[#8B5A2B] via-[#a67c52] to-[#5c4d3c] bg-clip-text text-transparent drop-shadow-sm uppercase">
          Body Up
        </h1>
        <p className="text-[#5c4d3c] text-lg font-semibold mt-1">Histórico de Treinos</p>
      </div>
      
      <button 
            onClick={ondAddWorkout}
            className="bg-[#4a3b2a] text-[#f4f1eb] px-5 py-3 rounded-md font-bold text-sm uppercase tracking-wide hover:bg-[#2c2319] transition-all flex items-center gap-2 shadow-lg active:translate-y-0.5"
          >
            <Plus size={18} /> Nova Ficha
          </button>

          
      
      
       {/* Espaçador para centraliz ação */}
       <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10"></div>
    </div>
  );
}