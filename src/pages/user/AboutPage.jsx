
import React from 'react'

export const AboutPage = () => {
  return (
    <div className="min-h-screen  py-10 bg-cover bg-center" 
      style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjc8uFN-320M7bSVa6Rsyq_mU-euyCW0z9Ew&s')` }}
  >
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center  mb-8">About Us</h1>
     
      <div className="bg-gray-400 shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Our Mission</h2>
        <p className="text-gray-700">
          At Rent-a-Car, our mission is to provide a seamless and enjoyable car rental experience. 
          We offer a wide range of vehicles to meet every need, from everyday commutes to special occasions. 
          Our user-friendly platform and exceptional customer service ensure that your rental experience is 
          smooth and stress-free.
        </p>
      </div>

      <div className="bg-gray-400 shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-200 p-6 rounded-lg text-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFoRzEexQgG5N97w3mUtduc2s4Gjr9yIWdA&s" alt="Team Member 1" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-medium">Anand</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg text-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFoRzEexQgG5N97w3mUtduc2s4Gjr9yIWdA&s" alt="Team Member 2" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-medium">Jennie</h3>
            <p className="text-gray-600">Chief Operations Officer</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg text-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFoRzEexQgG5N97w3mUtduc2s4Gjr9yIWdA&s" alt="Team Member 3" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-medium">John George</h3>
            <p className="text-gray-600">Head of Customer Service</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-400 shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Contact Us</h2>
        <p className="text-gray-700 mb-4">
          If you have any questions or need assistance, feel free to reach out to us. 
          Our dedicated support team is here to help you.
        </p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Email: <a href="mailto:support@yourcompany.com" className="text-blue-500 hover:underline">support@yourcompany.com</a></li>
          <li>Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">+1 (234) 567-890</a></li>
          <li>Address: 123 Main Street, Anytown, USA</li>
        </ul>
      </div>
    </div>
  </div>

  )
}



     
