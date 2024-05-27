import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      navigate('/home');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="group relative w-full max-w-md mx-auto bg-white p-8 shadow-lg rounded-md">
      <h1 className="text-5xl font-semibold mb-6 text-center text-purple-900">DigitalFlake</h1>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-500">Welcome to DigitalFlake Admin</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email ID
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''}`}
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.password ? 'border-red-500' : ''}`}
            placeholder="Password"
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
          >
            Forgot Password?
          </button>
        </div>
        {authState.error && <p className="text-red-500 text-xs italic mt-4">{authState.error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
