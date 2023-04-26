import React, { useEffect } from 'react';
// import Opertable from './Opertable';
// import Dheader from './Dheader';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import Header from './operLayout/Header';
import StatsGrid from './operLayout/StatsGrid';
import TransactionChart from './operLayout/TransactionChart';

const Dashboard = () => {
	const history = useNavigate();

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/');
		}
	}, []);

	return (
		<div className='flex gap-4 bg-gray-50'>
			<Sidebar />
			<div className='flex flex-col flex-1'>
				<Header />
				<div className='flex flex-col gap-4'>
					<StatsGrid />
					<TransactionChart />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
