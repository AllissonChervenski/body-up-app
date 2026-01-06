import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({currentPage, totalPages, onNext, onPrevious}) {
  return (
    <div className="bg-[#5c4d3c] text-white p-4 flex justify-between items-center shadow-lg z-10 w-full mt-auto">
      <button onClick={onPrevious} disabled={currentPage === 1} className="flex items-center px-4 py-2 hover:bg-[#7d6a54] rounded transition-colors font-bold text-sm uppercase disabled:cursor-not-allowed disabled:opacity-50">
        <ChevronLeft size={18} className="mr-1" />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <span className="text-sm font-medium">Página {currentPage} de {totalPages}</span>

      <button onClick={onNext} disabled={currentPage === totalPages || totalPages === 0}className="flex items-center px-4 py-2 hover:bg-[#7d6a54] rounded transition-colors font-bold text-sm uppercase disabled:opacity-50 disabled:cursor-not-allowed">
        <span className="hidden sm:inline">Próximo</span>
        <ChevronRight size={18} className="ml-1" />
      </button>

    </div>
  );
}