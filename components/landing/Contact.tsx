export function Contact() {
    return (
        <section id="contact" className="relative w-full bg-[#050505] text-[#F5F3EE] py-24 overflow-hidden border-t border-white/5">

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #F5F3EE 1px, transparent 0)',
                    backgroundSize: '26px 26px'
                }}
            ></div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">

                {/* Top Heading Section */}
                <div className="mb-14">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#19C8EE] mb-5 font-semibold">
                        CONTACT
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-serif tracking-tight text-white mb-5">
                        Let&apos;s{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#347DFF] via-[#19C8EE] to-[#155DF5] italic">
                            talk
                        </span>
                        .
                    </h2>
                    <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                        Questions about the curriculum, formats, or enrolment? Send us a note and a mentor or advisor will reply.
                    </p>
                </div>

                {/* Main Grid: Form + Info Cards */}
                <div className="flex items-center justify-center w-full">

                    <div className="flex flex-col md:flex-row gap-6 max-w-5xl w-full mx-auto">

                        {/* Card 1: Email */}
                        <div className="flex-1 rounded-2xl border border-white/10 bg-[#0A0A0A] p-6">
                            <div className="text-[#19C8EE] mb-4">
                                <MailIcon />
                            </div>
                            <p className="text-white font-semibold text-sm mb-1">Email</p>
                            <a href="mailto:hello@nexorax.com" className="text-white/50 text-sm hover:text-[#19C8EE] transition-colors">
                                hello@nexorax.com
                            </a>
                        </div>

                        {/* Card 2: Response Time */}
                        <div className="flex-1 rounded-2xl border border-white/10 bg-[#0A0A0A] p-6">
                            <div className="text-[#19C8EE] mb-4">
                                <ClockIcon />
                            </div>
                            <p className="text-white font-semibold text-sm mb-1">Response time</p>
                            <p className="text-white/50 text-sm">Usually within one business day.</p>
                        </div>

                        {/* Card 3: Quick Answers */}
                        <div className="flex-1 rounded-2xl border border-white/10 bg-[#0A0A0A] p-6">
                            <div className="text-[#19C8EE] mb-4">
                                <HelpIcon />
                            </div>
                            <p className="text-white font-semibold text-sm mb-1">Quick answers</p>
                            <p className="text-white/50 text-sm">
                                Check the <a href="#faq" className="text-[#19C8EE] hover:underline">FAQ</a> first — most questions are covered.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}

// --- Static SVG Icons ---
function ChevronDownIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

function SendIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function HelpIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
        </svg>
    );
}