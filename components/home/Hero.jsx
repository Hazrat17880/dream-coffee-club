import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <>
    

      {/* ── Hero Section ── */}
      <section className="bg-gradient-to-br from-white via-[#FEFAF5] to-white overflow-hidden relative min-h-[90vh] flex items-center">

        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Concentric rings */}
          <svg
            className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-30"
            viewBox="0 0 700 700"
            fill="none"
          >
            {[320, 260, 200, 140, 80].map((r, i) => (
              <circle
                key={r}
                cx="350"
                cy="350"
                r={r}
                stroke="#C77A3F"
                strokeWidth="0.8"
                opacity={0.15 - i * 0.02}
                strokeDasharray={i === 2 ? "8 8" : "none"}
              />
            ))}
          </svg>

          {/* Abstract shapes */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#C77A3F]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C77A3F]/3 rounded-full blur-3xl" />
          
          {/* Minimalist leaves */}
          <div className="absolute top-10 left-5 text-[180px] opacity-[0.03] -rotate-[25deg] select-none">🍃</div>
          <div className="absolute bottom-5 right-5 text-[140px] opacity-[0.03] rotate-[155deg] select-none">🌿</div>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20 py-16 md:py-20">

            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

              {/* Eyebrow with animated badge */}
              <div className="inline-flex items-center gap-3 mb-6 bg-[#C77A3F]/5 px-4 py-2 rounded-full">
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C77A3F] animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C77A3F] opacity-60" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C77A3F] opacity-30" />
                </div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#C77A3F] uppercase">
                  Since 2025
                </span>
              </div>

             <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1208] leading-[1.1] tracking-tight mb-6">
  What can I
  <br />
  <span className="relative inline-block mt-2">
    <span className="absolute inset-x-0 bottom-3 h-3 bg-[#C77A3F]/20 -z-10" />
    <em className="not-italic text-[#C77A3F]">order today?</em>
  </span>
</h1>

              {/* Description */}
              <p className="text-[15px] md:text-base text-[#7A6558] leading-relaxed max-w-md mx-auto lg:mx-0 mb-10">
                From wood-fired pizza and sizzling steaks to fresh salads and hearty soups — a menu built for every mood, every appetite, every occasion.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link
                  href="/menu-list"
                  className="group relative overflow-hidden bg-[#1A1208] text-white px-8 py-3.5 rounded-full text-[14px] font-semibold transition-all duration-300 hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Full Menu
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-[#C77A3F] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
                
                <Link
                  href="/contact"
                  className="border-2 border-[#C77A3F] text-[#C77A3F] hover:bg-[#C77A3F] hover:text-white px-8 py-3.5 rounded-full text-[14px] font-semibold transition-all duration-300 hover:shadow-lg"
                >
                  Book a Table
                </Link>
              </div>

              {/* Stats with refined styling */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#F0EDE8]">
                {[
                  { num: '4.9', label: 'Rating', suffix: '★', sub: '2k+ reviews' },
                  { num: '12k+', label: 'Happy Guests', suffix: '', sub: 'monthly served' },
                  { num: '11', label: 'Cuisines', suffix: '', sub: 'global flavors' },
                  { num: '12', label: 'Years', suffix: '+', sub: 'of excellence' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="flex items-baseline justify-center lg:justify-start gap-0.5">
                      <span className="font-playfair text-2xl md:text-3xl font-bold text-[#1A1208]">
                        {stat.num}
                      </span>
                      {stat.suffix && (
                        <span className="font-playfair text-xl md:text-2xl font-bold text-[#C77A3F]">
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <div className="text-[12px] font-medium text-[#B0A090] mt-1">{stat.label}</div>
                    <div className="text-[10px] text-[#CCC] mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Elegant Circular Image */}
            <div className="flex-1 flex justify-center items-center relative">
              {/* Decorative rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[380px] h-[380px] md:w-[480px] md:h-[480px] rounded-full border border-[#C77A3F]/10 animate-pulse" />
                <div className="absolute w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full border border-[#C77A3F]/5" />
              </div>

              {/* Main circular image container */}
              <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]">
                {/* Outer elegant ring */}
                <div className="absolute -inset-3 rounded-full border-2 border-[#C77A3F]/20" />
                <div className="absolute -inset-6 rounded-full border border-[#C77A3F]/10" />
                
                {/* Image circle */}
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-4 ring-white">
                  <Image
                    src="/hero/hero.jpg"
                    alt="Signature dish presentation"
                    fill
                    className="object-cover scale-105 hover:scale-110 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 320px, 420px"
                  />
                </div>

                {/* Floating badge - top right */}
                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 md:px-4 md:py-3 shadow-lg border border-[#C77A3F]/20">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl md:text-3xl">⭐</span>
                    <div>
                      <p className="text-[11px] md:text-xs font-semibold text-[#1A1208]">Guest Favorite</p>
                      <p className="text-[10px] md:text-[11px] text-[#C77A3F]">#1 in Mardan</p>
                    </div>
                  </div>
                </div>

                {/* Floating badge - bottom left */}
                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-[#1A1208]/95 backdrop-blur-sm rounded-2xl px-3 py-2 md:px-4 md:py-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl">🍕</span>
                    <div>
                      <p className="text-[11px] md:text-xs font-semibold text-white">Today's Special</p>
                      <p className="text-[10px] md:text-[11px] text-[#C77A3F]">Dream Special Pizza</p>
                    </div>
                  </div>
                </div>

                {/* Small decorative dots */}
                <div className="absolute top-1/4 -left-8 w-2 h-2 rounded-full bg-[#C77A3F]/40" />
                <div className="absolute bottom-1/3 -right-6 w-1.5 h-1.5 rounded-full bg-[#C77A3F]/30" />
              </div>
            </div>

          </div>
        </div>

       
      </section>
    </>
  );
}