import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import DashboardPage from './pages/AdminDashboard';


const App = () => {
  // const navigate=useNavigate();
  return (
    <Router>
      <Routes>
        <Route path='/' element={<DashboardPage/>}/>
      </Routes>
    </Router>
  )
}

export default App