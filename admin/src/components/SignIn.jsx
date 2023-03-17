import axios from 'axios';
import React, { useState , useEffect} from 'react';
import Header from './Header'
import { useNavigate } from 'react-router-dom';
import login from '../assets/login.jpg';

const SignIn = () => {
  const [Aname, setAName] = useState('');
  const [Apassword, setAPassword] = useState('');

  const history = useNavigate();

  const setData = (e) => {
    setAName(e.target.value);
  };

  const setData1 = (e) => {
    setAPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post('https://amsweets.in/admin/login', {
      Aname,
      Apassword,
    });

    if (!Aname || !Apassword) {
      alert('Fill the details');
    } else {
      if (res.data.status === 200) {
        alert("User doesn't exist");
        return 0;
      }
      if (res.data.status === 201) {
        alert('User Login Successfully');
        if(res.data.data === 'A'){
          setTimeout(() => history('/dashboard'), 500);
        }else{
          setTimeout(() => history('/operdashboard'), 500);
        }
        
      } else {
        alert('Wrong username/password!!');
      }
    }
  };

  const getUserAuth = async() => {
     
    const res = await axios.post('https://amsweets.in/admin/copy');
    const res1 = await axios.post('https://amsweets.in/admin/copy1');
  }

  useEffect(() => {
    getUserAuth();
  }, []);


  const handlereg = () => {
    history('/register');
  };



  return (
    <>
    <Header/>
    <div className='grid grid-cols-1 sm:grid-cols-2 h-full w-full'>
      <div className='flex flex-col justify-center'>
        <form className='max-w-[400px] w-full mx-auto p-4  rounded-md'>
          <h2 className='text-4xl text-pink-500 text-center py-6'>Sign In</h2>
          <div className='flex flex-col py-2'>
            <label>Username/Email</label>
            <input
              type='text'
              onChange={setData}
              className='border rounded p-2 hover:border-pink-400 duration-200'
            />
          </div>
          <div className='flex flex-col py-2'>
            <label>Password</label>
            <input
              type='password'
              onChange={setData1}
              className='border rounded p-2 hover:border-pink-400 duration-200'
            />
          </div>

          <div className='flex justify-between'>
            <p className='flex items-center'>
              <input type='checkbox' className='mr-2 cursor-pointer' />
              Remember Me
            </p>
            <p className='hover:text-pink-500 cursor-pointer'>
              <a href='/'>Forgotten Password?</a>
            </p>
          </div>
          <button
            className='border w-full my-5 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
            onClick={handleSubmit}
            >
            Sign In
          </button>
          <div className='flex justify-between'>
            <p className='mx-auto'>
              <a href='/register'>
                Don't have an account?
                <span className='hover:text-pink-500' onClick={handlereg}>
                  Register
                </span>
              </a>
            </p>
          </div>
        </form>
      </div>
      <div className='hidden sm:block  mt-16'>
        <img src={login} alt='logo' className='w-[500px] h-[500px]' />
      </div>
    </div>
</>
  );
};

export default SignIn;
