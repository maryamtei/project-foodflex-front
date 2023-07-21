function ContactPage() {
  return (
    <div>
      <div className="relative w-full">
        <img
          src="./img/contact.jpg"
          alt="Background"
          className="w-full h-full object-cover object-bottom"
          style={{
            objectPosition: 'center top',
          }}
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white text-center sm:text-center md:text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 uppercase">
          Contact
        </h1>
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-thirdff w-full max-w-md p-8 rounded shadow">
          <h2 className="text-red-500 text-4xl text-center font-bold mb-6">Contact us</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-red-500 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-red-200 rounded focus:outline-none focus:border-red-700"
                placeholder="Please enter your full name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-red-500 font-medium mb-2"
              >
                E-mail address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-red-200 rounded focus:outline-none focus:border-red-700"
                placeholder="Please enter your e-mail address"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-red-500 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 border border-red-200 rounded focus:outline-none focus:border-red-700"
                placeholder="Please enter your message"
                required
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-fourthff hover:bg-red-500 text-white font-medium py-2 px-4 rounded focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
