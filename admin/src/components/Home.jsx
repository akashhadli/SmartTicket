import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Home = () => {
	return (
		<div>
			<Navbar />
			<div className='w-full'>
				<img className='w-full h-screen' src='' alt='/' />
			</div>
			<Footer />
		</div>
	);
};

export default Home;
