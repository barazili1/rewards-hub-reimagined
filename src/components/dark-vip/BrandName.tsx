export function BrandName({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-extrabold ${className}`}>
      <span className="text-gold">اسكربت</span>{" "}
      <span className="text-foreground">ايران</span>
    </span>
  );
}
