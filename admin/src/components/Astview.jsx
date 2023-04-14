import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Opersidebar from './Opersidebar';

const Astview = () => {
	const history = useNavigate();
	const [data, setData] = useState([]);
	const { AstId } = useParams();
	const getAssetData = async () => {
		const res = await axios.get(
			`http://localhost:8004/operator/asset/${AstId}`
		);

		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	const handleSub = async () => {
		const res = await axios.patch(
			`http://localhost:8004/operator/asset/delete/${AstId}`
		);
		if (res.data.status === 201) {
			alert(res.data.data);
			history('/astview');
			return;
		} else {
			console.log('error');
		}
	};

	useEffect(() => {
		getAssetData();
	}, []);
	return (
		<>
			<div className='flex flex-row gap-4'>
				<Opersidebar />
				<div className='container  my-8 h-full w-[40%] p-4 mx-auto pr-6 border'>
					<h1 className='text-center text-4xl text-pink-500  py-6'>
						Asset Detail
					</h1>
					{data.length > 0
						? data.map((el, i) => {
								return (
									<>
										<div className='flex flex-col ml-4' key={i + 1}>
											<label className='p-1 my-1 text-start'>
												Asset Registration No:{' '}
												<span className='ml-2'>{el.AstRegNo}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Asset Model: <span className='ml-2'>{el.AstName}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Manufacturing Year:{' '}
												<span className='ml-2'>{el.AstModel}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Chasis No: <span className='ml-2'>{el.AstChasNo}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Engine No:<span className='ml-2'>{el.AstEngNo}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Permit No:<span className='ml-2'>{el.AstPermitNo}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Insurance Expire Date:
												<span className='ml-2'>
													{moment(el.AstInsurExp).format('DD-MM-YYYY')}
												</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Status:<span className='ml-2'>{el.AStatus}</span>
											</label>
											<div className='flex flex-row justify-evenly m-4'>
												<Link to={'/astview'}>
													<button className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'>
														Cancel
													</button>
												</Link>
												<Link to={`/astupdate/${el.AstId}`}>
													<button className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'>
														Edit
													</button>
												</Link>

												<button
													className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'
													onClick={handleSub}
												>
													Delete
												</button>
											</div>
										</div>
									</>
								);
						  })
						: ' '}
				</div>
			</div>
		</>
	);
};

export default Astview;
