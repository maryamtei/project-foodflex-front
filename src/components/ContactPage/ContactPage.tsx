import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { contact } from '../../store/reducers/user';

function ContactPage() {
  const modalIsOpen = useAppSelector((state) => state.settings.modalIsOpen);

  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    dispatch(contact(formData));
  };

  return (
    <div
      className={`relative bg-cover bg-no-repeat bg-center ${
        modalIsOpen ? 'sm:blur-[3px] sm:pointer-events-none' : ''
      } `}
      style={{ backgroundImage: 'url(/contact.jpg)' }}
    >
      <div className="relative w-full h-screen">
        {/* Apply overlay and blur effect to the image */}
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-thirdff w-full max-w-md p-8 rounded shadow-md border border-gray-600">
            {' '}
            {/* Add shadow */}
            <h1 className="text-titleff text-4xl text-center font-bold mb-6">
              Contact us
            </h1>
            <form onSubmit={handleSubmit}>
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
                  className="w-full px-3 py-2 border-2 border-gray-400 rounded focus:outline-none focus:border-gray-500 text-gray-600 bg-bgff"
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
                  className="w-full px-3 py-2 border-2 border-gray-400 rounded focus:outline-none focus:border-gray-500 text-gray-600 bg-bgff"
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
                  className="w-full px-3 py-2 border-2 border-gray-400 rounded focus:outline-none focus:border-gray-500 text-gray-600 bg-bgff"
                  placeholder="Please enter your message"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-titleff hover:bg-red-500 text-white font-medium py-2 px-4 rounded focus:outline-none"
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
