import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Opersidebar from './Opersidebar';

const Astedit = () => {
	const [astRegNo, setAstRegNo] = useState('');
	const [astName, setAstName] = useState('');
	const [astModel, setAstModel] = useState('');
	const [astChasNo, setAstChasNo] = useState('');
	const [astEngNo, setAstEngNo] = useState('');
	const [astPermitNo, setAstPermitNo] = useState('');
	const [astInsurExp, setAstInsurExp] = useState('');
	const [astPermitExp, setAstPermitExp] = useState('');
	const history = useNavigate();

	const { AstId } = useParams();

	// function
	const setData1 = (e) => {
		setAstRegNo(e.target.value);
	};

	const setData2 = (e) => {
		setAstName(e.target.value);
	};
	const setData3 = (e) => {
		setAstModel(e.target.value);
	};
	const setData4 = (e) => {
		setAstChasNo(e.target.value);
	};
	const setData5 = (e) => {
		setAstEngNo(e.target.value);
	};
	const setData6 = (e) => {
		setAstPermitNo(e.target.value);
	};
	const setData7 = (e) => {
		setAstInsurExp(e.target.value);
	};
	const setData8 = (e) => {
		setAstPermitExp(e.target.value);
	};

	const getData = async () => {
		const res1 = await axios.get(
			`https://amsweets.in/operator/astread/${AstId}`
		);

		if (res1.data.status === 201) {
			console.log(res1.data.data[0]);
			setAstRegNo(res1.data.data[0].AstRegNo);
			setAstName(res1.data.data[0].AstName);
			setAstModel(res1.data.data[0].AstModel);
			setAstChasNo(res1.data.data[0].AstChasNo);
			setAstEngNo(res1.data.data[0].AstEngNo);
			setAstPermitNo(res1.data.data[0].AstPermitNo);
			setAstInsurExp(res1.data.data[0].AstInsurExp);
			setAstPermitExp(res1.data.data[0].AstPermitExp);
			return;
		} else {
			console.log('error');
		}
	};

	const handleSub = async (e) => {
		e.preventDefault();

		if (
			!astRegNo ||
			!astName ||
			!astModel ||
			!astChasNo ||
			!astEngNo ||
			!astPermitNo ||
			!astInsurExp ||
			!astPermitExp
		) {
			alert('Fill the details');
			return;
		} else {
			const res = await axios.patch(
				`https://amsweets.in/operator/asset/update/${AstId}`,
				{
					astRegNo,
					astName,
					astModel,
					astChasNo,
					astEngNo,
					astPermitNo,
					astInsurExp,
					astPermitExp,
				}
			);
			if (res.data.status === 201) {
				alert('Employee successfully update');
				history('/astview');
				return;
			} else {
				alert('Employee unable to update');
				return;
			}
		}
	};

	useEffect(() => {
		getData();
	}, []);
	return (
		<div className='flex flex-row gap-4'>
			<Opersidebar />
			<div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
				<div className='py-4 flex flex-col justify-center items-center'>
					<form className='max-w-[400px] w-full mx-auto'>
						<h2 className='text-4xl text-pink-500 text-center py-1'>
							Update Asset
						</h2>
						<div className='flex flex-col py-1'>
							<label>Asset Registration Number</label>
							<input
								name='astRegNo'
								type='text'
								value={astRegNo}
								onChange={setData1}
								className='border rounded w-full hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-col py-1'>
							<label>Asset Model</label>
							<input
								name='astName'
								type='text'
								onChange={setData2}
								value={astName}
								className='border rounded w-full hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-col py-1'>
							<label>Manufacture Year</label>
							<input
								name='astModel'
								type='number'
								onChange={setData3}
								value={astModel}
								className='border rounded w-full hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-col py-1'>
							<label>Chasis Number</label>
							<input
								name='astChasNo'
								type='text'
								onChange={setData4}
								value={astChasNo}
								className='border rounded w-full hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-col py-1'>
							<label>Engine Number</label>
							<input
								name='astEngNo'
								type='text'
								onChange={setData5}
								value={astEngNo}
								className='border rounded w-full hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-col py-1'>
							<label>Permit Number</label>
							<input
								name='astPermitNo'
								type='text'
								onChange={setData6}
								value={astPermitNo}
								className='border rounded w-full hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-col py-1'>
							<label>Insurance Exp</label>
							<input
								name='astInsurExp'
								type='date'
								onChange={setData7}
								value={astInsurExp}
								className='border rounded w-full hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<div className='flex flex-col py-1'>
							<label>Permit Exp</label>
							<input
								name='astPermitExp'
								type='date'
								onChange={setData8}
								value={astPermitExp}
								className='border rounded w-full hover:border-pink-500 duration-200 p-1'
							/>
						</div>
						<button
							className='border w-full my-2 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
							onClick={handleSub}
						>
							Register
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Astedit;
