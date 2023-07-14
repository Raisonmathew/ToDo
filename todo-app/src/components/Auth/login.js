import React, { useState } from 'react';
import loginRequest from '../../api/loginRequest';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { NavLink } from 'react-router-dom';
import jwt from 'jwt-decode'

export const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    loginRequest(data)
        .then(({token}) => {
          localStorage.setItem("token", token);
          const user = jwt(token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate('/todo');
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
        });
  };

  return (
    <div className="bg-gray-100 login-form-height">
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md login-form-center">
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
            {error && (<p style={{"color": 'red'}}>{error}</p>)}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" style={{"textAlign": "left"}}>Email</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    name="email"
                    {...register("email", {
                    required: "Email is required.",
                    pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: "Email is not valid."
                    }
                    })}
                />
                {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" style={{"textAlign": "left"}}>Password</label>
                <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    name="password"
                    {...register("password", {
                    required: "Password is required.",
                    minLength: {
                        value: 6,
                        message: "Password should be at-least 6 characters."
                    }
                    })}
                />
                {errors.password && (
                    <p className="errorMsg">{errors.password.message}</p>
                )}
                </div>
                <div className="form-control">
                <label></label>
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
                </div>
            </form>
            <p className="text-center text-gray-700 text-sm mt-4">
                Don't have an account? <NavLink to="/register" className="text-blue-500">Sign Up</NavLink> </p>
        </div>
    </div>
  );
};