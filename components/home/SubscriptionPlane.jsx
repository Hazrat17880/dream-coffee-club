'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const plans = [
  {
    id: 1,
    name: 'Morning Ritual',
    icon: '🌅',
    price: '$21',
    period: '/month',
    description: 'Perfect for daily coffee lovers',
    features: [
      '1 bag (12oz) per month',
      'Free shipping in kpk',
      'Rotating single origin',
      'Cancel anytime'
    ],
  },
  {
    id: 2,
    name: "Roaster's Select",
    icon: '🔥',
    price: '$38',
    period: '/month',
    description: 'For the true coffee connoisseur',
    features: [
      '2 premium bags / month',
      'Early access new lots',
      'Tasting notes + brew guide',
      'Exclusive roaster events',
      'Priority customer support'
    ],
    popular: true,
    bestValue: true,
  },
  {
    id: 3,
    name: 'Family Reserve',
    icon: '👥',
    price: '$55',
    period: '/month',
    description: 'Share the love of coffee',
    features: [
      '3 bags + exclusive merch',
      'Free espresso sample',
      '15% cafe discount',
      'Personalized coffee consultation',
      'Holiday bonus box'
    ],
  },
];

export default function SubscriptionPlans() {
  const [hoveredId, setHoveredId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-[#FEF9F0] via-white to-[#FEF9F0] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header with Animation */}
        <div className={`text-center mb-16 transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
         
          
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#2E241F] mb-4">
            Subscribe & save
            <span className="text-[#C77A3F]"> 20%</span>
          </h2>
          
          <p className="text-[#6B4E3A] text-lg max-w-2xl mx-auto">
            Fresh coffee delivered to your door. Cancel anytime, roast to order.
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-sm text-gray-500">⭐ 4.9/5</span>
            <div className="flex text-yellow-400 text-sm">
              {'★★★★★'.split('').map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <span className="text-sm text-gray-500">(2,845 reviews)</span>
          </div>
        </div>

        {/* Pricing Toggle (Annual/Monthly) */}
        <div className={`flex justify-center mb-12 transition-all duration-700 delay-200 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-[#F1EAE1] p-1 rounded-full inline-flex">
            <button className="px-6 py-2 rounded-full text-sm font-semibold bg-[#C77A3F] text-white shadow-md">
              Monthly
            </button>
            <button className="px-6 py-2 rounded-full text-sm font-semibold text-[#2E241F] hover:text-[#C77A3F] transition-colors">
              Annual <span className="text-xs text-green-600">Save 15%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              onMouseEnter={() => setHoveredId(plan.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`transform transition-all duration-700 delay-${index * 100} ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
              }`}
            >
              <div
                className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-500 ${
                  plan.popular
                    ? 'shadow-2xl ring-2 ring-[#C77A3F] scale-105 md:scale-105'
                    : 'shadow-lg hover:shadow-2xl hover:-translate-y-2'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 z-20">
                    <div className="bg-gradient-to-r from-[#C77A3F] to-[#A55E2A] text-white px-4 py-2 rounded-bl-2xl text-sm font-bold flex items-center gap-1">
                      <span className="text-yellow-300">★</span>
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Best Value Badge */}
                {plan.bestValue && (
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      Best Value
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-8">
                  {/* Icon & Name */}
                  <div className="text-center mb-6">
                    <div className={`text-5xl mb-3 transition-transform duration-300 ${
                      hoveredId === plan.id ? 'scale-110' : ''
                    }`}>
                      {plan.icon}
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-[#2E241F] mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-500 text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-[#2E241F]">{plan.price}</span>
                      <span className="text-gray-500">{plan.period}</span>
                    </div>
                    {plan.popular && (
                      <div className="text-sm text-green-600 mt-2">
                        Save $87 annually
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm group">
                        <div className={`w-5 h-5 rounded-full bg-[#C77A3F]/10 flex items-center justify-center transition-all duration-300 ${
                          hoveredId === plan.id ? 'bg-[#C77A3F] scale-110' : ''
                        }`}>
                          <svg className={`w-3 h-3 transition-colors ${
                            hoveredId === plan.id ? 'text-white' : 'text-[#C77A3F]'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-600 group-hover:text-gray-900 transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href="/subscribe"
                    className={`block text-center py-3.5 rounded-full font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#C77A3F] to-[#A55E2A] text-white hover:shadow-lg hover:scale-105'
                        : 'bg-[#2E241F] text-white hover:bg-[#C77A3F] hover:scale-105'
                    }`}
                  >
                    {plan.popular ? 'Get Started →' : 'Choose Plan →'}
                  </Link>

                
                </div>

                {/* Animated Bottom Border */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#C77A3F] to-[#A55E2A] transition-all duration-500 ${
                  hoveredId === plan.id ? 'w-full' : 'w-0'
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm text-gray-600">Free shipping worldwide</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-600">Roasted fresh to order</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm text-gray-600">Carbon neutral shipping</span>
            </div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-8">
          <Link href="/faq" className="text-sm text-[#C77A3F] hover:underline inline-flex items-center gap-1">
            Have questions? Read our FAQ
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}