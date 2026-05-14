"use client";

import React, { useState, useEffect, useRef } from "react";

function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <i className="fas fa-map-marker-alt text-[#C77A3F] text-lg"></i>,
      title: "Visit Us",
      details: ["123 Food Street, Downtown", "Lahore, Pakistan 54000"],
    },
    {
      icon: <i className="fas fa-phone-alt text-[#C77A3F] text-lg"></i>,
      title: "Call Us",
      details: ["+92 300 1234567", "+92 42 1234567"],
    },
    {
      icon: <i className="fas fa-envelope text-[#C77A3F] text-lg"></i>,
      title: "Email Us",
      details: ["info@dreamrestaurant.com", "reservations@dreamrestaurant.com"],
    },
    {
      icon: <i className="fas fa-clock text-[#C77A3F] text-lg"></i>,
      title: "Opening Hours",
      details: [
        "Mon - Fri: 11:00 AM - 11:00 PM",
        "Sat - Sun: 12:00 PM - 12:00 AM",
      ],
    },
  ];

  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d378.48656412575184!2d72.02770300320596!3d34.154718442765976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38decb00378d1bad%3A0xb3b6f503c3b2247!2sDream%20Coffee%20Club!5e1!3m2!1sen!2s!4v1776059356127!5m2!1sen!2s";

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gray-100 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#C77A3F]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#C77A3F]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-0">
        {/* Header */}
        <div
          className={`w-full transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          {/* Google Map - Full Width */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] bg-gray-200">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Restaurant Location Map"
            />

            {/* Fallback Overlay */}
            <div className="absolute inset-0 bg-gray-800 flex flex-col items-center justify-center text-white z-10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none hover:pointer-events-auto">
              <i className="fas fa-map-marked-alt text-6xl mb-4 opacity-50"></i>
              <p className="text-lg font-semibold mb-2">Google Maps Preview</p>
              <p className="text-sm opacity-75 text-center px-4">
                Click to view on Google Maps
              </p>
              <button
                onClick={() =>
                  window.open(
                    "https://maps.google.com/?q=Restaurant+Location",
                    "_blank",
                  )
                }
                className="mt-4 px-6 py-2 bg-[#C77A3F] rounded-full text-sm font-semibold hover:bg-[#A55E2A] transition-colors pointer-events-auto"
              >
                Open in Google Maps
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form - Overlapping the Map */}
        <div className="flex justify-center px-4 md:px-6 lg:px-8 -mt-20 md:-mt-24 lg:-mt-28 relative z-20">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10 w-full max-w-3xl lg:max-w-4xl">
            
            {/* Header Section */}
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-10">
              <div className="w-16 md:w-20 h-0.5 bg-amber-400 rounded-full"></div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 tracking-tight">Contact Us</h2>
              <div className="w-16 md:w-20 h-0.5 bg-amber-400 rounded-full"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 lg:space-y-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <div className="group">
                  <label className="block text-gray-600 text-sm font-medium mb-2 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 md:px-5 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C77A3F] focus:bg-white focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-gray-600 text-sm font-medium mb-2 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 md:px-5 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C77A3F] focus:bg-white focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="group">
                <label className="block text-gray-600 text-sm font-medium mb-2 ml-1">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you think..."
                  rows="5"
                  required
                  className="w-full px-4 md:px-5 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C77A3F] focus:bg-white focus:border-transparent transition-all duration-300 resize-none placeholder:text-gray-400"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#C77A3F] to-[#A55E2A] text-white px-8 md:px-10 py-3 rounded-xl font-semibold text-sm md:text-base hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 mx-auto group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="mt-4 text-green-600 text-sm">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                
                <p className="text-xs text-gray-400 mt-4">
                  We'll get back to you within 24 hours
                </p>
              </div>
            </form>
          </div>
        </div>

     
    
      </div>
    </section>
  );
}

export default ContactSection;