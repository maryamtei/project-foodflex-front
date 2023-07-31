import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { contact } from '../../store/reducers/settings';

function ContactPage() {
  // Get the "modalIsOpen" state from the store using "useAppSelector"
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);

  // Create a dispatcher to trigger the "contact" action with the form data
  const dispatch = useAppDispatch();

  // Create a local state "formData" to store the form values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle changes in the form fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Use the state update function to update the form values
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Trigger the "contact" action with the form data
    dispatch(contact(formData));
  };

  return (
    <div
      className={`relative bg-cover bg-no-repeat bg-center ${
        modalIsOpen ? 'sm:blur-[3px] sm:pointer-events-none' : ''
      } `}
    >
      {/* Background image & Apply overlay and blur effect to the image  */}
      <img
        src="./img/contact.jpg"
        alt="Background"
        className="w-full h-full object-cover object-bottom absolute inset-0"
        style={{
          objectPosition: 'center top',
          zIndex: -1,
          filter: 'blur(4px)',
        }}
      />
      <div className="relative w-full h-screen">
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-thirdff w-full max-w-md p-8 rounded-lg shadow-md border-2 border-gray-200">
            {' '}
            {/* Add shadow */}
            <h1 className="text-titleff text-4xl text-center font-bold mb-6">
              Contact us
            </h1>
            <form onSubmit={handleSubmit}>
              {/* ...form content... */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-titleff font-medium mb-2 "
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:border-gray-600 text-gray-700 bg-bgff"
                  placeholder="Please enter your full name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-titleff font-medium mb-2"
                >
                  E-mail address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:border-gray-600 text-gray-700 bg-bgff"
                  placeholder="Please enter your e-mail address"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-titleff font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg shadow-md hover:shadow-xl focus:outline-none focus:border-gray-600 text-gray-700 bg-bgff"
                  placeholder="Please enter your message"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-titleff border-2 hover:border-white hover:bg-thirdff rounded-lg text-white text-2xl font-bold py-2 px-4 hover:text-titleff"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
