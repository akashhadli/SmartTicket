import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
const Operview = () => {
  const [data, setData] = useState([]);
  const { OperId } = useParams();
  const getUserData = async () => {
    const res = await axios.get(`https://amsweets.in/operator/${OperId}`);

    if (res.data.status === 201) {
      setData(res.data.data);
    } else {
      console.log('error');
    }
  };

  const handleSub = async () => {
    const res = await axios.patch(
      `https://amsweets.in/admin/approve/${OperId}`,
    );
    if (res.data.status === 201) {
      alert('Operator Approved');
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className='flex flex-row gap-4'>
        <Sidebar />
        <div className='container  my-8 h-full w-auto p-4 ml-[30%] pr-6 border'>
          <h1 className='text-4xl text-pink-500 ml-4 py-6'>
            Operator Detail
          </h1>
          {data.length > 0
            ? data.map((el, i) => {
                return (
                  <>
                    <div className='flex flex-col ml-4' key={el.OperId}>
                      <label className='p-1 my-1 text-start'>
                        Company Name: <span className='ml-2'>{el.OperName}</span>
                      </label>
                      <label className='p-1 my-1 text-start'>
                        Company Email: <span className='ml-2'>{el.OperEmail}</span>
                      </label>
                      <label className='p-1 my-1 text-start'>
                        GST No: <span className='ml-2'>{el.OperGSTIN}</span>
                      </label>
                      <label className='p-1 my-1 text-start'>
                        Phone No: <span className='ml-2'>{el.OperPhone}</span>
                      </label>
                      <label className='p-1 my-1 text-start'>
                        Contact Name:<span className='ml-2'>{el.OperContactName}</span>
                      </label>
                      <label className='p-1 my-1 text-start'>
                        Contact Email:<span className='ml-2'>{el.OperContactEmail}</span>
                      </label>
                      <div className='flex flex-row justify-center m-4'>
                        <Link to={'/opertable'}>
                          <button className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'>
                            Cancel
                          </button>
                        </Link>
                        <Link
                            to={`/approve/${el.OperId}`}
                          >
                        <button
                          className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'
                          onClick={handleSub}
                        >
                          Approve
                        </button>
                        </Link>
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

export default Operview;
