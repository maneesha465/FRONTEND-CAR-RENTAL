import React, { useState } from 'react'
import { addCar } from '../../services/carApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const CreateCar = () => {
  const navigate = useNavigate();  
  // Initialize state for form inputs
  const [car, setCar] = useState({
      make: "",
      model: "",
      year: "",
      pricePerDay: "",
      fuelType: "",
      seatingCapacity: "",
      engine: "",
      service: "",
      quality: "",
      image: null, // Handle image upload separately
      availability: true
    });

  // Handle input change for text fields
  const handleChange = (e) => {
    setCar({
        ...car,
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
};

   // Handle image file input change
   const handleImageChange = (e) => {
       setCar({
           ...car,
           image: e.target.files[0] // Save the selected file in state
       });
   };

  // Handle form submit
  const handleSubmit = async (e) => {
      e.preventDefault();

      // Prepare form data to send, including image file
    
      const formData = new FormData();
      Object.keys(car).forEach(key => {
          formData.append(key, car[key]);
      });
  
      try {
          const response = await addCar(formData);
          if (response) {
              toast.success("Car created successfully");
              navigate('/admin/carlist');
            }
  
          setCar({
              make: "",
              model: "",
              year: "",
              pricePerDay: "",
              fuelType: "",
              seatingCapacity: "",
              engine: "",
              service: "",
              quality: "",
              image: null,
              availability: true
          });
  
      } catch (error) {
          toast.error("Car creation failed");
      }
  };
      

        
            return (
              <div className="container mx-auto mt-10 p-5">
                <div className="bg-gray-100 rounded-lg shadow-xl p-10">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                    <label className="label">
            <span className="label-text">Make</span>
          </label>
                      <input
                        placeholder="Make"
                        type="text"
                        name="make"
                        value={car.make}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                    <label className="label">
            <span className="label-text">Model</span>
          </label>
                      <input
                        placeholder="Model"
                        type="text"
                        name="model"
                        value={car.model}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                    <label className="label">
            <span className="label-text">Year</span>
          </label>
                      <input
                        placeholder="Year"
                        type="number"
                        name="year"
                        value={car.year}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                    <label className="label">
            <span className="label-text">PricePerDay</span>
          </label>
                      <input
                        placeholder="Price/Day"
                        type="number"
                        name="pricePerDay"
                        value={car.pricePerDay}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                    <label className="label">
            <span className="label-text">Fuel Type</span>
          </label>
                      <input
                        placeholder="Fuel Type"
                        type="text"
                        name="fuelType"
                        value={car.fuelType}
                            onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                    <label className="label">
            <span className="label-text">Seating Capacity</span>
          </label>
                      <input
                        placeholder="Seat Capacity"
                        type="text"
                        name="seatingCapacity"
                        value={car.seatingCapacity}
                            onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                    <label className="label">
            <span className="label-text">Engine</span>
          </label>
                      <input
                        placeholder="Engine Capacity"
                        type="text"
                        name="engine"
                        value={car.engine}
                            onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                    <label className="label">
            <span className="label-text">Service</span>
          </label>
                      <input
                        placeholder="Service"
                        type="text"
                        name="service"
                        value={car.service}
                            onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                    <label className="label">
            <span className="label-text">Quality</span>
          </label>
                      <input
                        placeholder="Quality"
                        type="text"
                        name="quality"
                        value={car.quality}
                            onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                    <label className="label">
            <span className="label-text">Photo</span>
          </label>
                      <input
                        placeholder="Photo"
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        className="border border-gray-300 rounded-md p-2"
                      />
                    </div>

                    <div className="flex flex-col">
    <label className="label">
        <span className="label-text">Availability</span>
    </label>
    <input
        type="checkbox"
        name="availability"
        checked={car.availability}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2"
    />
</div>

                    <div className="flex justify-center">
                        
                      <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-600 transition-all"
                      >
                        Create Car
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            );
          }
          
      
          
