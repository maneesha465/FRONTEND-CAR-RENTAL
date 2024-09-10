import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { userSignup } from '../../services/userApi';
import toast from 'react-hot-toast';


export const SignupPage = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate();

  const onSubmit = async(data) =>{
try {
    const response = await userSignup(data)
    toast.success('signup success')
    navigate('/login')
} catch (error) {
    toast.error('sighup failed')
    console.log(error);
    
}
  
}
  



  return (
    <div className="hero bg-base-200 py-20">
  <div className="hero-content flex-col lg:flex-row lg:w-6/12">
    <div className="text-center lg:text-left">
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
          <input type="text" {...register("name")} placeholder="name" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input type="number" {...register("mobile")} placeholder="Phone" className="input input-bordered" required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password")} placeholder="password" className="input input-bordered" required />
          <label className="label">

<Link to={'/login'}>
           Existing user?
           </Link>
          </label>
        </div>
        <div className="form-control mt-6">
       
          <button className="btn btn-primary" type='submit'>signup</button>
     
        </div>
      </form>
    </div>
  </div>
</div>
  )
}
