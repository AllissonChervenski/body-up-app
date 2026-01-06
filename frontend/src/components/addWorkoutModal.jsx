import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Save, X } from 'lucide-react';

export function AddWorkoutModal({ onClose, onSave, initialData }) {

  // Converte do formato BR (dd/mm/aaaa) para o formato do Input (aaaa-mm-dd)
  const formatDateToInput = (dateStr) => {
    if (!dateStr) return '';
    if (dateStr.includes('-')) return dateStr; // Já está em ISO
    
    const [day, month, year] = dateStr.split('/');
    // Garante ano com 4 dígitos (ex: 25 -> 2025)
    const fullYear = year.length === 2 ? `20${year}` : year;
    return `${fullYear}-${month}-${day}`;
  };

  // Converte do Input (aaaa-mm-dd) para o formato BR (dd/mm/aaaa) para salvar
  const formatDateToSave = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  // Pega a data de hoje no formato aaaa-mm-dd para iniciar o formulário
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };


  const [formData, setFormData] = useState(() => {
    if (initialData) {
      // MODO EDIÇÃO: Converte a data que veio do banco para o input entender
      return {
        ...initialData,
        date: formatDateToInput(initialData.date) 
      };
    }
    // MODO CRIAÇÃO: Inicia com a data de hoje
    return {
      name: '',
      athlete: '',
      date: getTodayDate(), 
      workoutName: '',
      totalSets: 0,
      totalLoad: 0,
      exercises: []
    };
  });


  // --- Gerenciamento de Exercícios ---
  const handleAddExercise = () => {
    setFormData({
      ...formData,
      exercises: [
        ...formData.exercises, 
        // Inicia com uma série vazia por padrão para facilitar
        { name: '', totalExerciseLoad: 0, sets: [{ label: '1', rep: '', load: '' }] }
      ]
    });
  };

  const removeExercise = (index) => {
    const newExercises = formData.exercises.filter((_, i) => i !== index);
    setFormData({ ...formData, exercises: newExercises });
  };

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...formData.exercises];
    newExercises[index][field] = value;
    setFormData({ ...formData, exercises: newExercises });
  };

  // --- Gerenciamento de Séries (NOVO) ---
  const handleAddSet = (exerciseIndex) => {
    const newExercises = [...formData.exercises];
    const currentSetCount = newExercises[exerciseIndex].sets.length;
    
    newExercises[exerciseIndex].sets.push({
      label: (currentSetCount + 1).toString(), // Auto-incrementa o número da série
      rep: '',
      load: ''
    });
    
    setFormData({ ...formData, exercises: newExercises });
  };

  const handleRemoveSet = (exerciseIndex, setIndex) => {
    const newExercises = [...formData.exercises];
    // Remove a série
    newExercises[exerciseIndex].sets = newExercises[exerciseIndex].sets.filter((_, i) => i !== setIndex);
    
    // Re-ordena as labels (1, 2, 3...) para não ficar buracos (ex: 1, 3)
    newExercises[exerciseIndex].sets.forEach((set, i) => {
      set.label = (i + 1).toString();
    });

    setFormData({ ...formData, exercises: newExercises });
  };

  const handleSetChange = (exerciseIndex, setIndex, field, value) => {
    const newExercises = [...formData.exercises];
    newExercises[exerciseIndex].sets[setIndex][field] = value;
    
    // Opcional: Recalcular a carga total do exercício automaticamente
    const currentSets = newExercises[exerciseIndex].sets;
    const totalLoad = currentSets.reduce((acc, set) => acc + (Number(set.load * set.rep) || 0), 0);
    newExercises[exerciseIndex].totalExerciseLoad = totalLoad;

    setFormData({ ...formData, exercises: newExercises });
  };

  // --- Submissão ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const totalSets = formData.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
    // Soma a carga de todas as séries de todos os exercícios
    const totalLoad = formData.exercises.reduce((acc, ex) => 
      acc + ex.sets.reduce((sum, set) => sum + (Number(set.load *set.rep) || 0), 0), 0
    );
    
    const updatedFormData = {
      ...formData,
      date: formatDateToSave(formData.date),
      totalSets,
      totalLoad
    };

    onSave(updatedFormData);
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: formatDateToInput(initialData.date)
      });
    }
  }, [initialData]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#f4f1eb] w-full max-w-3xl rounded-xl shadow-2xl max-h-[90vh] flex flex-col border border-[#d3c7b8]">
        
        {/* Cabeçalho do Modal */}
        <div className="p-4 border-b border-[#d3c7b8] flex justify-between items-center bg-[#e8e2d4] rounded-t-xl">
          <h2 className="font-bold text-[#4a3b2a] uppercase tracking-wide">
            {initialData ? 'Editar Treino' : 'Novo Treino'}
          </h2>
          <button onClick={onClose} className="text-[#8c6b4f] hover:text-[#5c4d3c]">
            <X size={20} />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="p-6 overflow-y-auto flex-1">
          <form id="workout-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Inputs Principais (Atleta, Data, Nome do Treino) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4">
                <label className="block text-xs font-bold uppercase text-[#8c6b4f] mb-1">Data</label>
                <input 
                  required type="date" 
                  className="w-full bg-white border border-[#d3c7b8] rounded p-2 text-[#4a3b2a] focus:outline-none focus:border-[#8c6b4f]"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div className="md:col-span-8">
                <label className="block text-xs font-bold uppercase text-[#8c6b4f] mb-1">Nome do Atleta</label>
                <input 
                  required type="text" placeholder="Ex: João Silva"
                  className="w-full bg-white border border-[#d3c7b8] rounded p-2 text-[#4a3b2a] focus:outline-none focus:border-[#8c6b4f]"
                  value={formData.athlete}
                  onChange={e => setFormData({...formData, athlete: e.target.value})}
                />
              </div>
              <div className="md:col-span-12">
                <label className="block text-xs font-bold uppercase text-[#8c6b4f] mb-1">Nome do Treino</label>
                <input 
                  required type="text" placeholder="Ex: Treino A - Peito"
                  className="w-full bg-white border border-[#d3c7b8] rounded p-2 text-[#4a3b2a] focus:outline-none focus:border-[#8c6b4f]"
                  value={formData.workoutName}
                  onChange={e => setFormData({...formData, workoutName: e.target.value})}
                />
              </div>
            </div>

            {/* Seção de Exercícios */}
            <div>
              <div className="flex justify-between items-center mb-4 border-b border-[#d3c7b8] pb-2">
                <label className="text-sm font-bold uppercase text-[#4a3b2a]">Exercícios do Treino</label>
                <button 
                  type="button" onClick={handleAddExercise}
                  className="text-xs font-bold text-white bg-[#8c6b4f] hover:bg-[#6f543d] flex items-center gap-1 px-3 py-1.5 rounded transition-colors shadow-sm"
                >
                  <Plus size={14} /> Adicionar Exercício
                </button>
              </div>

              <div className="space-y-6">
                {formData.exercises.map((ex, exerciseIndex) => (
                  <div key={exerciseIndex} className="bg-white p-4 rounded-lg border border-[#e4dacd] shadow-sm relative">
                    
                    {/* Cabeçalho do Exercício (Nome e Botão Remover) */}
                    <div className="flex gap-3 mb-4">
                      <div className="flex-1">
                        <label className="block text-[10px] font-bold uppercase text-[#8c6b4f] mb-1">Exercício</label>
                        <input 
                          required placeholder="Nome do exercício (ex: Supino)"
                          className="w-full bg-[#f9f9f9] border border-[#d3c7b8] rounded p-2 text-sm font-bold text-[#4a3b2a]" 
                          value={ex.name}
                          onChange={e => handleExerciseChange(exerciseIndex, 'name', e.target.value)}
                        />
                      </div>
                      <button 
                        type="button" onClick={() => removeExercise(exerciseIndex)}
                        className="self-end mb-1 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Remover Exercício"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Lista de Séries */}
                    <div className="bg-[#fdfbf7] rounded border border-[#e4dacd] p-3">
                      <div className="flex justify-between items-center mb-2">
                         <span className="text-xs font-bold uppercase text-[#8c6b4f]">Séries</span>
                      </div>
                      
                      {/* Cabeçalho da Tabela de Séries */}
                      {ex.sets.length > 0 && (
                        <div className="grid grid-cols-10 gap-2 mb-2 px-1 text-[10px] font-bold uppercase text-[#a89b8d]">
                          <div className="col-span-1 text-center">#</div>
                          <div className="col-span-4 text-center">Repetições</div>
                          <div className="col-span-4 text-center">Carga (kg)</div>
                          <div className="col-span-1"></div>
                        </div>
                      )}

                      <div className="space-y-2">
                        {ex.sets.map((set, setIndex) => (
                          <div key={setIndex} className="grid grid-cols-10 gap-2 items-center">
                            {/* Número da Série */}
                            <div className="col-span-1 flex justify-center">
                              <span className="bg-[#e4dacd] text-[#5c4d3c] w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold">
                                {set.label}
                              </span>
                            </div>
                            
                            {/* Input Repetições */}
                            <div className="col-span-4">
                              <input 
                                type="number" placeholder="Reps"
                                className="w-full bg-white border border-[#d3c7b8] rounded p-1.5 text-center text-sm"
                                value={set.rep}
                                onChange={e => handleSetChange(exerciseIndex, setIndex, 'rep', e.target.value)}
                              />
                            </div>

                            {/* Input Carga */}
                            <div className="col-span-4 relative">
                              <input 
                                type="number" placeholder="Kg"
                                className="w-full bg-white border border-[#d3c7b8] rounded p-1.5 text-center text-sm"
                                value={set.load}
                                onChange={e => handleSetChange(exerciseIndex, setIndex, 'load', e.target.value)}
                              />
                            </div>

                            {/* Botão Remover Série */}
                            <div className="col-span-1 flex justify-center">
                              <button 
                                type="button" onClick={() => handleRemoveSet(exerciseIndex, setIndex)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Botão Adicionar Série */}
                      <button 
                        type="button" onClick={() => handleAddSet(exerciseIndex)}
                        className="mt-3 w-full py-1.5 border border-dashed border-[#d3c7b8] text-[#8c6b4f] text-xs font-bold uppercase rounded hover:bg-[#efeadd] transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus size={14} /> Nova Série
                      </button>
                    </div>

                    {/* Total do Exercício (Apenas Visual) */}
                    <div className="mt-2 text-right">
                       <span className="text-[10px] font-bold text-[#8c6b4f] uppercase mr-2">Volume Total do Exercício:</span>
                       <span className="text-sm font-bold text-[#4a3b2a]">{ex.totalExerciseLoad || 0} kg</span>
                    </div>

                  </div>
                ))}

                {formData.exercises.length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm bg-[#f9f9f9] rounded border border-dashed border-[#d3c7b8]">
                    Nenhum exercício adicionado.
                  </div>
                )}
              </div>
            </div>

          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#d3c7b8] bg-[#f4f1eb] rounded-b-xl flex justify-end gap-3">
          <button 
            type="button" onClick={onClose}
            className="px-4 py-2 text-[#5c4d3c] font-bold text-sm hover:bg-[#e6dfd1] rounded transition-colors"
          >
            Cancelar
          </button>
          <button 
            form="workout-form" type="submit"
            className="bg-[#4a3b2a] text-[#f4f1eb] px-6 py-2 rounded font-bold text-sm hover:bg-[#2c2319] flex items-center gap-2 shadow-lg transition-transform active:scale-95"
          >
            <Save size={16} /> Salvar Ficha
          </button>
        </div>
      </div>
    </div>
  );
}