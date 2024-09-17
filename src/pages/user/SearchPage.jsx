// src/components/CarSearch.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CarSearch = () => {
    const [make, setMake] = useState('');
    const [cars, setCars] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('/api/cars/search', {
                params: { make }
            });
            setCars(response.data.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
            setCars([]);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <div>
                    <label htmlFor="make">Car Make:</label>
                    <input
                        type="text"
                        id="make"
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Search</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                {cars.length > 0 ? (
                    <ul>
                        {cars.map((car) => (
                            <li key={car._id}>
                                <h3>{car.make} {car.model}</h3>
                                <p>Year: {car.year}</p>
                                <p>Price per Day: ${car.pricePerDay}</p>
                                <p>Fuel Type: {car.fuelType}</p>
                                <img src={car.image} alt={`${car.make} ${car.model}`} width="100" />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No cars found.</p>
                )}
            </div>
        </div>
    );
};

export default CarSearch;
