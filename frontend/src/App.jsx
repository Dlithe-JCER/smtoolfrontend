import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Authentication/AuthContext';
import ProtectedRoute from './components/Authentication/ProtectedRoute';

import LandingPage from './components/LandingPage/LandingPage';
import TrainerForm from './components/TrainerForm';
import TrainersManagement from './components/Trainers/TrainersManagement';
import TrainersList from './components/Trainers/TrainersList';
import SearchTrainer from './components/Trainers/SearchTrainer';
import ClientRequirement from './components/TrainingRequirement/ClientRequirement';
import TrainingRequirement from './components/TrainingRequirement/TrainingRequirement';
import ClientRequirementList from './components/TrainingRequirement/ClientRequirementList';
import ClientRequirementUpdate from './components/TrainingRequirement/ClientRequirementUpdate';
import TrainersRequirement from './components/TrainingRequirement/TrainersRequirement';
// import ResourceManagement from './components/ResourceManagement/ResourceManagement';

import TrainingRequirementForm from './components/TrainingRequirement/TrainingRequirementForm';
import LandingPage1 from './components/LandingPage/LandingPage1';
import TrainerResponse from './components/TrainingRequirement/TrainersResponse'
// import ScheduledTraining from './components/TrainingRequirement/ScheduledTraining';
import IndividualViewTrainerResponse from './components/TrainingRequirement/IndividualViewTrainerResponse';
import CombinedDetails from './components/TrainingRequirement/CombinedDetails';



function App() {
  return (
    <AuthProvider>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trainingrequirement" element={<TrainingRequirementForm />} />
        {/* Protected Routes */}
        <Route path="/addtrainer" element={<ProtectedRoute><TrainerForm /></ProtectedRoute>} />
        <Route path="/landing1" element={<ProtectedRoute><LandingPage1 /></ProtectedRoute>} />
        <Route path="/trainerresponses" element={<ProtectedRoute><TrainerResponse /></ProtectedRoute>} />
        {/* <Route path="/scheduletraining" element={<ScheduledTraining />} /> */}
        <Route path="/tmg" element={<ProtectedRoute><TrainersManagement /></ProtectedRoute>} />
        <Route path="/trainerslist" element={<ProtectedRoute><TrainersList /></ProtectedRoute>} />
        <Route path="/searchtrainer" element={<ProtectedRoute><SearchTrainer /></ProtectedRoute>} />
        <Route path="/trp" element={<ProtectedRoute><TrainingRequirement /></ProtectedRoute>} />
        <Route path="/clientrequirement" element={<ProtectedRoute><ClientRequirement /></ProtectedRoute>} />
        <Route path="/viewrequirements" element={<ProtectedRoute><ClientRequirementList /></ProtectedRoute>} />
        <Route path="/clientrequirementupdate/:id" element={<ProtectedRoute><ClientRequirementUpdate /></ProtectedRoute>} />
        <Route path="/trainerrequirement" element={<ProtectedRoute><TrainersRequirement /></ProtectedRoute>} />
        {/*<Route path="/rms" element={<ProtectedRoute><ResourceManagement /></ProtectedRoute>} />*/}
        <Route path="/trainer-response/:id" element={<IndividualViewTrainerResponse />} />
        <Route path="/combined-details" element={<CombinedDetails />} />

      </Routes>

    </AuthProvider>
  );
}

export default App;
