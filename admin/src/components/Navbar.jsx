import React from 'react';
import logo from '../assets/logo.jpg';

const Navbar = () => {
	return (
		<div className='fixed px-8 py-4 z-50 shadow-lg text-2xl bg-white flex flex-row justify-between items-center h-[60px] w-full'>
			<div className='flex items-center justify-between gap-4'>
				<img
					className='w-[50px] ml-2 rounded-r-full rounded-l-full'
					src={logo}
					alt='LOGO'
				/>
				<div>LEKPAY</div>
			</div>

			<div>
				<ul className='flex flex-row gap-6'>
					<li className='text-xl p-2 hover:cursor-pointer hover:underline duration-200'>
						<a href='/'>Home</a>
					</li>
					<li className='text-xl p-2 hover:cursor-pointer hover:underline duration-200'>
						<a href='/signin'>Login</a>
					</li>
					<li className='text-xl p-2 hover:cursor-pointer hover:underline duration-200'>
						FAQ's
					</li>
					<li className='text-xl p-2 hover:cursor-pointer hover:underline duration-200'>
						Contact Us
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
