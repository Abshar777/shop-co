"use client";
import Marque from "@/components/page-sections/home/marque";
import { motion } from "framer-motion";

const page = () => {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gray-100 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Story</h1>
              <p className="text-gray-600 text-lg mb-8">
                Founded in 2015, SHOP.CO began with a simple mission: to make
                fashion accessible to everyone. We believe that everyone
                deserves to look and feel their best, regardless of budget or
                style preferences.
              </p>
              <div className="flex items-center space-x-6">
                <div>
                  <span className="block md:text-4xl text-2xl font-bold">
                    200+
                  </span>
                  <span className="text-gray-500">International Brands</span>
                </div>
                <div>
                  <span className="block md:text-4xl text-2xl font-bold">
                    2,000+
                  </span>
                  <span className="text-gray-500">High-Quality Products</span>
                </div>
                <div>
                  <span className="block md:text-4xl text-2xl font-bold">
                    30,000+
                  </span>
                  <span className="text-gray-500">Happy Customers</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* <div className="absolute -top-4 -left-4 w-24 h-24 bg-black rounded-full -z-10"></div> */}
              <img
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Our team at work"
                className="rounded-lg shadow-xl object-cover w-full h-full"
              />
              {/* <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-black rounded-full -z-10"></div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our values define who we are and guide everything we do. They're
              the foundation of our business and the principles we live by.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every item in our collection has
                been carefully selected and rigorously tested to ensure it meets
                our high standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Customer Happiness</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We're dedicated to providing
                exceptional service and creating experiences that make our
                customers smile.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to reducing our environmental impact. From
                sourcing eco-friendly materials to implementing sustainable
                practices, we're building a business that's good for the planet.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Brands We Work With</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We partner with the most renowned brands in the fashion industry
              to bring you the best selection.
            </p>
          </div>

          {/* <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"].map((brand, index) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <span className="text-2xl md:text-3xl font-bold">{brand}</span>
            </motion.div>
          ))}
        </div> */}
          <Marque className="rounded-lg opacity-50" />
        </div>
      </section>
    </main>
  );
};

export default page;
