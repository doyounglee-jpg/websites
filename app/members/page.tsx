import Link from "next/link";
import {
  Car01Icon,
  ChartUpIcon,
  CreditCardIcon,
  MoneyBag01Icon,
  Mortarboard01Icon,
  StethoscopeIcon,
} from "@hugeicons-pro/core-stroke-standard";
import { TopNav } from "../components/TopNav";
import RevealStack from "../components/RevealStack";
import { AnimatedBillsChatPanel } from "./AnimatedBillsChatPanel";
import { AnimatedChatPanel } from "./AnimatedChatPanel";
import { CoverageCards } from "./CoverageCards";
import { CreditScoreSequence } from "./CreditScoreSequence";
import { DebtPayoffSequence } from "./DebtPayoffSequence";
import { LiveSavingsTicker } from "./LiveSavingsTicker";

/**
 * /members - DARK Cleo-inspired bento + cinematic photography direction.
 *
 * (Promoted from /members-v3 → /members. The previous v1 lives at
 * /members-archived for reference.) Same structural moves as the now-
 * archived layout (full-bleed photo hero, alternating bento + features,
 * glassy pill nav) with restrained cyan over mostly monochrome surfaces.
 *
 * Photos: Unsplash hot-linked CDN URLs (prototype-only). Photos chosen
 * for moodier dusk/night/cool-toned cinematic mood.
 *
 * Color palette:
 *   - Page bg:       #0E1014  (matches /members and /companies)
 *   - Surface:       #15171B  (slightly lifted dark surface)
 *   - Text primary:  #F7F8F8
 *   - Text muted:    rgba(247,248,248,0.6)
 *   - Accent:        restrained cyan over mostly monochrome surfaces
 */

const PHOTOS = {
  // Aurora / northern lights - moody hero
  heroLandscape:
    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=2400&q=80",
  // Foggy/dusk mountain - section 1 backdrop
  feature1Backdrop:
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2400&q=80",
  // "Get your debt off your mind" portrait - local asset
  bentoPortrait: "/dancing-woman.png",
  // "More personalized than most apps" portrait - local asset
  personalizedPortrait: "/happy-man-with-phone.png",
  // "Every bill, paid on time" portrait - local asset
  billsPortrait: "/woman-with-tablet.png",
  // "Crush your debt by 70%" backdrop - local asset
  feature2Portrait: "/woman-on-mountain.png",
  // Warm intimate family portrait - testimonial (local asset)
  testimonialPortrait: "/testimonial-warm-two.png",
  // "Solve your debt. Get back to living." CTA backdrop - local asset
  ctaBackdrop: "/picnic.png",
};

export default function MembersV3Page() {
  return (
    <main className="page-enter min-h-screen bg-[#0E1014] text-zinc-50">
      {/* Shared marketing top nav - wordmark, center pill nav, CTA / hamburger. */}
      <TopNav active="members" ctaLabel="Get the App" ctaHref="#cta" />

      {/* ============================================================
          2. HERO - Full-bleed, no rounded corners. Lives outside the
          padded bento wrapper below so it spans edge-to-edge.
          Hero uses <RevealStack> instead of <Reveal>: each grid column
          (headline → video → body+CTA) reveals serially on a slow
          cinematic stagger, with the Linear-style blur-in. The outer
          <section> is no longer wrapped - the stack handles the entry.
         ============================================================ */}
      <section className="relative flex min-h-svh w-full items-center overflow-hidden bg-gradient-to-b from-[#15171B] via-[#101216] to-[#0E1014] lg:min-h-screen">
        {/* Full-bleed hero video - shared by mobile and desktop. The
            scrim layers below adapt per-viewport. object-cover so the
            video fills the section regardless of aspect ratio. On
            mobile the video is shifted up via object-position so the
            faces (which sit in the lower portion of the frame) land
            inside the phone-outline area near the top of the section.
            Desktop reverts to a center anchor. */}
        <video
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full origin-bottom translate-y-[10%] scale-[1.25] object-cover object-[center_92%] lg:origin-center lg:translate-y-0 lg:scale-100 lg:object-center"
        />
        {/* MOBILE scrim - uniform top-to-bottom darken since copy spans
            the full content column (a horizontal gradient like desktop
            would leave the mid-screen too bright behind the text). */}
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/55 via-black/40 to-black/65 lg:hidden"
          aria-hidden="true"
        />
        {/* DESKTOP scrim - left/right vignette so the side text columns
            stay readable while the center (video subject) shows
            through cleanly. */}
        <div
          className="pointer-events-none absolute inset-0 z-0 hidden bg-gradient-to-r from-black/60 via-black/15 to-black/60 lg:block"
          aria-hidden="true"
        />

        {/*
          12-col grid on lg+: headline (cols 1-3) · gap · video (cols 5-8) · gap · body+CTA (cols 10-12).
          Stacks on mobile; video pulled to top via `order-1` to match Cash App's mobile pattern.
          Section uses `items-center` so the grid is vertically centered in the viewport.
        */}
        {/* Reveal order: video (center) → headline (left) → body (right) →
            CTA. The DOM order below matches the reveal order so RevealStack
            picks up the cascade correctly. Visual layout is unchanged
            because the CSS `lg:order-*` and `lg:col-start-*` classes still
            place each block in its original column. On mobile (no grid)
            the `order-*` classes do the same thing for the stacked view.
            Cascade tuned faster (110ms stagger, 900ms duration) per the
            "a little faster" request. */}
        <RevealStack
          stagger={110}
          duration={900}
          className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-10 pt-20 sm:px-10 sm:py-24 md:px-16"
        >
          <div className="flex w-full flex-col items-center gap-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-6">
            {/*
              CENTER - Video (cols 5-8). aspect 9:19.5 = 0.462 (iPhone), per Cash App spec.
              Height capped at small viewport on mobile and 68vh on desktop so the video
              never overflows the section. First in DOM (and first to reveal) per user
              request - the video draws the eye, then the surrounding copy fades in.
            */}
            {/* Phone-shaped outline frame over the hero video. Shared
                by mobile and desktop: same transparent fill, thin
                white border, glass notification pulsing in/out on the
                `.phone-notif-pulse` loop. Mobile uses iPhone SE aspect
                (9/16, less tall than modern iPhones); desktop steps up
                to the tall 10/19.5 aspect. Placed in the center column
                (cols 5-8) on desktop; stacks first in source order on
                mobile (above the headline/body). */}
            <div className="reveal-item relative order-1 flex w-full justify-center lg:order-2 lg:col-span-4 lg:col-start-5">
              {/* Phone outline. overflow-hidden clips the notification
                  card while it sits above the top edge, so the slide-in
                  reads as the card appearing from the top of the phone. */}
              <div className="relative h-[400px] w-full max-w-[340px] overflow-hidden rounded-[28px] border border-white/40 bg-transparent shadow-[0_0_0_1px_rgba(0,0,0,0.18)] lg:aspect-[10/19.5] lg:h-[68vh] lg:w-auto lg:max-h-[760px] lg:max-w-none lg:rounded-[40px]">
                {/* Glass-morphism notification - identical material to
                    the previous HeroPhoneVideo notification, just driven
                    by a CSS keyframe loop instead of video timeupdate. */}
                <div
                  className="phone-notif-pulse pointer-events-none absolute left-1/2 top-[3%] z-20 w-[92%] lg:top-[4%] lg:w-[88%]"
                  aria-hidden="true"
                >
                  <div className="rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-3 backdrop-blur-3xl">
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <span className="text-[11px] font-semibold tracking-[0.02em] text-white/95">
                        Clerkie
                      </span>
                      <span className="text-[10px] font-medium text-white/55">
                        10:24 AM
                      </span>
                    </div>
                    <p className="text-[13px] leading-[1.4] text-white/90">
                      You paid off another account 🎉
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* LEFT - Headline (spans cols 1-4 = full left half, content
                block constrained to ~280px and anchored to the RIGHT edge
                of its column area - sits close to the phone instead of
                drifting toward the page edge as the viewport widens). */}
            {/* lg:-translate-y-3 lifts the headline 12px above the
                column's vertical center on desktop, so it sits slightly
                higher than the phone outline / right body+CTA midline. */}
            <div className="reveal-item order-2 w-full text-center lg:order-1 lg:col-span-4 lg:col-start-1 lg:mr-12 lg:max-w-[280px] lg:-translate-y-3 lg:justify-self-end lg:text-left">
              <h1 className="text-[32px] font-medium leading-[0.95] tracking-[-0.03em] [text-shadow:0_2px_10px_rgba(0,0,0,0.55)] sm:text-[40px] sm:font-normal lg:leading-[48px] lg:[text-shadow:0_0_32px_rgba(0,0,0,0.35),0_0_64px_rgba(0,0,0,0.22)] xl:text-[48px]">
                Solve your debt and money problems.
              </h1>
            </div>

            {/* RIGHT - Body + CTA (spans cols 9-12). The column wrapper is
                no longer a reveal-item - instead, the body <p> and the
                CTA <a> are individually marked, so they cascade one after
                the other (body reveals third, CTA reveals fourth/last
                per the brief). The flex layout still keeps them stacked
                vertically within the right column. */}
            <div className="order-3 flex w-full flex-col items-center gap-6 text-center lg:order-3 lg:col-span-4 lg:col-start-9 lg:ml-20 lg:max-w-[280px] lg:items-start lg:justify-self-start lg:text-left">
              <p className="reveal-item text-[16px] font-normal leading-[1.4] text-zinc-100 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)] lg:text-[17px] lg:text-zinc-200 lg:[text-shadow:0_0_24px_rgba(0,0,0,0.35),0_0_48px_rgba(0,0,0,0.22)] xl:text-[18px]">
                The easiest way to pay off debt, manage bills, and get
                personalized financial answers - built for the way real people
                earn and spend.
              </p>
              <a
                href="#cta"
                className="reveal-item inline-flex items-center gap-2 rounded-[10px] bg-zinc-50 px-5 py-3 text-[14px] font-normal text-[#0E1014]"
              >
                Get the App
                <span className="text-zinc-500">→</span>
              </a>
            </div>
          </div>
        </RevealStack>
      </section>

      <div className="flex flex-col gap-3 p-3">
      {/* ============================================================
          3. § 02 - BENTO PAIR (cool portrait / monochrome chat panel)
         ============================================================ */}
      {/* Mobile: panels stack and each gets its own min-height (via children below).
          md+: section is locked to viewport height so the two columns share it. */}
      <RevealStack>
      <section className="grid w-full grid-cols-1 gap-3 md:h-[100vh] md:min-h-[760px] md:grid-cols-2">
        {/* Left: cool-toned portrait with overlay copy */}
        <div className="reveal-item relative min-h-[600px] overflow-hidden rounded-3xl md:min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTOS.bentoPortrait}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div className="relative z-10 flex h-full flex-col justify-end gap-4 p-10 md:p-14">
            <DebtPayoffSequence />
            <h3 className="text-[34px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
              Get your debt off your mind.
            </h3>
            <p className="max-w-[420px] text-[15px] leading-[1.55] text-white/70">
              Clerkie negotiates and tracks your payoff plan, adjusting as life
              moves. No more anxiety or mental math.
            </p>
          </div>
        </div>

        {/* Right: photo background + frosted-glass chat panel overlay */}
        <div className="reveal-item relative min-h-[600px] overflow-hidden rounded-3xl md:min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTOS.personalizedPortrait}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Subtle uniform dark wash - knocks the photo back just enough
              for the chat bubbles + headline to read without losing the
              warmth of the underlying image. */}
          <div className="absolute inset-0 bg-black/30" />
          {/* Soft bottom gradient just for the headline area. */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 md:p-14">
            <AnimatedChatPanel />

            <div className="mt-4 flex flex-col gap-3">
              <h3 className="text-[34px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                More personalized than most apps.
              </h3>
              <p className="max-w-[420px] text-[15px] leading-[1.55] text-white/75">
                Clerkie&apos;s always learning about you and your spending - so
                money conversations feel personal (with real personality).
              </p>
            </div>
          </div>
        </div>
      </section>
      </RevealStack>

      {/* ============================================================
          5. § 03 - LIVE TICKER (replaces the static "Crush your debt 70%")
         ============================================================ */}
      {/* No <Reveal> wrapper here intentionally - the savings ticker is
          a high-contrast dark gradient section with bright white digits,
          and the .reveal opacity-fade made the digits visible before the
          dark background read as solid on mobile (looked like content
          "appeared first, background after"). Letting the section paint
          as one unit when scrolled into view eliminates that perception. */}
      <LiveSavingsTicker />

      {/* ============================================================
          6. § 04 - BENTO PAIR (bills dashboard / dark testimonial)
         ============================================================ */}
      {/* Same pattern as § 02: panels get tall min-heights on mobile, share viewport on md+ */}
      <RevealStack>
      <section className="grid w-full grid-cols-1 gap-3 md:h-[100vh] md:min-h-[760px] md:grid-cols-2">
        {/* Left: photo background + frosted-glass bills chat overlay
            (mirrors the §02 "More personalized" treatment). */}
        {/* order-1 on mobile so the bills panel stacks first; reverts to source order on md+ */}
        <div className="reveal-item relative order-1 min-h-[760px] overflow-hidden rounded-3xl md:order-none md:min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTOS.billsPortrait}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Subtle uniform dark wash + soft bottom gradient for headline
              legibility (same recipe as §02). */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-between p-10 md:p-14">
            <AnimatedBillsChatPanel />

            {/* 16px buffer below the bills UI on mobile (justify-between collapses). */}
            <div className="mt-4 flex flex-col gap-3">
              <h3 className="text-[34px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                Every bill, paid on time.
              </h3>
              <p className="max-w-[420px] text-[15px] leading-[1.55] text-white/75">
                Clerkie watches your bills, due dates, and balances - and gives
                you a heads-up before anything slips.
              </p>
            </div>
          </div>
        </div>

        {/* Right: dark testimonial portrait */}
        {/* order-2 on mobile so it stacks below the bills panel; reverts on md+ */}
        <div className="reveal-item relative order-2 min-h-[600px] overflow-hidden rounded-3xl md:order-none md:min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PHOTOS.testimonialPortrait}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/0" />
          <CreditScoreSequence />
          <div className="relative z-10 flex h-full flex-col justify-end gap-4 p-10 md:p-14">
            <h3 className="text-[34px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
              Watch your credit climb.
            </h3>
            <p className="max-w-[420px] text-[15px] leading-[1.55] text-white/70">
              Clerkie handles negotiations and disputes - every win flows
              straight into your score.
            </p>
          </div>
        </div>
      </section>
      </RevealStack>

      {/* ============================================================
          6.5 § 05 - COVERAGE (categories grid, ported from /members)
         ============================================================ */}
      <RevealStack>
      <section className="w-full overflow-hidden rounded-3xl bg-[#0E1014]">
        <div className="px-6 pb-20 pt-20 sm:px-10 sm:pb-24 sm:pt-24 md:px-16 md:pb-28 md:pt-28">
          <div className="mb-10 flex max-w-[720px] flex-col gap-4 sm:gap-6 lg:mb-16">
            <span className="reveal-item text-[13px] font-medium tracking-[0.06em] text-[#5EEAD4]">
              COVERAGE
            </span>
            <h2 className="reveal-item text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl md:text-[52px] lg:text-[56px]">
              Every kind of debt.{" "}
              <span className="text-white/50">One quiet app.</span>
            </h2>
            <p className="reveal-item max-w-[540px] text-base leading-[1.55] tracking-[-0.005em] text-white/60 lg:text-[17px]">
              Whether it&apos;s a hospital bill, a car payment, or a maxed-out
              card, Clerkie handles the negotiation, the paperwork, and the
              follow-through.
            </p>
          </div>

          {/* Separated glass cards with cursor-tracked tilt + sheen.
              Replaces the prior single-bordered 2x3 grid; each card
              now stands on its own with a subtle 3D-tilt hover that
              follows the cursor and a radial sheen highlight that
              rides under it (see ./CoverageCards.tsx). */}
          <CoverageCards categories={CATEGORIES} />
        </div>
      </section>
      </RevealStack>

      {/* ============================================================
          7. CTA - full-bleed dark photo + signup
         ============================================================ */}
      <RevealStack>
      <section
        id="cta"
        className="relative h-[80vh] min-h-[640px] w-full overflow-hidden rounded-3xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PHOTOS.ctaBackdrop}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E1014]/40 via-[#0E1014]/60 to-[#0E1014]/90" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center gap-8 px-10 text-center md:px-16">
          <h2 className="reveal-item max-w-[820px] text-[64px] font-medium leading-[1.05] tracking-[-0.03em] text-white md:text-[80px]">
            Solve your debt.{" "}
            <span className="text-white/50">Get back to living.</span>
          </h2>
          <p className="reveal-item max-w-[520px] text-[17px] leading-[1.55] text-white/70">
            The easiest way to pay off debt, manage bills, and get personalized
            financial answers.
          </p>
          <a
            href="#"
            className="reveal-item flex items-center rounded-full bg-zinc-50 px-8 py-4 text-base font-medium tracking-[-0.005em] text-[#0E1014]"
          >
            Get the App
          </a>
        </div>
      </section>
      </RevealStack>
      </div>

      {/* ============================================================
          8. FOOTER
         ============================================================ */}
      <footer className="border-t border-white/[0.08] bg-[#0E1014]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-10 py-16 md:px-16">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div className="flex max-w-[320px] flex-col items-start gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/clerkie-wordmark.svg" alt="Clerkie" className="h-[22px] w-auto" />
              <p className="text-sm leading-[1.55] text-zinc-500">
                A quieter way to handle the money side of life. Built for people,
                not credit-card algorithms.
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-10 sm:grid-cols-3 md:w-auto md:gap-20">
              <FooterCol title="PRODUCT" links={[
                { label: "For members", href: "/members", active: true },
                { label: "For companies", href: "/companies" },
                { label: "Get the app" },
              ]} />
              <FooterCol title="COMPANY" links={[
                { label: "About" },{ label: "Press" },{ label: "Careers" },{ label: "Support" },
              ]} />
              <FooterCol title="LEGAL" links={[
                { label: "Privacy" },{ label: "Terms of Service" },
                { label: "Do not sell my info" },{ label: "Disclosures" },
              ]} />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/[0.06] pt-6">
            <span className="font-mono text-xs text-zinc-600">© 2025 Henry Labs Inc. · /members</span>
            <div className="flex items-center gap-2">
              <span className="block h-1.5 w-1.5 rounded-full bg-[#5EEAD4]" style={{ boxShadow: "0 0 10px rgba(94,234,212,0.7)" }} />
              <span className="text-xs font-medium text-zinc-500">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */

/* ============================================================
   CATEGORIES GRID - § 05 (ported from /members)
   ============================================================ */

const CATEGORIES = [
  {
    title: "Credit Cards",
    desc: "Lower your APR, consolidate balances, and stop interest from eating your paycheck.",
    statLabel: "AVG. SAVED",
    statValue: "$3,820",
    icon: CreditCardIcon,
  },
  {
    title: "Student Loans",
    desc: "Federal, private, refinance - we walk you through every payoff path with the math up front.",
    statLabel: "AVG. SAVED",
    statValue: "$9,420",
    icon: Mortarboard01Icon,
  },
  {
    title: "Personal Loans",
    desc: "Negotiate rates, prepay strategically, or fold them into a smarter consolidation plan.",
    statLabel: "AVG. SAVED",
    statValue: "$2,140",
    icon: MoneyBag01Icon,
  },
  {
    title: "Medical Debt",
    desc: "Hospital and dental bills are negotiable. We dispute charges and settle for less.",
    statLabel: "AVG. SAVED",
    statValue: "$4,260",
    icon: StethoscopeIcon,
  },
  {
    title: "Auto Loans",
    desc: "Refinance for a lower rate or restructure when payments are squeezing your budget.",
    statLabel: "AVG. SAVED",
    statValue: "$2,890",
    icon: Car01Icon,
  },
  {
    title: "Boost Your Credit",
    desc: "Dispute errors, build positive history, and add tradelines that move your score quickly.",
    statLabel: "AVG. LIFT",
    statValue: "+84 pts",
    icon: ChartUpIcon,
  },
];


function FooterCol({ title, links }: { title: string; links: Array<{ label: string; active?: boolean; href?: string }> }) {
  return (
    <div className="flex flex-col gap-5">
      <span className="text-[11px] font-semibold tracking-[0.08em] text-zinc-600">{title}</span>
      {links.map((l) =>
        l.href ? (
          <Link key={l.label} href={l.href} className={`text-[15px] transition-colors hover:text-zinc-50 ${l.active ? "font-semibold text-zinc-100" : "font-normal text-zinc-500"}`}>
            {l.label}
          </Link>
        ) : (
          <span key={l.label} className={`text-[15px] ${l.active ? "font-semibold text-zinc-100" : "font-normal text-zinc-500"}`}>{l.label}</span>
        )
      )}
    </div>
  );
}
