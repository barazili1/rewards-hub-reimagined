import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, RotateCcw, TrendingUp } from "lucide-react";
import { TopBar } from "@/components/dark-vip/TopBar";
import { LiveWins } from "@/components/dark-vip/LiveWins";
import { BrandName } from "@/components/dark-vip/BrandName";
import { CodeTimer, useCodeGuard } from "@/components/dark-vip/CodeTimer";
import { PLATFORM_NAME } from "@/lib/platform";
import logoCrash from "@/assets/logo-crash-game.png";

export const Route = createFileRoute("/crash")({
  head: () => ({
    meta: [
      { title: `Crash — ${PLATFORM_NAME}` },
      {
        name: "description",
        content:
          "لوحة إشارات لعبة الطيارة Crash داخل Xparibet: توقّع لحظة السحب مع نسبة أمان لكل جولة.",
      },
      { property: "og:title", content: `Crash — ${PLATFORM_NAME}` },
      {
        property: "og:description",
        content: "اضغط بدأ للحصول على توقع الجولة القادمة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/crash" }],
  }),
  component: CrashPage,
});

function randomMultiplier() {
  const r = Math.random();
  const raw = r < 0.62 ? 1.2 + r * 2 : 2.4 + Math.random() * 6.5;
  return Math.round(raw * 100) / 100;
}

function CrashPage() {
  const { session, ready } = useCodeGuard();
  const [value, setValue] = useState<number | null>(null);
  const [safety, setSafety] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [spinning, setSpinning] = useState(false);

  const start = () => {
    if (spinning) return;
    setSpinning(true);
    setValue(null);
    let ticks = 0;
    const id = window.setInterval(() => {
      setValue(randomMultiplier());
      ticks += 1;
      if (ticks > 16) {
        window.clearInterval(id);
        const final = randomMultiplier();
        setValue(final);
        setSafety(Math.round(78 + Math.random() * 20));
        setHistory((h) => [final, ...h].slice(0, 8));
        setSpinning(false);
      }
    }, 70);
  };

  const restart = () => {
    setValue(null);
    setSafety(0);
    setHistory([]);
  };

  if (!ready || !session) return null;

  return (
    <div className="min-h-screen">
      <TopBar backTo="/terms" usersOnline={6314} />

      <main className="mx-auto w-full max-w-xl px-5 pb-16">
        <section className="mt-6 flex flex-col items-center">
          <img
            src={logoCrash}
            alt="شعار لعبة الطيارة"
            width={768}
            height={768}
            className="size-20 object-contain drop-shadow-[0_0_25px_rgba(229,57,53,0.45)]"
          />
          <BrandName className="mt-3 text-lg" />
          <p className="mt-1 font-display text-[10px] tracking-[0.4em] text-primary">
            CRASH SIGNALS
          </p>
        </section>

        <CodeTimer session={session} />

        <section className="surface-card relative mt-5 overflow-hidden rounded-3xl p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-primary/15 blur-3xl"
          />
          <p className="text-center font-display text-[10px] tracking-[0.4em] text-muted-foreground">
            NEXT ROUND TARGET
          </p>
          <p
            className={`mt-4 text-center font-display text-6xl font-extrabold tabular-nums ${
              value === null ? "text-muted-foreground/40" : "text-gold"
            }`}
          >
            {value === null ? "—" : `${value.toFixed(2)}x`}
          </p>

          <div className="mt-6">
            <div className="flex items-center justify-between font-display text-[10px] tracking-[0.3em] text-muted-foreground">
              <span>SAFETY</span>
              <span className="text-primary">{safety}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="bg-gold h-full rounded-full transition-[width] duration-500"
                style={{ width: `${safety}%` }}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {history.length === 0 ? (
              <span className="text-[11px] text-muted-foreground">
                لا توجد جولات بعد
              </span>
            ) : (
              history.map((h, i) => (
                <span
                  key={`${h}-${i}`}
                  className={`cell-pop rounded-full border px-3 py-1 font-display text-[11px] font-bold ${
                    h >= 2
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border bg-secondary/40 text-muted-foreground"
                  }`}
                >
                  {h.toFixed(2)}x
                </span>
              ))
            )}
          </div>
        </section>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={start}
            disabled={spinning}
            className="flex h-12 items-center justify-center gap-2 rounded-[15px] bg-foreground font-display text-sm font-extrabold text-background shadow-lg transition-transform active:scale-[0.98] disabled:opacity-60"
          >
            {spinning ? (
              <TrendingUp className="size-4 animate-pulse" />
            ) : (
              <Play className="size-4" />
            )}
            بدأ
          </button>
          <button
            onClick={restart}
            className="bg-gold flex h-12 items-center justify-center gap-2 rounded-[15px] font-display text-sm font-extrabold text-primary-foreground transition-transform active:scale-[0.98]"
          >
            <RotateCcw className="size-4" />
            اعاده بدأ
          </button>
        </div>

        <LiveWins />
      </main>
    </div>
  );
}
