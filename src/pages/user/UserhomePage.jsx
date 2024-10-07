import React from 'react'

export const UserhomePage = () => {
  return (
    <div>
      <main className="px-3 py-3">
        <section className="flex justify-center items-center w-full">
          <img
            src="https://img.freepik.com/free-photo/sports-car-driving-asphalt-road-night-generative-ai_188544-8052.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1724716800&semt=ais_hybrid"
            alt="Car Rental"
            className="w-full h-[70vh] object-cotain"
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
      </main>
    </div>
  )
}
