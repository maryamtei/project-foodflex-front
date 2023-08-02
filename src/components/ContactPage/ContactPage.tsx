import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { contact } from '../../store/reducers/user';

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
        className="w-full h-full object-cover object-bottom absolute inset-0 z-[-1] blur-[4px] "
      />
      <div className="relative w-full h-screen">
        <div className="flex justify-center items-center min-h-screen">
          <div className="relative flex flex-col gap-4 w-80 text-titleff font-medium sm:bg-thirdff bg-bgff bg-opacity-80 rounded-xl shadow-xl items-center p-6 ">
            {' '}
            {/* Add shadow */}
            <h1 className="text-titleff text-3xl text-center font-bold mb-6">
              Contact us
            </h1>
            <form onSubmit={handleSubmit}>
              {/* ...form content... */}
              <div className="mb-2">
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
                  className="mb-4 bg-bgff  border-titleff font-bold rounded-lg border-2 h-8 shadow-md hover:shadow-xl focus:outline-none focus:border-fourthff ease-in duration-150 p-2"
                  required
                />
              </div>
              <div className="mb-2">
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
                  className="mb-4 bg-bgff  border-titleff font-bold rounded-lg border-2 h-8 shadow-md hover:shadow-xl focus:outline-none focus:border-fourthff ease-in duration-150 p-2"
                  required
                />
              </div>
              <div className="mb-2">
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
                  className="mb-2 bg-bgff h-16 w-full border-titleff font-bold rounded-lg border-2 shadow-md hover:shadow-xl focus:outline-none focus:border-fourthff ease-in duration-150 p-2"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-2xl font-bold pt-1 pr-1 pb-2 pl-2 mt-10 bg-white border-titleff hover:border-fourthff hover:text-fourthff rounded-lg border-2 shadow-md hover:shadow-xl ease-in duration-150 w-7/12 h-full"
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
