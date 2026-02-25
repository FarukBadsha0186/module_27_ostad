function Contact() {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        Contact Us
      </h1>

      <p className="text-gray-600 mb-6">
        If you have any questions, feel free to contact us.
      </p>

      <div className="space-y-3">
        <p>Email: support@newsportal.com</p>
        <p>Phone: +880 123456789</p>
        <p>Address: Bangladesh</p>
      </div>
    </div>
  );
}

export default Contact;