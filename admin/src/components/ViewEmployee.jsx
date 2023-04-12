import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Sidebar from './Sidebar';

const ViewEmployee = () => {
	// const history = useNavigate();
	const [data, setData] = useState([]);
	const { EmpId } = useParams();
	const getUserData = async () => {
		const res = await axios.get(
			`http://localhost:8004/admin/employees/${EmpId}`
		);

		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	// const handleSub = async () => {
	// 	const res = await axios.patch(
	// 		`http://localhost:8004/admin/approve/${EmpId}`
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
					<h1 className='text-4xl text-pink-500 ml-4 py-6'>Empoyee Detail</h1>
					{data.length > 0
						? data.map((el, i) => {
								return (
									<>
										<div className='flex flex-col ml-4' key={el.EmpId}>
											<label className='p-1 my-1 text-start'>
												Name: <span className='ml-2'>{el.EmpName}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Employee Type:{' '}
												<span className='ml-2'>{el.EmpType}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Mobile No: <span className='ml-2'>{el.EmpMobile}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Date of Birth: <span className='ml-2'>{el.EmpDOB}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Address 1:
												<span className='ml-2'>{el.EmpAddr1}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Address 2:
												<span className='ml-2'>{el.EmpAddr2}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												City:
												<span className='ml-2'>{el.EmpCity}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												PinCode:
												<span className='ml-2'>{el.EmpPincode}</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Created Date:
												<span className='ml-2'>
													{moment(el.EmpCreatedDate).format('DD-MM-YYYY')}
												</span>
											</label>
											<label className='p-1 my-1 text-start'>
												Modified Date:
												<span className='ml-2'>
													{moment(el.EmpModifiedDate).format('DD-MM-YYYY')}
												</span>
											</label>
											{/* <div className='flex flex-row justify-center m-4'>
												<Link to={'/opertable'}>
													<button className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'>
														Cancel
													</button>
												</Link>
												<Link to={`/approve/${el.EmpId}`}>
													<button
														className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'
														// onClick={handleSub}
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

export default ViewEmployee;
