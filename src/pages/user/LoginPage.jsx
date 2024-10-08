import React from 'react';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../services/userApi';

export const LoginPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await userLogin(data);

            if (response?.userId) {
                localStorage.setItem('userId', response.userId);
                toast.success('Login success');
                navigate('/user/home');
            } else {
                toast.error('Login failed');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div 
            className="hero bg-base-100 py-20" 
            style={{
                backgroundImage: `url("https://avisassets.abgemea.com/dam/jcr:4775484f-b38e-42a3-b6ca-d513e5ababe4/Budget-bookingpanel-sunsetflip-1600x573.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
            }}
        >
            <div className="hero-content flex-col lg:flex-row lg:w-6/12 bg-white bg-opacity-90 p-10 rounded-lg shadow-lg">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Book a car today!
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        {/* Email Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email address"
                                    }
                                })}
                                placeholder="email"
                                className="input input-bordered"
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long"
                                    }
                                })}
                                placeholder="password"
                                className="input input-bordered"
                            />
                            {errors.password && (
                                <span className="text-red-500 text-sm">
                                    {errors.password.message}
                                </span>
                            )}
                            <label className="label">
                                <Link to={'/signup'}>
                                    New user?
                                </Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type='submit'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
