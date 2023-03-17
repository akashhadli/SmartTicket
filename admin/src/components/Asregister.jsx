import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Opersidebar from './Opersidebar';

const Asregister = () => {

  const [OperName, setOPerName] = useState('');
  const [OperEmail, setOPerEmail] = useState('');
  const [OperPhone, setOPerPhone] = useState('');
  const [OperGSTIN, setOPerGSTIN] = useState('');
  const [OperAddr1, setOPerAddr1] = useState('');
  const [OperAddr2, setOPerAddr2] = useState('');
  const [OperPassword, setOPerPassword] = useState('');
  const [OperCity, setOPerCity] = useState('');
  const [OperPincode, setOPerPincode] = useState('');
  const [OperContactName, setOPerContactName] = useState('');
  const [OperContactEmail, setOPerContactEmail] = useState('');
  const history = useNavigate();

  const setData = (e) => {
    setOPerName(e.target.value);
  };

  const setData1 = (e) => {
    setOPerEmail(e.target.value);
  };
  const setData2 = (e) => {
    setOPerPhone(e.target.value);
  };
  const setData3 = (e) => {
    setOPerGSTIN(e.target.value);
  };
  const setData4 = (e) => {
    setOPerAddr1(e.target.value);
  };
  const setData5 = (e) => {
    setOPerAddr2(e.target.value);
  };
  const setData6 = (e) => {
    setOPerPassword(e.target.value);
  };
  const setData7 = (e) => {
    setOPerCity(e.target.value);
  };
  const setData8 = (e) => {
    setOPerPincode(e.target.value);
  };

  const setData9 = (e) => {
    setOPerContactName(e.target.value);
  };

  const setData10 = (e) => {
    setOPerContactEmail(e.target.value);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post('https://amsweets.in/operator/create', {
      OperName,
      OperEmail,
      OperPhone,
      OperGSTIN,
      OperAddr1,
      OperAddr2,
      OperPassword,
      OperCity,
      OperPincode,
      OperContactName,
      OperContactEmail,
    });
    if (
      !OperName ||
      !OperEmail ||
      !OperPhone ||
      !OperGSTIN ||
      !OperAddr1 ||
      !OperAddr2 ||
      !OperPassword ||
      !OperCity ||
      !OperPincode ||
      !OperContactName ||
      !OperContactEmail
    ) {
      alert('Fill the details');
    } else {
      if (res.data.status === 201) {
        alert('User Successfully Created');
        setTimeout(() => history('/Operdashboard'), 500);
      } else {
        alert('User unable to Register');
      }
    }
  };

  return (
    <div className='flex flex-row gap-4'>
      <Opersidebar/>
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='py-4 flex flex-col justify-center items-center'>
          <form className='max-w-[400px] w-full mx-auto'>
            <h2 className='text-4xl text-pink-500 text-center py-1'>
              Asset Register
            </h2>
            <div className='flex flex-col py-1'>
              <label>Employe Name</label>
              <input
                type='text'
                onChange={setData}
                className='border rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Aadhar No</label>
              <input
                type='number'
                onChange={setData1}
                className='border rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Phone no</label>
              <input
                type='number'
                onChange={setData2}
                className='border rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            {/* <div className='flex flex-col py-1'>
              <label>Contact Name</label>
              <input
                type='text'
                onChange={setData9}
                className='border rounded w-full hover:border-pink-500 duration-200'
              />
            </div> */}
            <div className='flex flex-col py-1'>
              <label>Date of birth</label>
              <input
                type='date'
                onChange={setData10}
                className='border rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>City</label>
              <input
                type='text'
                onChange={setData3}
                className='border rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Address1</label>
              <input
                type='text'
                onChange={setData4}
                className='border rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Address2</label>
              <input
                type='text'
                onChange={setData5}
                className='border rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Password</label>
              <input
                type='password'
                onChange={setData6}
                className='border rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>City</label>
              <input
                type='text'
                onChange={setData7}
                className='border rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Pincode</label>
              <input
                type='number'
                onChange={setData8}
                className='border rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <button
              className='border w-full my-2 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Asregister;
