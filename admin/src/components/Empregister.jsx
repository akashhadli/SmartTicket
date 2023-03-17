import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Opersidebar from './Opersidebar';

const Empregister = () => {

  const [EmpName, setEmpName] = useState('');
  const [EmpIntId, setEmpIntId] = useState('');
  const [EmpDateOfBirth, setEmpDateOfBirth] = useState('');
  const [EmpType, setEmpType] = useState('');
  const [EmpPhone, setEmpPhone] = useState('');
  const [EmpAadhar, setEmpAadhar] = useState('');
  const [EmpPassword, setEmpPassword] = useState('');
  const [EmpAddr1, setEmpAddr1] = useState('');
  const [EmpAddr2, setEmpAddr2] = useState('');
  const [EmpCity, setEmpCity] = useState('');
  const [EmpPincode, setEmpPincode] = useState('');
  const history = useNavigate();

  const setData = (e) => {
    setEmpName(e.target.value);
  };

  const setData1 = (e) => {
    setEmpIntId(e.target.value);
  };
  const setData2 = (e) => {
    setEmpDateOfBirth(e.target.value);
  };
  const setData3 = (e) => {
    setEmpType(e.target.value);
    
  };
  const setData4 = (e) => {
    setEmpPhone(e.target.value);
  };
  const setData5 = (e) => {
    setEmpAadhar(e.target.value);
  };
  const setData6 = (e) => {
    setEmpPassword(e.target.value);
  };
  const setData7 = (e) => {
    setEmpAddr1(e.target.value);
  };
  const setData8 = (e) => {
    setEmpAddr2(e.target.value);
  };

  const setData9 = (e) => {
    setEmpCity(e.target.value);
  };

  const setData10 = (e) => {
    setEmpPincode(e.target.value);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post('https://amsweets.in/employe/create', {
      EmpName,
      EmpIntId,
      EmpDateOfBirth,
      EmpType,
      EmpPhone,
      EmpAadhar,
      EmpPassword,
      EmpAddr1,
      EmpAddr2,
      EmpCity,
      EmpPincode,
    });
    if (
      !EmpName ||
      !EmpIntId ||
      !EmpDateOfBirth ||
      !EmpType ||
      !EmpPhone ||
      !EmpAadhar ||
      !EmpPassword ||
      !EmpAddr1 ||
      !EmpAddr2 ||
      !EmpCity ||
      !EmpPincode
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

  console.log(EmpType)
  return (
    <div className='flex flex-row gap-4'>
      <Opersidebar/>
      <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='py-2 flex flex-col justify-center items-center'>
          <form className='max-w-[400px] w-full mx-auto text-sm'>
            <h2 className='text-2xl text-pink-500 text-center py-1'>
              Employe Register
            </h2>
            <div className='flex flex-col py-1'>
              <label>Employe Name</label>
              <input
                type='text'
                onChange={setData}
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Employe Id</label>
              <input
                type='text'
                onChange={setData1}
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Date of birth</label>
              <input
                type='date'
                onChange={setData2}
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1' >
              <label>Employe Type</label>
              <select className='border p-1 rounded w-full hover:border-pink-500 duration-200' onChange={setData3}>
              <option>Select Type</option>
            <option value="Conductor">Conductor</option>
            <option value="Checker">Checker</option>
            <option value="Depo Manager">Depo Manager</option>
            </select>
            
            </div>

            <div className='flex flex-col py-1'>
              <label>Phone no</label>
              <input
                type='number'
                onChange={setData4}
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Aadhar No</label>
              <input
                type='number'
                onChange={setData5}
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Password</label>
              <input
                type='password'
                onChange={setData8}
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Address1</label>
              <input
                type='text'
                onChange={setData6}
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Address2</label>
              <input
                type='text'
                onChange={setData7}
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>City</label>
              <input
                type='text'
                onChange={setData9}
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <div className='flex flex-col py-1'>
              <label>Pincode</label>
              <input
                type='number'
                onChange={setData10}
                className='border p-1 rounded w-full hover:border-pink-500 duration-200'
              />
            </div>
            <button
              className='border  w-full my-2 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
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

export default Empregister;
