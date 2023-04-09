import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
const Employees = () => {
	const [data, setData] = useState('');

	const getEmployees = async () => {
		const res = await axios.get('http://localhost:8004/admin/employees');

		if (res.data.status === 201) {
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	useEffect(() => {
		getEmployees();
	}, []);

	return (
		<>
			<div className='flex flex-1'>
				<Sidebar />
				<div className='flex flex-row gap-4 ml-[100px]'>
					<div className='pt-8 px-20 mt-auto mr-4 items-center text-center rounded-sm flex-1'>
						<strong className='text-gray-700 text-2xl'>Employees</strong>
						<div className='overflow-y-auto h-screen'>
							<table className='w-full text-gray-700 justify-between mx-auto'>
								<thead>
									<tr className='justify-between text-center'>
										<th className='p-1 ml-1'>Sl No</th>
										{/* <th className='p-1 ml-1'>Asset ID</th> */}
										<th className='p-1 ml-1'>Name</th>
										<th className='p-1 ml-1'>Type</th>
										<th className='p-1 ml-1'>Mobile</th>
										<th className='p-1 ml-1'>DOB</th>
										{/* <th className='p-1 ml-1'>Asset Eng No</th>
									<th className='p-1 ml-1'>Asset Permit No</th>
									<th className='p-1 ml-1'>Asset Insur Exp</th>
									<th className='p-1 ml-1'>Asset Permit Exp</th> */}
										<th className='p-1 ml-1'>Created Date</th>
										<th className='p-1 ml-1'>Modified Date</th>
									</tr>
								</thead>
								<tbody className='justify-between text-center'>
									{data.length > 0
										? data.map((el, i) => {
												return (
													<>
														<tr className='border border-gray-200 mx-auto'>
															<td className='p-1 ml-1'>{i + 1}</td>
															{/* <td className='p-1 ml-1'>{el.AstId}</td> */}
															<td className='p-1 ml-1'>{el.EmpName}</td>
															<td className='p-1 ml-1'>{el.EmpType}</td>
															<td className='p-1 ml-1'>{el.EmpMobile}</td>
															<td className='p-1 ml-1'>{el.EmpDOB}</td>
															{/* <td className='p-1 ml-1'>{el.AstEngNo}</td>
														<td className='p-1 ml-1'>{el.AstPermitNo}</td>
														<td className='p-1 ml-1'>{el.AstInsurExp}</td>
														<td className='p-1 ml-1'>{el.AstPermitExp}</td> */}
															<td className='p-1 ml-1'>{el.EmpCreatedDate}</td>
															<td className='p-1 ml-1'>{el.EmpModifiedDate}</td>
															<td className='p-1 ml-1'>
																<Link to={`/employee/${el.EmpId}`}>
																	<button className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'>
																		View
																	</button>
																</Link>
															</td>
														</tr>
													</>
												);
										  })
										: ' '}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Employees;
