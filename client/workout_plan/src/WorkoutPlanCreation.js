import React, { useState } from 'react';

const WorkoutPlanCreation = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [exercises, setExercises] = useState([]);

  const handleWorkoutNameChange = (e) => {
    setWorkoutName(e.target.value);
  }

  const handleWorkoutDescriptionChange = (e) => {
    setWorkoutDescription(e.target.value);
  }

  const handleExerciseChange = (e, index) => {
    const newExercises = [...exercises];
    newExercises[index] = e.target.value;
    setExercises(newExercises);
  }

  const handleAddExercise = () => {
    setExercises([...exercises, '']);
  }

  const handleRemoveExercise = (index) => {
    setExercises(exercises.filter((exercise, i) => i !== index));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/workoutplans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: workoutName,
        description: workoutDescription,
        exercises: exercises
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Workout Name:
        <input type="text" value={workoutName} onChange={handleWorkoutNameChange} />
      </label>
      <br />
      <label>
        Workout Description:
        <input type="text" value={workoutDescription} onChange={handleWorkoutDescriptionChange} />
      </label>
      <br />
      <h3>Exercises</h3>
      {exercises.map((exercise, index) => (
        <div key={index}>
          <input type="text" value={exercise} onChange={(e) => handleExerciseChange(e, index)} />
          <button type="button" onClick={() => handleRemoveExercise(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddExercise}>Add Exercise</button>
      <br />
      <button type="submit">Create Workout Plan</button>
    </form>
  );
};

export default WorkoutPlanCreation;
