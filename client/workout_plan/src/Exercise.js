import React, { useState, useEffect } from 'react';

function Exercise() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch('/exercises')
      .then(res => res.json())
      .then(data => setExercises(data));
  }, []);

  return (
    <div>
      <h1>Exercises</h1>
      <ul>
        {exercises.map(exercise => (
          <li key={exercise._id}>{exercise.name}</li>
        ))}
      </ul>
    </div>
  );
}
