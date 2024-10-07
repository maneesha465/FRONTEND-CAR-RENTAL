import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/adminApi";
import toast from "react-hot-toast";

export const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await adminLogin(data);
      if (response) {
        toast.success("Login successful");
        navigate("/admin/home");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div
    className="hero min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: `url('https://avisassets.abgemea.com/dam/jcr:4775484f-b38e-42a3-b6ca-d513e5ababe4/Budget-bookingpanel-sunsetflip-1600x573.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
      <div className="hero-content flex-col lg:flex-row lg:w-6/12">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Admin Login</h1>
          <p className="py-6">
            Welcome back, Admin! Please log in to manage the platform.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
