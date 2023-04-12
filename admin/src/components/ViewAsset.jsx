import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from './Sidebar';

const ViewAsset = () => {
	// const history = useNavigate();
	const [data, setData] = useState([]);
	const { AstId } = useParams();
	const getUserData = async () => {
		const res = await axios.get(`http://localhost:8004/admin/assets/${AstId}`);

		if (res.data.status === 201) {
			console.log(res.data.data);
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	// const handleSub = async () => {
	// 	const res = await axios.patch(
	// 		`http://localhost:8004/admin/approve/${AstId}`
	// 	);
	// 	if (res.data.status === 201) {
	// 		alert('Operator Approved');
	// 		setTimeout(() => history('/dashboard'), 500);
	// 		return;
	// 	} else {
	// 		console.log('error');
	// 	}
	// };

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<>
			<div className='flex flex-row gap-4'>
				<Sidebar />
				<div className='container  my-8 h-full w-auto p-4 ml-[30%] pr-6 border'>
					<h1 className='text-4xl text-pink-500 ml-4 py-6'>Asset Detail</h1>
					{data.length > 0
						? data.map((el, i) => {
								return (
									<>
										<div className='flex flex-col ml-4' key={el.AstId}>
											<label className='p-1 my-1 text-start'>
												ID: <span className='ml-2'>{el.AstId}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Reg No: <span className='ml-2'>{el.AstRegNo}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Name: <span className='ml-2'>{el.AstName}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Model: <span className='ml-2'>{el.AstModel}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Chasis No: <span className='ml-2'>{el.AstChasNo}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Enigine No:
												<span className='ml-2'>{el.AstEngNo}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Permit No:
												<span className='ml-2'>{el.AstPermitNo}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Insurance Expire:
												<span className='ml-2'>{el.AstInsurExp}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Permit Expire:
												<span className='ml-2'>{el.AstPermitExp}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Created Date:
												<span className='ml-2'>
													{moment(el.AstCreatedDate).format('DD-MM-YYYY')}
												</span>
											</label>
											{/* <div className='flex flex-row justify-center m-4'>
												<Link to={'/opertable'}>
													<button className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'>
														Cancel
													</button>
												</Link>
												<Link to={`/approve/${el.AstId}`}>
													<button
														className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'
														// onClick={handleSub}
													>
														Delete
													</button>
												</Link>
											</div> */}
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

export default ViewAsset;
