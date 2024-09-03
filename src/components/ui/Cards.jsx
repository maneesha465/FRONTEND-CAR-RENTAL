import React from "react";
import { Link } from "react-router-dom";

export const CarCard = ({ car }) => {
    return (
        <div className="card card-compact bg-base-300 w-96 shadow-xl">
            <figure>
                <img src={car?.image} alt="course" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{car.title} </h2>
                <p>{car?.desc} </p>
                <div className="card-actions justify-end">
                    <Link to={`/user/cardetails/${car._id}  `}>
                        <button className="btn btn-primary">More Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};