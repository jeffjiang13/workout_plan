import React, { useState } from 'react';
import axios from 'axios';
import { serverUrl } from './config';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ExerciseSearch = () => {
  const [muscleGroup, setMuscleGroup] = useState('');
  const [exercises, setExercises] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.get(`${serverUrl}/exercises?muscleGroup=${muscleGroup}`);
      setExercises(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Muscle Group:
        <select value={muscleGroup} onChange={e => setMuscleGroup(e.target.value)}>
          <option value="">All</option>
          <option value="Chest">Chest</option>
          <option value="Back">Back</option>
          <option value="Legs">Legs</option>
          <option value="Arms">Arms</option>
          <option value="Shoulders">Shoulders</option>
        </select>
      </label>
      <button type="submit">Search</button>
      <ul>
        {exercises.map(exercise => (
          <li key={exercise._id}>{exercise.name}</li>
        ))}
      </ul>
    </form>
  );
};

export default ExerciseSearch;
