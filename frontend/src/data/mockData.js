//id, date, athlete, workoutName, totalSets, totalLoad, exercises[{name, totalExerciseLoad, sets[label, rep, load]}]
export const workoutsData = [
  {
    id: 1,
    date: '25/03/25',
    athlete: 'ALLISSON (1)',
    workoutName: 'PEITORAL E TRÍCEPS',
    totalSets: 12,
    totalLoad: '4.200 kg',
    exercises: [
      {
        name: 'Supino Reto',
        totalExerciseLoad: '2.580 kg',
        sets: [
          { label: '1', rep: '12', load: '60' },
          { label: '2', rep: '12', load: '60' },
          { label: '3', rep: '10', load: '62' },
          { label: '4', rep: '8', load: '65' },
        ]
      },
      {
        name: 'Tríceps Corda',
        totalExerciseLoad: '900 kg',
        sets: [
          { label: '1', rep: '15', load: '20' },
          { label: '2', rep: '12', load: '25' },
          { label: '3', rep: '10', load: '30' },
        ]
      },
      {
        name: 'Triceps inverso',
        totalExerciseLoad: '720 kg',
        sets: [
          { label: '1', rep: '12', load: '20' },
          { label: '2', rep: '12', load: '24' },
          { label: '3', rep: '10', load: '26' },
        ]
      },
    ]
  },
  {
    id: 2,
    date: '24/03/25',
    athlete: 'ALLISSON (1)',
    workoutName: 'PERNAS (A)',
    totalSets: 9,
    totalLoad: '3.500 kg',
    exercises: [
      {
        name: 'Agachamento Livre',
        totalExerciseLoad: '2.550 kg',
        sets: [
          { label: '1', rep: '10', load: '80' },
          { label: '2', rep: '10', load: '85' },
          { label: '3', rep: '8', load: '90' },
        ]
      },
      {
        name: 'Leg Press 45',
        totalExerciseLoad: '7.440 kg',
        sets: [
          { label: '1', rep: '12', load: '200' },
          { label: '2', rep: '12', load: '220' },
          { label: '3', rep: '10', load: '240' },
        ]
      }
    ]
  },
  {
    id: 3,
    date: '23/03/25',
    athlete: 'JOÃO (3)',
    workoutName: 'COSTAS E BÍCEPS',
    totalSets: 16,
    totalLoad: '5.100 kg',
    exercises: [
      {
        name: 'Levantamento Terra',
        totalExerciseLoad: '1.050 kg',
        sets: [
          { label: '1', rep: '5', load: '100' },
          { label: '2', rep: '5', load: '110' },
        ]
      },
      {
        name: 'Remada Curvada',
        totalExerciseLoad: '1.200 kg',
        sets: [
          { label: '1', rep: '10', load: '60' },
          { label: '2', rep: '10', load: '60' },
        ]
      }
    ]
  }
];