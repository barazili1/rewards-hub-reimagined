import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ADMIN_ID, grantAdmin, saveSession } from "@/lib/session";
import {
  BadgeCheck,
  Check,
  Copy,
  Send,
  Ticket,
  UserRound,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { TopBar } from "@/components/dark-vip/TopBar";
import { BrandName } from "@/components/dark-vip/BrandName";
import {
  DEPOSIT,
  DOWNLOAD_URL,
  PLATFORM_LOGO,
  PLATFORM_NAME,
  PROMO_CODE,
  REGISTER_URL,
} from "@/lib/platform";
import iconApple from "@/assets/icon-apple.png";
import iconCrash from "@/assets/icon-crash.png";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: `شروط تفعيل العضوية — ${PLATFORM_NAME}` },
      {
        name: "description",
        content:
          "أكمل خطوات تفعيل حسابك على Xparibet: التسجيل بالبروموكود B500، الإيداع، ثم إدخال الـ ID واختيار اللعبة.",
      },
      { property: "og:title", content: `شروط تفعيل العضوية — ${PLATFORM_NAME}` },
      {
        property: "og:description",
        content: "ثلاث خطوات سريعة لتفعيل عضويتك والدخول للتوقعات.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

type GameKey = "apple" | "crash";

const GAMES: { key: GameKey; label: string; img: string; to: string }[] = [
  { key: "crash", label: "Crash", img: iconCrash, to: "/crash" },
  { key: "apple", label: "Apple", img: iconApple, to: "/apple" },
];

function Step({
  index,
  badge,
  title,
  description,
  children,
}: {
  index: number;
  badge: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <li className="animate-rise surface-card relative rounded-3xl p-4">
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 font-display text-sm font-extrabold text-primary">
          {String(index).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <span className="font-display text-[9px] font-bold tracking-[0.3em] text-primary">
            {badge}
          </span>
          <h2 className="mt-0.5 font-display text-[15px] font-extrabold text-foreground">
            {title}
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </li>
  );
}

function TermsPage() {
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState("");
  const [game, setGame] = useState<GameKey | null>(null);
  const navigate = useNavigate();
  const idDigits = userId.replace(/\D/g, "");
  const idValid = idDigits.length >= 8 && idDigits.length <= 14;

  const handleSubmit = () => {
    if (!idValid) {
      toast.error("الـ ID يجب أن يكون من 8 إلى 14 رقم");
      return;
    }
    const target = GAMES.find((g) => g.key === game);
    if (!target) {
      toast.error("اختر اللعبة أولاً");
      return;
    }
    saveSession({ code: idDigits, expiresAt: null });
    void navigate({ to: target.to });
  };

  const copyPromo = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("تعذّر نسخ الكود");
    }
  };

  return (
    <div className="min-h-screen">
      <TopBar backTo="/" />

      <main className="mx-auto w-full max-w-xl px-5 pb-16">
        <section className="mt-7 flex flex-col items-center text-center">
          <img
            src={PLATFORM_LOGO}
            alt={`شعار ${PLATFORM_NAME}`}
            width={96}
            height={96}
            className="size-16 rounded-2xl border border-primary/30 object-contain p-1.5"
          />
          <BrandName className="mt-3 text-xl" />
          <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-display text-[9px] font-bold tracking-[0.3em] text-primary">
            ACCOUNT ACTIVATION
          </span>
          <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight text-foreground">
            أكمل الشروط لتفعيل عضويتك
          </h1>
          <p className="mt-2 text-xs text-muted-foreground">
            ثلاث خطوات بسيطة — أقل من دقيقتين
          </p>
        </section>

        <ol className="mt-8 space-y-4">
          <Step
            index={1}
            badge="PROMO CODE"
            title="التسجيل بالبروموكود"
            description="انسخ البروموكود واستخدمه أثناء إنشاء الحساب لربطه بالتطبيق."
          >
            <div className="flex h-14 w-full items-center gap-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
                <Ticket className="size-4 text-primary" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[9px] font-bold tracking-[0.25em] text-muted-foreground">
                  PROMOCODE
                </p>
                <p className="font-display text-base font-extrabold tracking-[0.2em] text-foreground">
                  {PROMO_CODE}
                </p>
              </div>
              <button
                onClick={() => void copyPromo()}
                aria-label="نسخ البرومو كود"
                className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 font-display text-[10px] font-bold tracking-[0.15em] text-muted-foreground transition-colors hover:text-primary"
              >
                {copied ? "COPIED" : "COPY"}
                {copied ? (
                  <Check className="size-3.5" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>

            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl font-display text-sm font-bold text-primary-foreground transition-transform active:scale-[0.98]"
            >
              <UserRound className="size-4" />
              التسجيل في {PLATFORM_NAME}
            </a>
          </Step>

          <Step
            index={2}
            badge="DEPOSIT"
            title="إيداع التفعيل"
            description="الحد الأدنى للإيداع لتنشيط المحفظة (الأموال تبقى في رصيدك)."
          >
            <div className="grid grid-cols-2 gap-3">
              {DEPOSIT.map((item) => (
                <div
                  key={item.unit}
                  className="rounded-xl border border-primary/25 bg-gradient-to-b from-primary/10 to-transparent p-3 text-center"
                >
                  <span className="mx-auto flex size-8 items-center justify-center rounded-full border border-primary/40 bg-primary/15 font-display text-xs font-extrabold text-primary">
                    {item.symbol}
                  </span>
                  <p className="mt-2 font-display text-2xl font-extrabold leading-none text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-1.5 font-display text-[9px] font-bold tracking-[0.25em] text-primary/80">
                    {item.unit}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </Step>

          <Step
            index={3}
            badge="VERIFY"
            title="إدخال الـ ID واختيار اللعبة"
            description={`أدخل رقم حسابك في ${PLATFORM_NAME} ثم اختر اللعبة التي تريد التوقعات لها.`}
          >
            <div className="flex items-center gap-3 rounded-xl border border-input bg-secondary/40 px-4 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring">
              <BadgeCheck className="size-4 text-primary" />
              <input
                value={userId}
                onChange={(e) => {
                  const value = e.target.value;
                  setUserId(value);
                  if (value.trim() === ADMIN_ID) {
                    grantAdmin();
                    toast.success("مرحبًا بك في لوحة التحكم");
                    void navigate({ to: "/admin" });
                  }
                }}
                placeholder="اكتب ID الحساب"
                inputMode="numeric"
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {idValid ? <Check className="size-4 text-primary" /> : null}
            </div>

            {idValid ? (
              <div className="animate-rise mt-4 grid grid-cols-2 gap-3">
                {GAMES.map((g) => (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => setGame(g.key)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-colors ${
                      game === g.key
                        ? "border-primary bg-primary/10 ring-2 ring-primary/50"
                        : "border-border bg-secondary/25 hover:border-primary/60"
                    }`}
                  >
                    <img
                      src={g.img}
                      alt={g.label}
                      loading="lazy"
                      width={768}
                      height={768}
                      className="size-12 rounded-lg object-contain"
                    />
                    <span className="font-display text-[11px] font-bold text-foreground">
                      {g.label}
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </Step>
        </ol>

        <button
          onClick={handleSubmit}
          className="bg-gold mt-8 h-14 w-full rounded-xl font-display text-base font-extrabold text-primary-foreground shadow-lg transition-transform active:scale-[0.98]"
        >
          الدخول للتوقعات
        </button>

        <p className="mt-5 text-center text-[11px] leading-relaxed text-muted-foreground">
          يتم تفعيل العضوية بعد التحقق من إكمال جميع الشروط.
        </p>
      </main>
    </div>
  );
}
