import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../../services/userApi';

export const LoginPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const navigate = useNavigate();

      const onSubmit = async(data) =>{
    try {
        const response = await userLogin(data)
        toast.success('Login success')
        navigate('/')
    } catch (error) {
        toast.error('Login failed')
        console.log(error);
        
    }
      
    }
      


    
  return (
    <div className="hero bg-base-100 py-20">
  <div className="hero-content flex-col lg:flex-row lg:w-6/12">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Book a car today!
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email"  {...register("email")}  placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password")}  placeholder="password" className="input input-bordered" required />
          <label className="label">
            <Link to={'/signup'}>
            new user?
            </Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary"type='submit'>Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}
