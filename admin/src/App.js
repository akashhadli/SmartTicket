import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Admin Components/Admin/Dashboard';
import Opertable from './components/Admin Components/Operators/Opertable';
import Operview from './components/Admin Components/Operators/Operview';
import SignIn from './components/SignIn';
import Register from './components/Operator/Register';
import Operdashboard from './components/Operator/Operdashboard';
import Astregister from './components/OperAsset/Astregister';
import Astedit from './components/OperAsset/Astedit';
import Asttable from './components/OperAsset/Asttable';
import Astview from './components/OperAsset/Astview';
import Empregister from './components/OperEmployee/Empregister';
import Empedit from './components/OperEmployee/Empedit';
import Empview from './components/OperEmployee/Empview';
import Emptable from './components/OperEmployee/Emptable';
import Routeregister from './components/OperRoute/Routeregister';
import RouteStageMap from './components/OperRouteStage/RouteStageMap';
import Stageregister from './components/OperStage/Stageregister';
import Stgedit from './components/OperStage/Stgedit';
import Stgtable from './components/OperStage/Stgtable';
import Stgview from './components/OperStage/Stgview';
import Assets from './components/Admin Components/Assets/Assets';
import Employees from './components/Admin Components/Employees/Employees';
import Operators from './components/Admin Components/Operators/Operators';
import Users from './components/Admin Components/Users/Users';
import Admins from './components/Admin Components/Admin/Admins';
import ViewAdmin from './components/Admin Components/Admin/ViewAdmin';
import ViewUser from './components/Admin Components/Users/ViewUser';
import ViewOperator from './components/Admin Components/Operators/ViewOperator';
import ViewEmployee from './components/Admin Components/Employees/ViewEmployee';
import ViewAsset from './components/Admin Components/Assets/ViewAsset';
import AdmiCreate from './components/Admin Components/Admin/AdmiCreate';
import TicketType from './components/Admin Components/Ticket Type/TicketType';
import TicketTypes from './components/Admin Components/Ticket Type/TicketTypes';
import ViewTicketType from './components/Admin Components/Ticket Type/ViewTicketType';
import IndividualOperatorCard from './components/Admin Components/AdminLayout/IndividualStats/SingleOperCard/SingleOperDashboard';
import IndividualOperStats from './components/Admin Components/AdminLayout/IndividualStats/SingleOperCard/IndividualOperStats';
import IndividualOperDash from './components/Admin Components/AdminLayout/IndividualStats/SingleOperCard/IndividualOperDash';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SignIn />} />
				<Route path='/register' element={<Register />} />
				<Route path='/admin/dashboard' element={<Dashboard />} />
				<Route path='/admin/addAdmin' element={<AdmiCreate />} />
				<Route path='admin/approveopersview' element={<Opertable />} />
				<Route path='/admin/approveoper/:OperId' element={<Operview />} />
				<Route path='/operdashboard' element={<Operdashboard />} />
				<Route path='/approve/:OperId' element={<Opertable />} />
				<Route path='/empregister' element={<Empregister />} />
				<Route path='/empupdate/:EmpId' element={<Empedit />} />
				<Route path='/empview' element={<Emptable />} />
				<Route path='/employee' element={<Empview />} />
				<Route path='/employee/:EmpId' element={<Empview />} />
				<Route path='/astregister' element={<Astregister />} />
				<Route path='/astupdate/:AstId' element={<Astedit />} />
				<Route path='/astview' element={<Asttable />} />
				<Route path='/operator/asset/:AstId' element={<Astview />} />
				<Route path='/stageregister' element={<Stageregister />} />
				<Route path='/stgview' element={<Stgtable />} />
				<Route path='/operator/stage/:StageID' element={<Stgview />} />
				<Route path='/stgupdate/:StageID' element={<Stgedit />} />
				<Route path='/routeregister' element={<Routeregister />} />
				<Route path='/routemap' element={<RouteStageMap />} />
				<Route path='/admin/assetsview' element={<Assets />} />
				<Route path='/admin/assetsview/:AstId' element={<ViewAsset />} />
				<Route path='/admin/employeesview' element={<Employees />} />
				<Route path='/admin/employeesview/:EmpId' element={<ViewEmployee />} />
				<Route path='/admin/operatorsview' element={<Operators />} />
				<Route path='/admin/operatorsview/:OperId' element={<ViewOperator />} />
				<Route path='/admin/adminview' element={<Admins />} />
				<Route path='/admin/adminview/:AdminId' element={<ViewAdmin />} />
				<Route path='/admin/usersview' element={<Users />} />
				<Route path='/admin/usersview/:UserId' element={<ViewUser />} />
				<Route path='/admin/ticket-type/add' element={<TicketType />} />
				<Route path='/admin/ticket-types' element={<TicketTypes />} />
				<Route path='/admin/ticket-types/:TTid' element={<ViewTicketType />} />
				<Route
					path='/admin/singleoperstats'
					element={<IndividualOperatorCard />}
				/>
				<Route
					path='/admin/operatorstatsview'
					element={<IndividualOperDash />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
