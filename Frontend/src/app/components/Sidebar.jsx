const navItems = [
  { icon: 'add_box', label: 'New Battle', active: true },
  { icon: 'history', label: 'History' },
  { icon: 'leaderboard', label: 'Leaderboard' },
  { icon: 'assessment', label: 'Benchmarks' },
  { icon: 'settings', label: 'Settings' },
];

export default function Sidebar() {
  return (
    <nav className="w-[280px] min-w-[280px] h-screen flex flex-col bg-surface/60 backdrop-blur-xl border-r border-white/10 shadow-[0_0_40px_rgba(124,58,237,0.05)] relative z-50">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(124,58,237,0.4)]">
          <span className="material-symbols-outlined text-on-primary-container text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            terminal
          </span>
        </div>
        <div>
          <h1 className="font-sans font-extrabold text-base text-primary leading-none tracking-tight uppercase">
            BATTLE AI
          </h1>
          <p className="font-sans font-semibold text-[10px] text-on-surface-variant uppercase tracking-wider mt-1">
            Mission Control
          </p>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 py-3 px-4 rounded-lg font-sans text-sm transition-all duration-200 border-r-2 ${
              item.active
                ? 'font-bold text-primary bg-primary/10 border-primary'
                : 'font-normal text-on-surface-variant hover:text-on-surface hover:bg-white/5 border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </div>

      {/* CTA Button */}
      <div className="p-6 border-t border-white/10">
        <button className="w-full py-3 px-4 bg-gradient-to-r from-primary-container to-inverse-primary text-white rounded-lg font-sans font-semibold text-[11px] tracking-widest uppercase cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 shadow-[0_4px_15px_rgba(124,58,237,0.3)]">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            swords
          </span>
          Start Arena Battle
        </button>
      </div>
    </nav>
  );
}
