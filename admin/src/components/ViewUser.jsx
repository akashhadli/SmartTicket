import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from './Sidebar';

const ViewUser = () => {
	// const history = useNavigate();
	const [data, setData] = useState([]);
	const { UserId } = useParams();
	const getUserData = async () => {
		const res = await axios.get(`http://localhost:8004/admin/users/${UserId}`);

		if (res.data.status === 201) {
			console.log(res.data.data);
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	// const handleSub = async () => {
	// 	const res = await axios.patch(
	// 		`http://localhost:8004/admin/approve/${UserId}`
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
					<h1 className='text-4xl text-pink-500 ml-4 py-6'>User Detail</h1>
					{data.length > 0
						? data.map((el, i) => {
								return (
									<>
										<div className='flex flex-col ml-4' key={el.UserId}>
											<label className='p-1 my-1 text-start'>
												ID: <span className='ml-2'>{el.UserId}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Name: <span className='ml-2'>{el.Uname}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Gender: <span className='ml-2'>{el.Ugender}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Mobile No: <span className='ml-2'>{el.Umobile}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Email: <span className='ml-2'>{el.Uemail}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Date of Birth:
												<span className='ml-2'>{el.UDoB}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Address 1:
												<span className='ml-2'>{el.UAddr1}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Address 2:
												<span className='ml-2'>{el.UAddr2}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												City:
												<span className='ml-2'>{el.Ucity}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												PinCode:
												<span className='ml-2'>{el.UPinCode}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Aadhar:
												<span className='ml-2'>{el.Uaadhar}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Status:
												<span className='ml-2'>{el.UStatus}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Flag:
												<span className='ml-2'>{el.Flag}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Created Date:
												<span className='ml-2'>
													{moment(el.UCreatedDate).format('DD-MM-YYYY')}
												</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Modified Date:
												<span className='ml-2'>
													{moment(el.UModifiedDate).format('DD-MM-YYYY')}
												</span>
											</label>
											{/* <div className='flex flex-row justify-center m-4'>
												<Link to={'/opertable'}>
													<button className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'>
														Cancel
													</button>
												</Link>
												<Link to={`/approve/${el.UserId}`}>
													<button
														className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'
														onClick={handleSub}
													>
														Approve
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

export default ViewUser;
