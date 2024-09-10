import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";




export const addCar = async (data) => {
  try {
    const response = await axiosInstance({
      url: "/car/create",
      method: "POST",
      data,
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    toast.error("Creating car Failed");
    console.log(error);
  }
};

// export const deleteCar = async (id) => {
//   try {
//     const response = await axiosInstance({
// url:"/car/deletecar/${id}",
// method:"DELETE",
// data,
// withCredentials:true,
//     })
//     return response.data;
//   } catch (error) {
//     toast.error("Creating car Failed");
//     console.log(error);
//   }
// };

// export const updateCar = async (id,data) => {
//   try {
//     const response = await axiosInstance({
// url:`/car/updatecar/${id}`,
// method:"PUT",
// data,
// withCredentials:true,
//     })
//     return response.data;
//   } catch (error) {
//     toast.error("Updating car Failed");
//     console.error("Error updating car:", error);
//     console.log(error);
//   }
// };


