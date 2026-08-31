import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ADMIN_ID, grantAdmin } from "@/lib/session";
import {
  BadgeCheck,
  Check,
  Copy,
  Download,
  Loader2,
  Send,
  Ticket,
  UserRound,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { TopBar } from "@/components/dark-vip/TopBar";
import heroImg from "@/assets/terms-hero.jpg";
import melbetLogo from "@/assets/melbet-logo.jpg";
import gameApple from "@/assets/game-apple.jpg";
import gameMines from "@/assets/game-mines.jpg";
import stepTelegram from "@/assets/step-telegram.jpg";
import stepDeposit from "@/assets/step-deposit.jpg";
import stepId from "@/assets/step-id.jpg";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "شروط إنشاء الحساب — DARK BET" },
      {
        name: "description",
        content:
          "أكمل خطوات إنشاء حساب DARK BET: تحميل المنصة، الانضمام للقناة، البرومو كود، الإيداع، وإدخال الـ ID.",
      },
      { property: "og:title", content: "شروط إنشاء الحساب — DARK BET" },
      {
        property: "og:description",
        content: "خمس خطوات بسيطة لتفعيل عضويتك في DARK BET.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

const PROMO = "B2BMEL";

function Step({
  index,
  image,
  badge,
  title,
  description,
  children,
}: {
  index: number;
  image: string;
  badge: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <li className="animate-rise relative pr-12">
      {/* timeline rail */}
      <span
        aria-hidden
        className="absolute right-[21px] top-11 bottom-[-22px] w-px bg-gradient-to-b from-primary/40 to-transparent"
      />
      <span className="absolute right-0 top-1 flex size-11 items-center justify-center rounded-full border border-primary/40 bg-background font-display text-sm font-extrabold text-primary shadow-[0_0_0_6px_var(--background)]">
        {String(index).padStart(2, "0")}
      </span>

      <div className="surface-card overflow-hidden rounded-2xl">
        <div className="relative h-24">
          <img
            src={image}
            alt=""
            loading="lazy"
            width={512}
            height={512}
            className="size-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 flex flex-col justify-center px-4">
            <span className="font-display text-[9px] font-bold tracking-[0.3em] text-primary">
              {badge}
            </span>
            <h2 className="mt-1 font-display text-[15px] font-extrabold text-foreground">
              {title}
            </h2>
          </div>
        </div>

        <div className="px-4 pb-4 pt-3">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
          {children ? <div className="mt-4">{children}</div> : null}
        </div>
      </div>
    </li>
  );
}

function TermsPage() {
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState("");
  const [dialog, setDialog] = useState<"closed" | "loading" | "done">("closed");
  const [selectedGame, setSelectedGame] = useState<"mines" | "apple" | null>(
    null,
  );
  const navigate = useNavigate();
  const idDigits = userId.replace(/\D/g, "");
  const idValid = idDigits.length >= 10 && idDigits.length <= 14;

  const handleSubmit = () => {
    if (!idValid) {
      toast.error("الـ ID يجب أن يكون من 10 إلى 14 رقم");
      return;
    }
    setDialog("loading");
    window.setTimeout(() => setDialog("done"), 2500);
  };

  const copyPromo = async () => {
    try {
      await navigator.clipboard.writeText(PROMO);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("تعذّر نسخ الكود");
    }
  };

  return (
    <div className="min-h-screen">
      <TopBar backTo="/" />

      <main className="mx-auto w-full max-w-xl pb-16">
        <section className="relative h-56 overflow-hidden">
          <img
            src={heroImg}
            alt="أجواء DARK BET الذهبية"
            width={1536}
            height={768}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-display text-[9px] font-bold tracking-[0.3em] text-primary">
              ACCOUNT ACTIVATION
            </span>
            <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight text-foreground">
              أكمل الشروط لتفعيل عضويتك
            </h1>
            <p className="mt-2 text-xs text-muted-foreground">
              خمس خطوات بسيطة فقط — تستغرق أقل من دقيقتين
            </p>
          </div>
        </section>

        <div className="relative mt-8 px-5">
          <ol className="space-y-6">
            <Step
              index={1}
              image={melbetLogo}
              badge="OFFICIAL APP"
              title="تحميل منصة MELBET"
              description="قم بتحميل التطبيق الرسمي لمنصة MELBET لأجهزة أندرويد أو آيفون."
            >
              <a
                href="https://refpa3665.com/L?tag=d_5703114m_70867c_&site=5703114&ad=70867"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-foreground font-display text-sm font-bold text-background transition-transform active:scale-[0.98]"
              >
                <Download className="size-4" />
                تحميل التطبيق
              </a>
            </Step>

            <Step
              index={2}
              image={stepTelegram}
              badge="CHANNEL"
              title="الانضمام إلى القناة"
              description="اشترك في القناة لمتابعة التحديثات واستلام كود التفعيل."
            >
              <a
                href="https://t.me/+MhA9HqqjqXYyMGY0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold flex h-12 w-full items-center justify-center gap-2 rounded-xl font-display text-sm font-bold text-primary-foreground transition-transform active:scale-[0.98]"
              >
                <Send className="size-4" />
                انضمام الآن
              </a>
            </Step>

            <Step
              index={3}
              image={melbetLogo}
              badge="PROMO CODE"
              title="التسجيل بالبروموكود"
              description="انسخ البروموكود واستخدمه أثناء التسجيل لربط حسابك بالتطبيق."
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
                    {PROMO}
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
                href="https://refpa3665.com/L?tag=d_5703114m_2170c_&site=5703114&ad=2170"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-foreground font-display text-sm font-bold text-background transition-transform active:scale-[0.98]"
              >
                <UserRound className="size-4" />
                التسجيل في منصة MELBET
              </a>
            </Step>

            <Step
              index={4}
              image={stepDeposit}
              badge="DEPOSIT"
              title="إيداع التفعيل"
              description="الحد الأدنى للإيداع لتنشيط المحفظة (الأموال تبقى في رصيدك)."
            >
              <div className="grid grid-cols-2 gap-3">
                {[
                  { symbol: "$", value: "6.00", unit: "USD", note: "دولار" },
                  { symbol: "د", value: "1500", unit: "DINAR", note: "دينار" },
                ].map((item) => (
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
              index={5}
              image={stepId}
              badge="VERIFY"
              title="إدخال الـ ID الخاص بك"
              description="أدخل رقم حسابك في MELBET ثم اختر اللعبة التي تريد التوقعات لها."
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
                  <button
                    type="button"
                    onClick={() => setSelectedGame("mines")}
                    className={`group relative h-[100px] overflow-hidden rounded-xl border transition-colors ${selectedGame === "mines" ? "border-primary ring-2 ring-primary" : "border-border hover:border-primary/60"}`}
                  >
                    <img
                      src={gameMines}
                      alt="Mines"
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <span className="absolute inset-x-0 bottom-1.5 text-center font-display text-[11px] font-bold text-foreground">
                      Mines
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedGame("apple")}
                    className={`group relative h-[100px] overflow-hidden rounded-xl border transition-colors ${selectedGame === "apple" ? "border-primary ring-2 ring-primary" : "border-border hover:border-primary/60"}`}
                  >
                    <img
                      src={gameApple}
                      alt="Apple of fortune"
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute inset-x-0 bottom-1.5 text-center font-display text-[11px] font-bold text-primary">
                      Apple of fortune
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  </button>
                </div>
              ) : null}
            </Step>
          </ol>
        </div>

        <div className="px-5">
          <button
            onClick={handleSubmit}
            className="mt-9 h-14 w-full rounded-xl bg-foreground font-display text-base font-extrabold text-background shadow-lg transition-transform active:scale-[0.98]"
          >
            إكمال التسجيل
          </button>

          <p className="mt-5 text-center text-[11px] leading-relaxed text-muted-foreground">
            سيتم تفعيل عضويتك بعد التحقق من إكمال جميع الشروط.
          </p>
        </div>
      </main>

      {dialog !== "closed" ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 px-6 backdrop-blur-md">
          <div className="surface-card animate-rise w-full max-w-sm overflow-hidden rounded-3xl p-7 text-center">
            {dialog === "loading" ? (
              <>
                <div className="relative mx-auto flex size-20 items-center justify-center">
                  <span className="absolute inset-0 rounded-full border border-primary/30" />
                  <Loader2 className="size-10 animate-spin text-primary" />
                </div>
                <p className="mt-6 font-display text-[10px] tracking-[0.4em] text-primary">
                  PROCESSING
                </p>
                <h3 className="mt-2 font-display text-lg font-extrabold text-foreground">
                  جاري التحقق من الشروط...
                </h3>
                <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary/50">
                  <div className="bg-gold h-full w-1/3 animate-[shine_1.4s_ease-in-out_infinite]" />
                </div>
              </>
            ) : (
              <>
                <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-primary/40 bg-primary/15">
                  <Check className="size-8 text-primary" />
                </div>
                <p className="mt-5 font-display text-[10px] tracking-[0.4em] text-primary">
                  VERIFIED
                </p>
                <h3 className="mt-2 font-display text-lg font-extrabold text-foreground">
                  تم إكمال الخطوات بنجاح
                </h3>
                <p className="mt-4 text-[11px] text-muted-foreground">
                  تواصل مع الدعم لاستلام الكود
                </p>
                <p className="mt-1 font-display text-base font-extrabold text-foreground">
                  @B2BMEL
                </p>
                <a
                  href="https://t.me/B2BMEL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex h-13 w-full items-center justify-center rounded-xl bg-foreground font-display text-sm font-extrabold text-background shadow-lg transition-transform active:scale-[0.98]"
                >
                  المتابعه لاخذ الكود
                </a>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
