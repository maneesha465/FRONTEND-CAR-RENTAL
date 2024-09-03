import React from 'react';

export const HomePage = () => {
  return (
    <div>
      <main className="py-2">
        <section className="relative flex justify-center items-center w-full pb-5">
          <img
            src="https://img.freepik.com/free-photo/sports-car-driving-asphalt-road-night-generative-ai_188544-8052.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1724716800&semt=ais_hybrid"
            alt="Car Rental"
            className="w-full h-[70vh] object-cover" // Ensure full coverage while maintaining aspect ratio
          />

          <div
            style={{ top: '30%', right: '5%' }} // Adjust positioning as needed
            className="absolute transform -translate-y-1/2 p-6 text-white rounded-lg"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Make Every Trip Extraordinary
              <br />
              <span className='block mt-3 text-2xl md:text-3xl lg:text-4xl'>
                Rent Your Ideal Vehicle Now!
              </span>
            </h1>
          </div>
        </section>

        <div className="bg-gray-200 shadow-lg rounded-lg p-5 mb-8">
          <h2 className="text-2xl font-semibold mb-2 pb-2">Our Review</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-200 p-6 rounded-lg text-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFoRzEexQgG5N97w3mUtduc2s4Gjr9yIWdA&s" alt="Team Member 1" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-medium">John Doe</h3>
              <p className="text-gray-600">Toyota Camry 2023</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg text-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFoRzEexQgG5N97w3mUtduc2s4Gjr9yIWdA&s" alt="Team Member 2" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-medium">Jane Smith</h3>
              <p className="text-gray-600">Honda Civic 2022</p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg text-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFoRzEexQgG5N97w3mUtduc2s4Gjr9yIWdA&s" alt="Team Member 3" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-medium">Emily Johnson</h3>
              <p className="text-gray-600">Ford Mustang 2022</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
