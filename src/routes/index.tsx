import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PLATFORM_LOGO } from "@/lib/platform";
import { BrandName } from "@/components/dark-vip/BrandName";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Xparibet — نادي التوقعات الحصري" },
      {
        name: "description",
        content:
          "Xparibet تطبيق حصري للأعضاء بثيم أسود وأحمر: خطوات تفعيل بسيطة وتجربة أنيقة.",
      },
      { property: "og:title", content: "Xparibet — نادي التوقعات الحصري" },
      {
        property: "og:description",
        content: "دخول حصري لأعضاء Xparibet.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(() => {
      setProgress(Math.min(100, ((Date.now() - start) / 3000) * 100));
    }, 30);
    const timeout = window.setTimeout(() => navigate({ to: "/terms" }), 3050);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8">
      {/* ambient gold aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-primary/8 to-transparent"
      />

      <div className="relative flex flex-col items-center">
        <div className="relative flex size-44 items-center justify-center">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-primary/25"
          />
          <span
            aria-hidden
            className="absolute inset-3 rounded-full border border-primary/15"
          />
          <span
            aria-hidden
            className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary/70 [animation-duration:3.5s]"
          />
          <img
            src={PLATFORM_LOGO}
            alt="شعار Xparibet"
            width={256}
            height={256}
            className="animate-glow-pulse size-28 rounded-full object-contain"
          />
        </div>

        <h1 className="animate-rise mt-9">
          <BrandName className="text-[2.6rem]" />
        </h1>

        <div className="animate-rise mt-4 flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-primary/60" />
          <p className="text-[10px] tracking-[0.5em] text-muted-foreground">
            EXCLUSIVE CLUB
          </p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-primary/60" />
        </div>
      </div>

      <div className="relative mt-14 w-full max-w-[260px]">
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="bg-gold shine h-full rounded-full transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] tracking-[0.3em] text-muted-foreground">
          <span>جاري التحميل</span>
          <span className="font-display text-primary">
            {String(Math.round(progress)).padStart(2, "0")}%
          </span>
        </div>
      </div>

      <p className="absolute bottom-8 text-[10px] tracking-[0.35em] text-muted-foreground/70">
        Xparibet © {new Date().getFullYear()}
      </p>
    </main>
  );
}
