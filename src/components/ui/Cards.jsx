import React from "react";
import { Link } from "react-router-dom";

export const CarCard = ({ car }) => {
    const { make, model, pricePerDay, availability, image, _id } = car;

    return (
        <div className="card card-compact bg-base-300 w-96 shadow-xl">
            <figure>
                <img src={image} alt={`${make} ${model}`} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{make} {model}</h2>
                <p className="text-lg">Price per day: {pricePerDay}</p>
                <p className={`text-sm ${availability ? 'text-green-500' : 'text-red-500'}`}>
                    {availability ? 'Available' : 'Not Available'}
                </p>
                <div className="card-actions justify-end">
                    <Link to={`/user/car-details/${_id}`}>
                        <button className="btn btn-primary">More Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};



export const UserCard = ({ user }) => {
    const { name, email, password, mobile,profilePic } = user;

    return (
        <div className="card card-compact bg-base-300 w-96 shadow-xl">
            <figure>
                <img src={profilePic} alt={`${name}`} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="text-lg">Email: {email}</p>
                <p className="text-lg">Phone: {mobile}</p>
             
                
               
            </div>
        </div>
    );
};

export const BookingCard = ({ booking, car }) => {
    const { pickupDate, dropOffDate, totalCost, status } = booking;
    const { make, model, image } = car || {}; // Handle case where car details are not yet available
  
    return (
      <div className="card card-compact bg-base-300 w-96 shadow-xl">
        <figure>
          {/* Car image */}
          <img src={image} alt={`${make} ${model}`} />
        </figure>
        <div className="card-body">
          {/* Car make and model */}
          <h2 className="card-title">
            {make ? `${make} ${model}` : "Car details loading..."}
          </h2>
          {/* Booking details */}
          <p className="text-lg">
            Pickup Date: {new Date(pickupDate).toLocaleDateString()}
          </p>
          <p className="text-lg">
            Drop-off Date: {new Date(dropOffDate).toLocaleDateString()}
          </p>
          <p className="text-lg">Total Cost: ${totalCost}</p>
          <p
            className={`text-sm ${status === "booked" ? "text-green-500" : "text-red-500"}`}
          >
            Status: {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
  
          {/* Actions */}
          <div className="card-actions justify-end">
          <Link to={`/user/reviews`}>
            <button className="btn btn-ghost">Review your Experience</button>
          </Link>
          </div>
        </div>
      </div>
    );
  };


export const ListCard = ({ car, onEdit, onDelete }) => {
    const { make, model, year, pricePerDay, fuelType, availability, seatingCapacity, engine, service, quality, image, _id } = car;

    return (
        <div className="card card-compact bg-base-300 w-96 shadow-xl">
            <figure>
                <img src={image} alt={`${make} ${model}`} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{make} {model}</h2>
                <p className="text-lg">Year: {year}</p>
                <p className="text-lg">Price per day: {pricePerDay}</p>
                <p className="text-lg">Fuel Type: {fuelType}</p>
                <p className="text-lg">Seating Capacity: {seatingCapacity}</p>
                <p className="text-lg">Engine: {engine}</p>
                <p className="text-lg">Service: {service}</p>
                <p className="text-lg">Quality: {quality}</p>

                <p className={`text-sm ${availability ? 'text-green-500' : 'text-red-500'}`}>
                    {availability ? 'Available' : 'Not Available'}
                </p>

                <div className="card-actions justify-end">
                    
                    <button
                        onClick={() => onEdit(_id)}
                        className="btn btn-secondary mx-2"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(_id)}
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
