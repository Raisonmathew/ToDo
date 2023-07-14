import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import registerRequest from '../../api/registerRequest';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm();
    const [error, setError] = useState('')

      const navigate = useNavigate();
    
      const submitForm = (data) => {
        const registerData = {...data, "isAdmin": false};
        console.log(registerData)
        registerRequest(registerData)
        .then((data) => {
          reset();
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
        });
      }
    return (
      <div className="bg-gray-100 login-form-height">
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md login-form-center">
          <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit(submitForm)}>
            <div className='mb-4'>
              <label htmlFor='Username' className="block text-gray-700 text-sm font-bold mb-2" style={{"textAlign": "left"}}>User Name</label>
              <input
                type='text'
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                {...register('userName', {
                    required: "Username is required."
                  })}
              />
              {errors.userName && (
                <p className="errorMsg">{errors.userName.message}</p>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className="block text-gray-700 text-sm font-bold mb-2" style={{"textAlign": "left"}}>Email</label>
              <input
                type='email'
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                {...register('email', {
                    required: "Email is required.",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: "Email is not valid."
                    }})}
              />
              {errors.email && <p className="errorMsg">{errors.email.message}</p>}
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className="block text-gray-700 text-sm font-bold mb-2" style={{"textAlign": "left"}}>Password</label>
              <input
                type='password'
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                {...register('password', {
                    required: true,
                    validate: {
                      checkLength: (value) => value.length >= 6
                    }
                })}
              />
              {errors.password?.type === "required" && (
                <p className="errorMsg">Password is required.</p>
              )}
              {errors.password?.type === "checkLength" && (
                <p className="errorMsg">
                  Password should be at-least 6 characters.
                </p>
              )}
            </div>
            <button type='submit' className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Register
            </button>
          </form>
        </div>
      </div>
    )
  }

export default Register;