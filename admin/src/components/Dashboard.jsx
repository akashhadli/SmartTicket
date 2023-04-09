import React from 'react';
// import Opertable from './Opertable';
// import Dheader from './Dheader';
import Sidebar from './Sidebar';

const Dashboard = () => {
	return (
		<div className='flex flex-row gap-4 h-full'>
			<Sidebar />
			<div className='justify-center items-center m-auto'>Dashboard</div>
		</div>
	);
};

export default Dashboard;
