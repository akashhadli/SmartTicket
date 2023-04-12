import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from './Sidebar';

const ViewAdmin = () => {
	// const history = useNavigate();
	const [data, setData] = useState([]);
	const { AdminId } = useParams();
	const getAdminData = async () => {
		const res = await axios.get(`http://localhost:8004/admin/${AdminId}`);

		if (res.data.status === 201) {
			console.log(res.data.data);
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	// const handleSub = async () => {
	// 	const res = await axios.patch(
	// 		`http://localhost:8004/admin/approve/${AdminId}`
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
		getAdminData();
	}, []);

	return (
		<>
			<div className='flex flex-row gap-4'>
				<Sidebar />
				<div className='container  my-8 h-full w-auto p-4 ml-[30%] pr-6 border'>
					<h1 className='text-4xl text-pink-500 ml-4 py-6'>Admin Detail</h1>
					{data.length > 0
						? data.map((el, i) => {
								return (
									<>
										<div className='flex flex-col ml-4' key={el.AdminId}>
											<label className='p-1 my-1 text-start'>
												ID: <span className='ml-2'>{el.AdminId}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Name: <span className='ml-2'>{el.Aname}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Email: <span className='ml-2'>{el.Aemail}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Mobile No: <span className='ml-2'>{el.Amobile}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Date of Birth: <span className='ml-2'>{el.ADoB}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Gender:
												<span className='ml-2'>{el.Agender}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Created Date:
												<span className='ml-2'>
													{moment(el.ACreatedDate).format('DD-MM-YYYY')}
												</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Modified Date:
												<span className='ml-2'>
													{moment(el.AModifiedDate).format('DD-MM-YYYY')}
												</span>
											</label>
											{/* <div className='flex flex-row justify-center m-4'>
												<Link to={'/opertable'}>
													<button className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'>
														Cancel
													</button>
												</Link>
												<Link to={`/approve/${el.AdminId}`}>
													<button
														className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'
														onClick={handleSub}
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

export default ViewAdmin;
