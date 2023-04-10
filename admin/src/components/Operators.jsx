import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Operators = () => {
	const [data, setData] = useState('');

	const getOperators = async () => {
		const res = await axios.get('https://amsweets.in/admin/operators');

		if (res.data.status === 201) {
			console.log(res.data.data);
			setData(res.data.data);
		} else {
			console.log('error');
		}
	};

	useEffect(() => {
		getOperators();
	}, []);

	return (
		<>
			<div className='flex flex-1'>
				<Sidebar />
				<div className='flex flex-row gap-4 ml-[100px]'>
					<div className='pt-8 px-20 mt-auto mr-4 items-center text-center rounded-sm flex-1'>
						<strong className='text-gray-700 text-2xl'>Operators</strong>
						<div className='overflow-y-auto h-screen'>
							<table className='w-full text-gray-700 justify-between mx-auto'>
								<thead>
									<tr className='justify-between text-center'>
										<th className='p-1 ml-1'>Sl No</th>
										{/* <th className='p-1 ml-1'>Oper ID</th> */}
										{/* <th className='p-1 ml-1'>Operator</th> */}
										<th className='p-1 ml-1'>Short Name</th>
										<th className='p-1 ml-1'>Email</th>
										<th className='p-1 ml-1'>Mobile</th>
										{/* <th className='p-1 ml-1'>Date Of Birth</th> */}
										{/* <th className='p-1 ml-1'>Status</th> */}
										<th className='p-1 ml-1'>Flag</th>
										<th className='p-1 ml-1'>Created Date</th>
										{/* <th className='p-1 ml-1'>Modified Date</th> */}
									</tr>
								</thead>
								<tbody className='justify-between text-center'>
									{data.length > 0
										? data.map((el, i) => {
												return (
													<>
														<tr className='border border-gray-200 mx-auto'>
															<td className='p-1 ml-1'>{i + 1}</td>
															{/* <td className='p-1 ml-1'>{el.OperId}</td> */}
															<td className='p-1 ml-1'>{el.OperShortName}</td>
															<td className='p-1 ml-1'>{el.OperEmail}</td>
															<td className='p-1 ml-1'>{el.OperPhone}</td>
															<td className='p-1 ml-1'>{el.Flag}</td>
															{/* <td className='p-1 ml-1'>{el.UDoB}</td>
														<td className='p-1 ml-1'>{el.UStatus}</td>
														<td className='p-1 ml-1'>{el.Flag}</td> */}
															<td className='p-1 ml-1'>{el.OperCreatedDate}</td>
															{/* <td className='p-1 ml-1'>{el.UModifiedDate}</td> */}
															<td className='p-1 ml-1'>
																<Link to={`/user/${el.OperId}`}>
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

export default Operators;
