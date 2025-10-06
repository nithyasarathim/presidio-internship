import React from 'react'
import { BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import DoctorPage from './pages/DoctorPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './auth/ProtectedRoute';
import Wrapper from './layout/Wrapper';


const App = () => {
  return (
    
    <Router>
      <Wrapper>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/admin' element={
            <ProtectedRoute allowedRole={"admin"}>
              <AdminPage/>
            </ProtectedRoute>
        }/>
        <Route path='/doctor' element={
          <ProtectedRoute allowedRole={"doctor"}>
            <DoctorPage/>
          </ProtectedRoute>
        }/>
        <Route path='*' element={<Navigate to="/" replace/>}/>
      </Routes>
      </Wrapper>
    </Router>
    
  )
}

export default App