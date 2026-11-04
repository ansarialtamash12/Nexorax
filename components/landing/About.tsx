export function About() {
    return (
        <section id="about" className="relative w-full bg-[#050505] text-[#F5F3EE] py-24 overflow-hidden border-t border-white/5">

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)',
                    backgroundSize: '26px 26px'
                }}
            ></div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">

                {/* Top Heading Section */}
                <div className="mb-14">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#19C8EE] mb-5 font-semibold">
                        NEXORAX ACADEMY
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-serif tracking-tight text-white mb-6">
                        Built by traders,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#347DFF] via-[#19C8EE] to-[#155DF5] italic">
                            not marketers.
                        </span>
                    </h2>
                    <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
                        NEXORAX started as a frustration with how forex is usually taught — scattered YouTube clips, paid signal groups, and vague promises. We built the structured path we wished we&apos;d had: one curriculum, real mentors, and a hard rule against selling trade calls.
                    </p>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-16"></div>

                {/* Two-Column Grid: Mission & Approach */}
                <div className="grid md:grid-cols-2 gap-12">

                    {/* Column 1: Our Mission */}
                    <div>
                        <div className="text-[#19C8EE] mb-6">
                            <TargetIcon />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-white mb-4">
                            Our mission
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            To make forex education structured and honest — replacing scattered tips and paid signals with a sequenced curriculum, live market practice, and mentors who show their own trades, wins and losses alike.
                        </p>
                    </div>

                    {/* Column 2: Our Approach */}
                    <div>
                        <div className="text-[#19C8EE] mb-6">
                            <EyeIcon />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-white mb-4">
                            Our approach
                        </h3>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Every phase is taught against live charts, not screenshots. Students review real setups — including losing ones — so they learn to read the market instead of memorising outcomes.
                        </p>
                    </div>

                </div>

                {/* Bottom Divider */}
                <div className="border-t border-white/10 mt-16"></div>

            </div>
        </section>
    );
}

// --- Static SVG Icons ---
function TargetIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    );
}

function EyeIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}