
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../config/axiosInstance';

export const UpdateCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState({
        make: '',
        model: '',
        year: '',
        pricePerDay: '',
        fuelType: '',
        seatingCapacity: '',
        engine: '',
        service: '',
        quality: '',
        image:null,
        availability: true,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axiosInstance.get(`/car/car-details/${id}`);
                setCar(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching car details:', error);
                toast.error('Error fetching car details');
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar((prevCar) => ({ ...prevCar, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/car/updatecar/${id}`, car);
            toast.success('Car updated successfully');
            navigate('/admin/carlist');
        } catch (error) {
            console.error('Error updating car:', error);
            toast.error('Error updating car');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Update Car Details</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="make" className="block text-gray-700 text-sm font-bold mb-2">Make</label>
                    <input
                        type="text"
                        id="make"
                        name="make"
                        value={car.make}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300 bg-gray-100"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="model" className="block text-gray-700 text-sm font-bold mb-2">Model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={car.model}
                        onChange={handleChange}
                        className="border-gray-300 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">Year</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={car.year}
                        onChange={handleChange}
                        className="border-gray-300 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="pricePerDay" className="block text-gray-700 text-sm font-bold mb-2">Price per Day</label>
                    <input
                        type="number"
                        id="pricePerDay"
                        name="pricePerDay"
                        value={car.pricePerDay}
                        onChange={handleChange}
                        className="border-gray-300 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="fuelType" className="block text-gray-700 text-sm font-bold mb-2">Fuel Type</label>
                    <input
                        type="text"
                        id="fuelType"
                        name="fuelType"
                        value={car.fuelType}
                        onChange={handleChange}
                        className="border-gray-300 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="seatingCapacity" className="block text-gray-700 text-sm font-bold mb-2">Seating Capacity</label>
                    <input
                        type="number"
                        id="seatingCapacity"
                        name="seatingCapacity"
                        value={car.seatingCapacity}
                        onChange={handleChange}
                        className="border-gray-300 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="engine" className="block text-gray-700 text-sm font-bold mb-2">Engine</label>
                    <input
                        type="text"
                        id="engine"
                        name="engine"
                        value={car.engine}
                        onChange={handleChange}
                        className="border-gray-300 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="service" className="block text-gray-700 text-sm font-bold mb-2">Service</label>
                    <input
                        type="text"
                        id="service"
                        name="service"
                        value={car.service}
                        onChange={handleChange}
                        className="border-gray-300 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="quality" className="block text-gray-700 text-sm font-bold mb-2">Quality</label>
                    <input
                        type="text"
                        id="quality"
                        name="quality"
                        value={car.quality}
                        onChange={handleChange}
                        className="border-gray-300 bg-gray-100 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="availability" className="block text-gray-700 text-sm font-bold mb-2">Availability</label>
                    <input
                        type="checkbox"
                        id="availability"
                        name="availability"
                        checked={car.availability}
                        onChange={() => setCar((prevCar) => ({ ...prevCar, availability: !prevCar.availability }))}
                        className="border-gray-300 bg-gray-100 form-checkbox h-5 w-5 text-indigo-600"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update Car
                    </button>
                </div>
            </form>
        </div>
    );
};
