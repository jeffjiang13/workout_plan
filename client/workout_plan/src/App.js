import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import ExerciseSearch from './ExerciseSearch';
import WorkoutPlanCreation from './WorkoutPlanCreation';
import SignUp from './SignUp';
import Dashboard from './Dashboard';

function App(){


 return(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/exercises" element={<ExerciseSearch />} />
      <Route path="/workoutplans/create" element={<WorkoutPlanCreation />} />
    </Routes>
  </BrowserRouter>
 )};

export default App;
