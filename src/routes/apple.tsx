import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { TopBar } from "@/components/dark-vip/TopBar";
import { LiveWins } from "@/components/dark-vip/LiveWins";
import { BrandName } from "@/components/dark-vip/BrandName";
import { CodeTimer, useCodeGuard } from "@/components/dark-vip/CodeTimer";
import {
  generateAppleSignals,
  getAppleSignals,
  setAppleSignals,
} from "@/lib/firebase";
import { APPLE_SIGNAL_CODE } from "@/lib/session";
import { PLATFORM_NAME } from "@/lib/platform";
import logoApple from "@/assets/logo-apple-game.png";

export const Route = createFileRoute("/apple")({
  head: () => ({
    meta: [
      { title: `Apple of Fortune — ${PLATFORM_NAME}` },
      {
        name: "description",
        content:
          "لوحة إشارات Apple of Fortune داخل Xparibet: 10 صفوف مع الأودد الخاص بكل صف.",
      },
      { property: "og:title", content: `Apple of Fortune — ${PLATFORM_NAME}` },
      {
        property: "og:description",
        content: "اضغط Start لعرض إشارات التفاح لكل صف.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/apple" }],
  }),
  component: ApplePage,
});

const CELL_EMPTY = "https://logo12.gamer.gd/cvb.png";
const CELL_GOOD = "https://logo12.gamer.gd/apple.png";
const CELL_BAD = "https://logo12.gamer.gd/poi.png";

// من تحت لفوق: 1.23 ... 349.43
const ODDS = [1.23, 1.54, 1.93, 2.41, 4.02, 6.71, 11.18, 27.97, 69.93, 349.43];

function ApplePage() {
  const { session, ready } = useCodeGuard();
  const [signals, setSignals] = useState<number[] | null>(null);
  const [busy, setBusy] = useState(false);

  const useFirebase = session?.code.trim().toUpperCase() === APPLE_SIGNAL_CODE;

  const start = async () => {
    setBusy(true);
    try {
      setSignals(useFirebase ? await getAppleSignals() : generateAppleSignals());
    } catch {
      toast.error("تعذّر تحميل التوقعات");
    } finally {
      setBusy(false);
    }
  };

  const restart = async () => {
    setSignals(null);
    if (!useFirebase) return;
    setBusy(true);
    try {
      await setAppleSignals(generateAppleSignals());
      toast.success("تم تحديث التوقعات");
    } catch {
      toast.error("تعذّر تحديث التوقعات");
    } finally {
      setBusy(false);
    }
  };

  if (!ready || !session) return null;

  const rowsTopDown = [...ODDS].reverse();

  return (
    <div className="min-h-screen">
      <TopBar backTo="/terms" usersOnline={5127} />

      <main className="mx-auto w-full max-w-xl px-5 pb-16">
        <section className="mt-6 flex flex-col items-center">
          <img
            src={logoApple}
            alt="شعار لعبة التفاحة"
            width={768}
            height={768}
            className="size-20 object-contain drop-shadow-[0_0_25px_rgba(229,57,53,0.45)]"
          />
          <BrandName className="mt-3 text-lg" />
          <p className="mt-1 font-display text-[10px] tracking-[0.4em] text-primary">
            APPLE OF FORTUNE
          </p>
        </section>

        <CodeTimer session={session} />

        <section className="surface-card relative mt-5 overflow-hidden rounded-3xl p-4">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-12 top-1/3 size-44 rounded-full bg-primary/10 blur-3xl"
          />
          <div className="relative flex flex-col gap-2">
            {rowsTopDown.map((odd, rowFromTop) => {
              const row = 9 - rowFromTop; // 0 = bottom row
              const active = signals !== null;
              return (
                <div
                  key={`${odd}-${active ? "s" : "e"}`}
                  className={`flex items-center justify-center gap-2 rounded-2xl px-1.5 py-1 ${
                    active ? "cell-pop bg-primary/5" : ""
                  }`}
                  style={active ? { animationDelay: `${row * 90}ms` } : undefined}
                >
                  <span className="w-16 shrink-0 rounded-lg border border-primary/25 bg-primary/10 py-1 text-center font-display text-[11px] font-bold text-primary">
                    {odd.toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, col) => {
                      const value = signals ? signals[row * 5 + col] : null;
                      const src =
                        value === null
                          ? CELL_EMPTY
                          : value === 1
                            ? CELL_BAD
                            : CELL_GOOD;
                      return (
                        <span
                          key={col}
                          className="flex size-[50px] items-center justify-center overflow-hidden rounded-[14px] border border-border bg-secondary/30"
                        >
                          <img
                            src={src}
                            alt=""
                            loading="lazy"
                            className="size-full object-contain p-0.5"
                          />
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => void start()}
            disabled={busy}
            className="flex h-12 items-center justify-center gap-2 rounded-[15px] bg-foreground font-display text-sm font-extrabold text-background shadow-lg transition-transform active:scale-[0.98] disabled:opacity-60"
          >
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Play className="size-4" />
            )}
            بدأ
          </button>
          <button
            onClick={() => void restart()}
            disabled={busy}
            className="bg-gold flex h-12 items-center justify-center gap-2 rounded-[15px] font-display text-sm font-extrabold text-primary-foreground transition-transform active:scale-[0.98] disabled:opacity-60"
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
