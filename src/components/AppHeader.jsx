import { formatDecimal } from '../lib/estimator.js';

const StatPill = ({ label, value, unit }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
    <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{label}</p>
    <p className="mt-2 text-3xl font-semibold text-white">
      {value ?? '--'}
      {unit ? <span className="ml-1 text-base text-slate-300">{unit}</span> : null}
    </p>
  </div>
);

const AppHeader = ({ estimate, unit, buffer, totalHp }) => {
  const primaryEstimate = Number.isFinite(estimate) ? formatDecimal(estimate, 1) : null;
  const bufferValue = Number.isFinite(buffer) ? formatDecimal(buffer, 1) : null;
  const hpValue = Number.isFinite(totalHp) ? formatDecimal(totalHp, 1) : null;

  return (
    <section className="hero-card overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-700/40 via-slate-900/80 to-slate-950 p-8 text-white shadow-2xl shadow-ink-900/40">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live Range Engine
          </p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            EZRANGER helps you turn optimistic guesses into confident schedules.
          </h1>
          <p className="max-w-2xl text-base text-slate-200">
            Enter the <strong>Aggressive but Possible</strong> and <strong>Highly Probable</strong> estimates for every
            task. We combine them with the Atomic Object range formula (ΣABP&nbsp;+&nbsp;√Σ(HP−ABP)²) to surface a plan
            that already accounts for interruptions.
          </p>
        </div>
        <div className="shrink-0 rounded-2xl border border-white/20 bg-slate-900/50 px-6 py-5 text-center shadow-inner shadow-black/30">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Latest Estimate</p>
          <p className="mt-2 text-5xl font-semibold">{primaryEstimate ?? '--'}</p>
          <p className="text-sm text-slate-300">{unit}</p>
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatPill label="Straight Highly Probable Sum" value={hpValue} unit={unit} />
        <StatPill label="Shared Buffer" value={bufferValue} unit={unit} />
        <StatPill label="Communicate This Range" value={primaryEstimate} unit={unit} />
      </div>
    </section>
  );
};

export default AppHeader;
