import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
});

const ForgotPasswordModal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Request Password Reset Data:', data);
    //---------------------------Here we can write other logic like api call for reset the password...!
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#5C218B] p-4">
      <div className="relative w-full max-w-md mx-auto bg-white p-8 shadow-lg rounded-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Enter your email
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
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Request Reset
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
