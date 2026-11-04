import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative bg-[#050505] pt-20 pb-8 overflow-hidden text-[#F5F3EE]">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">

        {/* Top Section: Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Logo & Description */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/Nexorax-Purple-and-Gold-Ribbon-Logo.png"
                alt="NEXORAX — forex education and training"
                width={180}
                height={72}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              A structured forex trading education ecosystem — mentor-led, market-grounded, built on process over promises.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="text-[#19C8EE] font-semibold text-sm tracking-wider uppercase mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/#about" className="text-gray-400 hover:text-white text-sm transition-colors"> NEXORAX</Link></li>
              <li><Link href="/#markets" className="text-gray-400 hover:text-white text-sm transition-colors">Markets</Link></li>
              <li><Link href="/#curriculum" className="text-gray-400 hover:text-white text-sm transition-colors">Curriculum</Link></li>
              <li><Link href="/#mentors" className="text-gray-400 hover:text-white text-sm transition-colors">Mentors</Link></li>
            </ul>
          </div>

          {/* Column 3: Program */}
          <div>
            <h4 className="text-[#19C8EE] font-semibold text-sm tracking-wider uppercase mb-6">Program</h4>
            <ul className="space-y-4">
              <li><Link href="/#curriculum" className="text-gray-400 hover:text-white text-sm transition-colors">Forex curriculum</Link></li>
              <li><Link href="/#faq" className="text-gray-400 hover:text-white text-sm transition-colors">FAQ</Link></li>
              <li><Link href="/register" className="text-gray-400 hover:text-white text-sm transition-colors">Onboard</Link></li>
            </ul>
          </div>

          {/* Column 4: Reach Us */}
          <div>
            <h4 className="text-[#19C8EE] font-semibold text-sm tracking-wider uppercase mb-6">Reach Us</h4>
            <ul className="space-y-4">
              <li><Link href="/#contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact us</Link></li>
              <li><a href="mailto:hello@nexorax.com" className="text-gray-400 hover:text-white text-sm transition-colors">hello@nexorax.com</a></li>
              <li><Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Middle Section: Disclaimer Box */}
        <div className="border border-white/10 rounded-2xl p-6 md:p-8 mb-20 bg-white/[0.02]">
          <p className="text-gray-400 text-sm leading-relaxed">
            Trading forex involves substantial risk of loss. NEXORAX provides education only — nothing on this site is investment advice, a recommendation, or a promise of returns. Trade only with capital you can afford to lose.
          </p>
        </div>

        {/* Bottom Section: Giant Watermark & Copyright */}
        <div className="relative pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">

          {/* Watermark Text (Positioned absolutely to overlap nicely) */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none select-none opacity-[0.03]">
            <span className="font-serif text-[120px] md:text-[180px] leading-none font-bold whitespace-nowrap">
              NEXORAX
            </span>
          </div>

          <div className="relative z-10 text-gray-500 text-sm">
            © 2026 NEXORAX
          </div>
          <div className="relative z-10 text-gray-500 text-sm">
            Education · Not investment advice
          </div>
        </div>

      </div>
    </footer>
  );
}