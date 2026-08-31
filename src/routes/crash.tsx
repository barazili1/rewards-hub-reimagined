import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, Rocket, RotateCcw, ShieldCheck, Timer } from "lucide-react";
import { TopBar } from "@/components/dark-vip/TopBar";
import { LiveWins } from "@/components/dark-vip/LiveWins";
import { BrandName } from "@/components/dark-vip/BrandName";
import { useCodeGuard } from "@/components/dark-vip/CodeTimer";
import { toast } from "sonner";
import { getCrashSignal } from "@/lib/firebase";
import { VIP_SIGNAL_ID } from "@/lib/session";
import { PLATFORM_NAME } from "@/lib/platform";
import logoCrash from "@/assets/icon-crash.png";

export const Route = createFileRoute("/crash")({
  head: () => ({
    meta: [
      { title: `Crash — ${PLATFORM_NAME}` },
      {
        name: "description",
        content:
          "لوحة إشارات لعبة الطيارة Crash داخل اسكربت ايران: توقّع لحظة السحب مع نسبة أمان لكل جولة.",
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
  const raw = 1 + Math.random() * 5;
  return Math.round(raw * 100) / 100;
}

function CrashPage() {
  const { session, ready } = useCodeGuard();
  const [value, setValue] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [spinning, setSpinning] = useState(false);

  const isVip = session?.code.trim() === VIP_SIGNAL_ID;

  const start = () => {
    if (spinning) return;
    setSpinning(true);
    setValue(null);
    const pending = isVip
      ? getCrashSignal().catch(() => {
          toast.error("تعذّر تحميل التوقع");
          return null;
        })
      : Promise.resolve<number | null>(null);
    let ticks = 0;
    const id = window.setInterval(() => {
      setValue(randomMultiplier());
      ticks += 1;
      if (ticks > 16) {
        window.clearInterval(id);
        void pending.then((remote) => {
          const final = remote ?? randomMultiplier();
          setValue(final);
          setHistory((h) => [final, ...h].slice(0, 8));
          setSpinning(false);
        });
      }
    }, 70);
  };

  const restart = () => {
    setValue(null);
    setHistory([]);
  };

  if (!ready || !session) return null;

  return (
    <div className="min-h-screen">
      <TopBar backTo="/terms" usersOnline={6314} />

      <main className="mx-auto w-full max-w-xl px-5 pb-16">
        <section className="mt-6 flex flex-col items-center text-center">
          <span className="flex size-28 items-center justify-center rounded-[26px] border border-primary/30 bg-gradient-to-b from-primary/15 to-transparent">
            <img
              src={logoCrash}
              alt="شعار لعبة الطيارة"
              width={512}
              height={512}
              className="size-20 object-contain drop-shadow-[0_0_22px_oklch(0.58_0.23_27/0.55)]"
            />
          </span>
          <BrandName className="mt-3 text-lg" />
          <p className="mt-1 font-display text-[10px] tracking-[0.4em] text-primary">
            CRASH SIGNALS
          </p>
        </section>

        <section className="mt-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" />
            <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
              LAST SIGNALS
            </p>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {history.length === 0 ? (
              <span className="text-[11px] text-muted-foreground">
                لا توجد جولات بعد
              </span>
            ) : (
              history.map((h, i) => (
                <span
                  key={`${h}-${i}`}
                  className={`cell-pop shrink-0 rounded-full border px-3 py-1 font-display text-[11px] font-bold ${
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

        <section className="mt-4 flex gap-3 overflow-x-auto pb-2">
          <div
            className="surface-card relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[24px] p-4"
            style={{ width: 350, height: 200, minWidth: 350, minHeight: 200 }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="relative flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-2 py-0.5 font-display text-[8px] font-bold tracking-[0.25em] text-muted-foreground">
                <Timer className="size-3 text-primary" />
                NEXT
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-display text-[8px] font-bold tracking-[0.25em] ${
                  spinning
                    ? "border border-primary/50 bg-primary/10 text-primary"
                    : "border border-border bg-secondary/40 text-muted-foreground"
                }`}
              >
                <Rocket className="size-3" />
                {spinning ? "SCAN" : "READY"}
              </span>
            </div>
            <p
              className={`relative mx-auto bg-gradient-to-b from-primary via-primary/80 to-white bg-clip-text px-4 py-1 text-center font-display text-[56px] font-extrabold leading-none tabular-nums text-transparent ${
                value === null ? "opacity-40" : ""
              }`}
            >
              {value === null ? "—" : `${value.toFixed(2)}x`}
            </p>
            <p className="relative text-center font-display text-[8px] tracking-[0.3em] text-muted-foreground">
              ODDS
            </p>
          </div>

          {history.map((h, i) => (
            <div
              key={`card-${h}-${i}`}
              className="surface-card flex shrink-0 flex-col items-center justify-center gap-2 rounded-[24px] p-4"
              style={{ width: 350, height: 200, minWidth: 350, minHeight: 200 }}
            >
              <p className="font-display text-[8px] tracking-[0.3em] text-muted-foreground">
                ROUND #{history.length - i}
              </p>
              <p
                className="bg-gradient-to-b from-primary via-primary/80 to-white bg-clip-text px-3 py-1 font-display text-[52px] font-extrabold leading-none tabular-nums text-transparent"
              >
                {h.toFixed(2)}x
              </p>
            </div>
          ))}
        </section>


        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={start}
            disabled={spinning}
            className="flex items-center justify-center gap-2 rounded-2xl bg-foreground py-4 font-display text-sm font-extrabold text-background shadow-lg transition-transform active:scale-[0.98] disabled:opacity-60"
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
