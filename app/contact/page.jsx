"use client";

import React, { useEffect, useRef, useState } from "react";

function ContactPage() {
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observers = {};
    
    Object.keys(sectionRefs.current).forEach((key) => {
      observers[key] = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible((prev) => ({ ...prev, [key]: true }));
            }
          });
        },
        { threshold: 0.2 }
      );
      
      if (sectionRefs.current[key]) {
        observers[key].observe(sectionRefs.current[key]);
      }
    });
    
    return () => {
      Object.keys(observers).forEach((key) => {
        if (observers[key]) observers[key].disconnect();
      });
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Visit Us",
      details: ["123 Foodie Street,", "Downtown District,", "New York, NY 10001"],
      color: "from-amber-500 to-orange-500",
      action: "Get Directions",
      link: "#",
    },
    {
      icon: "📞",
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      color: "from-emerald-500 to-teal-500",
      action: "Call Now",
      link: "tel:+15551234567",
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: ["hello@cafename.com", "reservations@cafename.com"],
      color: "from-purple-500 to-pink-500",
      action: "Send Email",
      link: "mailto:hello@cafename.com",
    },
    {
      icon: "⏰",
      title: "Opening Hours",
      details: ["Monday - Friday: 8AM - 11PM", "Saturday - Sunday: 9AM - 12AM"],
      color: "from-blue-500 to-cyan-500",
      action: "View Calendar",
      link: "#",
    },
  ];

  const faqs = [
    {
      question: "Do I need to make a reservation?",
      answer: "While walk-ins are welcome, we recommend making a reservation especially for dinner hours and weekends to guarantee your table.",
    },
    {
      question: "Do you offer catering services?",
      answer: "Yes! We offer full-service catering for events of all sizes. Contact our events team for a custom quote.",
    },
    {
      question: "Is there parking available?",
      answer: "Yes, we have a dedicated parking lot with 50+ spots. Valet parking is available on weekends.",
    },
    {
      question: "Do you accommodate dietary restrictions?",
      answer: "Absolutely! We offer vegetarian, vegan, gluten-free, and allergy-friendly options. Just let us know when you book.",
    },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        .animate-slide-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        .animate-slide-right {
          animation: slideInRight 0.6s ease-out forwards;
        }
        .animate-fade-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative h-[400px] md:h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/contact/hero.jpg"
            alt="Contact Hero"
            className="w-full h-full object-cover scale-110 animate-float"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
        </div>
        
        <div className="relative z-10 px-4 text-center max-w-4xl mx-auto">
        
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Let's Connect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Over Good Food
            </span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions? Want to make a reservation? We'd love to hear from you.
            Reach out and let us make your experience memorable.
          </p>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
                ref={(el) => (sectionRefs.current[`info-${index}`] = el)}
                style={{
                  opacity: isVisible[`info-${index}`] ? 1 : 0,
                  transform: isVisible[`info-${index}`] ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s ease-out ${index * 0.1}s`,
                }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{info.title}</h3>
                <div className="text-gray-600 text-sm mb-4 space-y-1">
                  {info.details.map((detail, i) => (
                    <p key={i}>{detail}</p>
                  ))}
                </div>
                <a
                  href={info.link}
                  className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${info.color} bg-clip-text text-transparent hover:opacity-80 transition-all`}
                >
                  {info.action}
                  <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM & MAP SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              Send a Message
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              We'd Love to Hear From You
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you have a question about our menu, want to book an event, or just want to say hello — we're here for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              ref={(el) => (sectionRefs.current["form"] = el)}
              style={{
                opacity: isVisible["form"] ? 1 : 0,
                transform: isVisible["form"] ? "translateX(0)" : "translateX(-30px)",
                transition: "all 0.6s ease-out",
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="hello@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Reservation / Feedback / Query"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </button>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center animate-fade-up">
                    ✓ Thank you for reaching out! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Map & Additional Info */}
            <div
              ref={(el) => (sectionRefs.current["map"] = el)}
              style={{
                opacity: isVisible["map"] ? 1 : 0,
                transform: isVisible["map"] ? "translateX(0)" : "translateX(30px)",
                transition: "all 0.6s ease-out 0.2s",
              }}
            >
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d378.48656412575184!2d72.02770300320596!3d34.154718442765976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38decb00378d1bad%3A0xb3b6f503c3b2247!2sDream%20Coffee%20Club!5e1!3m2!1sen!2s!4v1776059356127!5m2!1sen!2s"

                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="w-full"
                  title="Restaurant Location"
                ></iframe>
              </div>

              {/* Quick Contact Card */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Response</h3>
                <p className="text-gray-600 mb-4">
                  For urgent inquiries or same-day reservations, please call us directly.
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white">
                    📞
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Call us now</div>
                    <div className="font-bold text-gray-900">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white">
                    💬
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Response time</div>
                    <div className="font-bold text-gray-900">Within 24 hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Find quick answers to common questions about our cafe
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
                ref={(el) => (sectionRefs.current[`faq-${index}`] = el)}
                style={{
                  opacity: isVisible[`faq-${index}`] ? 1 : 0,
                  transform: isVisible[`faq-${index}`] ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease-out ${index * 0.1}s`,
                }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-amber-500">❓</span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 pl-6">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL MEDIA SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Follow Our Journey</h2>
          <p className="text-gray-600 mb-8">Stay connected with us on social media for updates, offers, and mouth-watering photos</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Instagram", icon: "📸", color: "from-pink-500 to-orange-500", link: "#" },
              { name: "Facebook", icon: "📘", color: "from-blue-600 to-blue-800", link: "#" },
              { name: "Twitter", icon: "🐦", color: "from-sky-500 to-blue-500", link: "#" },
              { name: "TripAdvisor", icon: "⭐", color: "from-emerald-500 to-teal-500", link: "#" },
              { name: "YouTube", icon: "▶️", color: "from-red-500 to-red-700", link: "#" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                className={`group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${social.color} text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
              >
                <span className="text-xl">{social.icon}</span>
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Special Offers & Updates
          </h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter and never miss out on exclusive deals, new menu items, and events
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300">
              Subscribe
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-4">
            No spam, only quality content. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* BOTTOM CTA BAR */}
      <section className="py-6 bg-amber-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white text-center md:text-left">
              <span className="font-semibold">📅 Ready to visit us?</span>
              <span className="text-white/90"> Book your table now and get a complimentary welcome drink!</span>
            </div>
            <button className="px-6 py-2 bg-white text-amber-600 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Reserve a Table →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;