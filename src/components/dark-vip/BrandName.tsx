export function BrandName({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-extrabold tracking-[0.22em] ${className}`}>
      <span className="text-gold">XPARI</span>
      <span className="text-foreground">BET</span>
    </span>
  );
}
