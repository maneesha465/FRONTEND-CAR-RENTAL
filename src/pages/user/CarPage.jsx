// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const cars = [
//   {
//     id: 1,
//     name: 'Tesla Model S',
//     image: "https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80",
//     description: 'An electric sedan with great performance.',
//   },
//   {
//     id: 2,
//     name: 'BMW i8',
//     image: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/130591/fronx-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80',
//     description: 'A hybrid sports car with a sleek design.',
//   },
//   // Add more cars as needed
// ];

// export const CarPage = () => {
//   const navigate = useNavigate();

//   const handleMoreInfo = (carId) => {
//     navigate(`/user/car_details/${carId}`);
//   };

//   return (
//     <div className="container mx-auto p-6">
//       {/* Carousel */}
//       <div className="carousel w-full mb-8">
//         {cars.map((car) => (
//           <div key={car.id} className="carousel-item w-full">
//             <img src={car.image} className="w-full h-96 object-cover" alt={car.name} />
//           </div>
//         ))}
//       </div>

//       {/* Car Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {cars.map((car) => (
//           <div key={car.id} className="card bg-base-100 shadow-xl">
//             <figure>
//               <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
//             </figure>
//             <div className="card-body">
//               <h2 className="card-title">{car.name}</h2>
//               <p>{car.description}</p>
//               <div className="card-actions justify-end">
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => handleMoreInfo(car.id)}
//                 >
//                   More Info
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };



import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

//import { useDispatch, useSelector } from "react-redux";
// import { fetchCourseList } from "../../redux/features/courseSlice";
import { CarCard } from "../../components/ui/Cards";

export const CarPage = () => {
  //const dispatch = useDispatch();
  //const { car } = useSelector((state) => state.car);
const [car,setcars] =useState([])

  const fetchcars = async () => {
    try {
      const response = await axiosInstance({
        url: "/car/carlist",
        method: "GET",
      });
      console.log("response=====", response);

      // dispatch(fetchcarList(response?.data?.data));
      setcars(response?.data?.data);
    } catch (error) {
      console.log(error);
      toast.error("failed fetching products");
    }
  };

  useEffect(() => {
    fetchcars();
  }, []);

  return (
    <div className="px-20  py-10">
      <h1 className="font-bold text-4xl my-5">List of cars</h1>
      <div className="grid grid-cols-3 gap-10">
        {
          car.map((value) => (
            <CarCard key={value._id} car={value} />
          )
          )
        }
      </div>
    </div>
  );

};