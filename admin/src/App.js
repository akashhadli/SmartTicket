import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Astregister from './components/Astregister';
import Dashboard from './components/Dashboard';
import Empregister from './components/Empregister';
import Operdashboard from './components/Operdashboard';
import Opertable from './components/Opertable';
import Stageregister from './components/Stageregister';
import Operview from './components/Operview';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Routeregister from './components/Routeregister';
import RouteStageMap from './components/RouteStageMap';
import Assets from './components/Assets';
import Employees from './components/Employees';
import Operators from './components/Operators';
import Users from './components/Users';

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
				<Route path='/astregister' element={<Astregister />} />
				<Route path='/stageregister' element={<Stageregister />} />
				<Route path='/routeregister' element={<Routeregister />} />
				<Route path='/routemap' element={<RouteStageMap />} />
				<Route path='/assetsview' element={<Assets />} />
				<Route path='/employeesview' element={<Employees />} />
				<Route path='/operatorsview' element={<Operators />} />
				<Route path='/usersview' element={<Users />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
