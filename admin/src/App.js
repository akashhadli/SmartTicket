import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Asregister from './components/Asregister';
import Dashboard from './components/Dashboard';
import Empregister from './components/Empregister';
import Operdashboard from './components/Operdashboard';
import Opertable from './components/Opertable';
import Operview from './components/Operview';
import Register from './components/Register';
import SignIn from './components/SignIn';

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/opertable' element={<Opertable />} />
        <Route path='/operdashboard' element={<Operdashboard />} />
        <Route path='/approve/:OperId' element={<Opertable />} />
        <Route path='/operator/:OperId' element={<Operview />} />
        <Route path='/empregister' element={<Empregister />} />
        <Route path='/asregister' element={<Asregister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
