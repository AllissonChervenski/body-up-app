import React, { useState, useEffect} from 'react';
import { Header } from './components/header';
import { Pagination } from './components/pagination';
import { WorkoutRow } from './components/workoutRow';
import { AddWorkoutModal } from './components/addWorkoutModal';

export default function BuildUpApp() {
  const [expandedId, setExpandedId] = useState(null);
  const [editingWorkout, setEditingWorkout] = useState(null);

  const [workouts, setWorkouts] = useState([]);
    // Estado para controlar se o modal está visível ou não
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10;


  const fetchWorkouts = async (page) =>{
    try{
      const response = await fetch(`http://127.0.0.1:8000/workouts?page=${page}&limit=${itemsPerPage}`);
      const data = await response.json();
      setWorkouts(data.data);
      const calculatedTotalPages = Math.ceil(data.total / itemsPerPage);
      setTotalPages(calculatedTotalPages)
    } catch(error){
      console.error("Erro ao buscar treinos.", error);
    }
  };

  useEffect(() => { 
    fetchWorkouts(currentPage);
  }, [currentPage]);

  const goToNextPage = () => { 
    if( currentPage  < totalPages) setCurrentPage(curr => curr+1)
  }

  const goToPrevPage = () => {
    if(currentPage > 1 ) setCurrentPage(curr => curr-1)
  }


  const toggleRow = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  const openModal = () => {
    setEditingWorkout(null);

    setIsModalOpen(true);
  };

  const openEditModal = (workout) => {
    setEditingWorkout(workout);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingWorkout(null);
    
  };

  const handleSaveWorkout = async (newWorkoutData) => {
    try{
      if(editingWorkout){
      const response = await fetch(`http://127.0.0.1:8000/workouts/${editingWorkout.id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWorkoutData)
      });

      if(response.ok){
        fetchWorkouts(currentPage);
      }
    }
    else{
      const response = await fetch(`http://127.0.0.1:8000/workouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWorkoutData)
    }
  )
      if(response.ok){
        // Volta para a primeira página ao criar um novo, para ver o item recente
        setCurrentPage(1);
        fetchWorkouts(1);
      }
    }
    closeModal();
  } catch(error){
    console.error("Erro ao salvar treino.", error);
    alert("Erro ao conectar ao servidor");
  }
};

const handleDeleteWorkout = async (id) => {
  if(confirm("Tem certeza que deseja deletar este treino permanentemente?")){
    try{
      const response = await fetch(`http://127.0.0.1:8000/workouts/${id}`, {
          method: 'DELETE',
        });
      if(response.ok){  
        fetchWorkouts(currentPage);
        setExpandedId(null);
      }
    else{
      alert("Erro ao excluir o treino.");
    }
  }
    catch(error){
      console.error("Erro ao excluir:", error);
    }
  }
};  

  return (
      <div className="min-h-screen w-full bg-[#fdfbf7] text-[#4a3b2a] flex flex-col font-sans">
        <div className="flex-1 w-full p-4 md:p-8 flex flex-col">
          
          <Header ondAddWorkout={openModal} />

          <div className="flex-1 w-full bg-[#fffefc] border-2 border-[#d3c7b8] rounded-xl overflow-hidden shadow-sm flex flex-col">
            

            {/* Cabeçalho Estático da Tabela */}
            <div className="hidden md:grid grid-cols-12 bg-[#8c6b4f] text-white py-4 px-6 font-bold text-sm uppercase tracking-wider items-center">
              <div className="col-span-2">Data</div>
              <div className="col-span-3">Atleta</div>
              <div className="col-span-3">Treino</div>
              <div className="col-span-2">Carga Total</div>
              <div className="col-span-1 text-center">Vol.</div>
              <div className="col-span-1 text-center">Ver</div>
            </div>

            {/* Cabeçalho Mobile */}
            <div className="md:hidden bg-[#8c6b4f] text-white py-3 px-4 font-bold text-sm uppercase text-center">
              Histórico de Treinos
            </div>

            {/* Loop de Linhas */}
            <div className="flex-1 overflow-y-auto w-full">
              <div className="divide-y divide-[#d3c7b8]">
                {workouts.length === 0 ? (<p className="text-center p-10 text-gray-500">Nenhum treino encontrado. Adicione o primeiro!</p>
                ):(
                  workouts.map((workout) =>
                  <WorkoutRow 
                    key={workout.id}
                    workout={workout}
                    isOpen={expandedId === workout.id}
                    onToggle={toggleRow}
                    onEdit={openEditModal}
                    onDelete={handleDeleteWorkout}
                  />
                ))}
              </div>
            </div>

            {workouts.length > 0 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={goToNextPage}
              onPrevious={goToPrevPage}/>
            )}

            {isModalOpen && (
        <AddWorkoutModal 
          onClose={closeModal} 
          onSave={handleSaveWorkout}
          initialData={editingWorkout}
        />  
      )}
          </div>
        </div>
      </div>
  );
}