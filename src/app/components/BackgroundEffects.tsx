export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-slate-50">
      {/* Subtle modern professional background dots or gradients */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          background: `radial-gradient(circle at 80% 20%, #e0f2fe 0%, transparent 40%),
                       radial-gradient(circle at 20% 80%, #f1f5f9 0%, transparent 40%)`,
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
}
