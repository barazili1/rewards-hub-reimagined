import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, Rocket, RotateCcw, ShieldCheck, Timer } from "lucide-react";
import { TopBar } from "@/components/dark-vip/TopBar";
import { LiveWins } from "@/components/dark-vip/LiveWins";
import { BrandName } from "@/components/dark-vip/BrandName";
import { useCodeGuard } from "@/components/dark-vip/CodeTimer";
import { PLATFORM_NAME } from "@/lib/platform";
import logoCrash from "@/assets/icon-crash.png";

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
    setSafety(0);
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

  const progress = value === null ? 0 : Math.min(100, (value / 10) * 100);

  return (
    <div className="min-h-screen">
      <TopBar backTo="/terms" usersOnline={6314} />

      <main className="mx-auto w-full max-w-xl px-5 pb-16">
        <section className="mt-6 flex flex-col items-center text-center">
          <span className="flex size-20 items-center justify-center rounded-[26px] border border-primary/30 bg-gradient-to-b from-primary/15 to-transparent">
            <img
              src={logoCrash}
              alt="شعار لعبة الطيارة"
              width={512}
              height={512}
              className="size-12 object-contain drop-shadow-[0_0_22px_oklch(0.58_0.23_27/0.55)]"
            />
          </span>
          <BrandName className="mt-3 text-lg" />
          <p className="mt-1 font-display text-[10px] tracking-[0.4em] text-primary">
            CRASH SIGNALS
          </p>
        </section>

        <section className="surface-card relative mt-6 overflow-hidden rounded-[28px] p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-14 -top-14 size-52 rounded-full bg-primary/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 bottom-6 h-24 rounded-full bg-primary/5 blur-2xl"
          />

          <div className="relative flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-2.5 py-1 font-display text-[9px] font-bold tracking-[0.25em] text-muted-foreground">
              <Timer className="size-3 text-primary" />
              NEXT ROUND
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-display text-[9px] font-bold tracking-[0.25em] ${
                spinning
                  ? "border border-primary/50 bg-primary/10 text-primary"
                  : "border border-border bg-secondary/40 text-muted-foreground"
              }`}
            >
              <Rocket className="size-3" />
              {spinning ? "SCANNING" : "READY"}
            </span>
          </div>

          <p
            className={`relative mt-6 text-center font-display text-[64px] font-extrabold leading-none tabular-nums transition-colors ${
              value === null
                ? "text-muted-foreground/30"
                : "bg-gradient-to-b from-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_28px_oklch(0.58_0.23_27/0.35)]"
            }`}
          >
            {value === null ? "—" : `${value.toFixed(2)}x`}
          </p>

          <div className="relative mt-6 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-primary transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between font-display text-[9px] tracking-[0.25em] text-muted-foreground">
            <span>1.00x</span>
            <span>10.00x</span>
          </div>

          <div className="relative mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-secondary/25 p-3 text-center">
              <p className="font-display text-[9px] tracking-[0.25em] text-muted-foreground">
                SAFETY
              </p>
              <p className="mt-1 font-display text-2xl font-extrabold text-primary tabular-nums">
                {safety}%
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/25 p-3 text-center">
              <p className="font-display text-[9px] tracking-[0.25em] text-muted-foreground">
                ROUNDS
              </p>
              <p className="mt-1 font-display text-2xl font-extrabold text-foreground tabular-nums">
                {history.length}
              </p>
            </div>
          </div>
        </section>

        <section className="surface-card mt-4 rounded-[22px] p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" />
            <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
              LAST SIGNALS
            </p>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
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
            className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-foreground py-4 font-display text-sm font-extrabold text-background shadow-lg transition-transform active:scale-[0.98] disabled:opacity-60"
          >
            {spinning ? (
              <Rocket className="size-4 animate-pulse" />
            ) : (
              <Play className="size-4" />
            )}
            بدأ
          </button>
          <button
            onClick={restart}
            className="bg-gold flex items-center justify-center gap-2 rounded-2xl py-4 font-display text-sm font-extrabold text-primary-foreground transition-transform active:scale-[0.98]"
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
