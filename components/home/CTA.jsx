'use client';

import { useState } from 'react';

export default function CtaClub() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setIsSubmitting(false);
      setEmail('');
      setTimeout(() => setStatus(null), 3000);
    }, 1000);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#FEF9F0] to-[#F7F2EC] relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 bg-[#C77A3F]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-[#C77A3F]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C77A3F]/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#2E241F] via-[#3A2A22] to-[#4A2E22] rounded-3xl p-8 md:p-12 lg:p-16 text-center shadow-2xl border border-white/10 backdrop-blur-sm">
          
          {/* Floating Icon Badge */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[#C77A3F]/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-[#C77A3F] to-[#A55E2A] w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl">☕</span>
              </div>
            </div>
          </div>
          
          {/* Heading with Decorative Lines */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#C77A3F]"></div>
            <span className="text-[#C77A3F] text-sm font-semibold tracking-wider uppercase">Exclusive Club</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#C77A3F]"></div>
          </div>
          
          <h3 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Join Our{' '}
            <span className="bg-gradient-to-r from-[#C77A3F] to-[#E8C97A] bg-clip-text text-transparent">
              Dream Coffee Club
            </span>
          </h3>
          
          <p className="text-gray-300 text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Get exclusive offers, free delivery, and a <span className="text-[#C77A3F] font-semibold">free meal on your birthday</span>!
          </p>
          
          {/* Subscription Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#C77A3F] focus:border-transparent text-white placeholder:text-gray-400 transition-all duration-300"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#C77A3F] to-[#A55E2A] hover:shadow-lg hover:-translate-y-0.5 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Joining...
                </>
              ) : (
                <>
                  <span>Join Now</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
          
          {/* Status Message */}
          {status === 'success' && (
            <div className="mt-4 bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-2 rounded-full text-sm inline-flex items-center gap-2 animate-fade-in-up">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Thanks for joining! Check your inbox for exclusive offers.
            </div>
          )}
          
          {/* Trust Badge */}
          <div className="mt-6 flex items-center justify-center gap-4 text-gray-400 text-xs">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No spam</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Unsubscribe anytime</span>
            </div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}