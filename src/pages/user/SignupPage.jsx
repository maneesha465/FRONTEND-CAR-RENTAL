import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { userSignup } from '../../services/userApi';
import toast from 'react-hot-toast';

export const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await userSignup(data);
      toast.success('Signup success');
      navigate('/login');
    } catch (error) {
      toast.error('Signup failed');
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
      <div className="hero-content flex-col lg:flex-row lg:w-6/12">
        <div className="text-center lg:text-left text-white">
          <h1 className="text-5xl font-bold">Signup now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                placeholder="name"
                className="input input-bordered"
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: 'Please enter a valid email',
                  },
                })}
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="number"
                {...register('mobile', { required: 'Phone number is required',
                  minLength: {
                    value: 10,
                    message: 'Phone number must be at least 10 digits',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Phone number cannot exceed 10 digits',
                  },
                 })}
                placeholder="Phone"
                className="input input-bordered"
              />
              {errors.mobile && <p className="text-red-500">{errors.mobile.message}</p>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                })}
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              <label className="label">
                <Link to={'/login'}>Existing user?</Link>
              </label>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
