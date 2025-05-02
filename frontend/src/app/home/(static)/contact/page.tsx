"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent!", {
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gray-100 pt-10 ">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-gray-600 text-lg mb-8">
              Have questions, feedback, or need assistance? We're here to help!
              Our customer service team is ready to assist you with anything you
              need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Details & Form Section */}
      <section className="pb-16 pt-5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="md:col-span-1 space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-black rounded-full p-3 text-white">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Our Location</h3>
                    <address className="not-italic text-gray-600">
                      123 Fashion Street
                      <br />
                      Suite 101
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </address>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-black rounded-full p-3 text-white">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Call Us</h3>
                    <p className="text-gray-600 mb-1">+1 (555) 123-4567</p>
                    <p className="text-gray-500 text-sm">
                      Monday - Friday: 9am - 8pm EST
                      <br />
                      Saturday: 10am - 6pm EST
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="mt-1 bg-black rounded-full p-3 text-white">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Email Us</h3>
                    <p className="text-gray-600 mb-1">support@shop.co</p>
                    <p className="text-gray-600 mb-1">info@shop.co</p>
                    <p className="text-gray-500 text-sm">
                      We usually respond within 24 hours
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-2"
            >
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="font-medium text-sm">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="font-medium text-sm">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="johndoe@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="font-medium text-sm">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="font-medium text-sm">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      className="resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="overflow-hidden rounded-lg h-96">
            <iframe
              title="Shop.co Location"
              className="w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425872418243!3d40.74076597932878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1715299123568!5m2!1sen!2sus"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Find quick answers to commonly asked questions
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: "How long does shipping take?",
                a: "Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination.",
              },
              {
                q: "What is your return policy?",
                a: "We offer a 30-day return policy for unworn items in original condition with tags attached. Returns are processed within 10-14 business days of receipt.",
              },
              {
                q: "Do you ship internationally?",
                a: "Yes, we ship to over 100 countries worldwide. International shipping rates and delivery times vary by location.",
              },
              {
                q: "How can I track my order?",
                a: "Once your order ships, you'll receive a confirmation email with a tracking number that you can use to monitor your delivery status.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
