import { formatDecimal } from '../lib/estimator.js';

const Stat = ({ label, subLabel, value, unit }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur">
    <p className="text-[0.68rem] uppercase tracking-[0.18em] text-slate-300 leading-5 whitespace-normal">
      {label}
      {subLabel ? (
        <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-slate-500">{subLabel}</span>
      ) : null}
    </p>
    <p className="mt-2 text-2xl font-semibold text-white">
      {value ?? '--'}
      {unit ? <span className="ml-1 text-sm text-slate-400">{unit}</span> : null}
    </p>
  </div>
);

const EstimateSummary = ({
  totalAbp,
  totalHp,
  buffer,
  estimate,
  unit,
  issues = [],
  hasBlockingErrors,
  lastCalculatedAt,
  onReset,
}) => {
  const formatValue = (value) => (Number.isFinite(value) ? formatDecimal(value, 1) : null);
  const formattedEstimate = formatValue(estimate);
  const formattedBuffer = formatValue(buffer);
  const formattedAbp = formatValue(totalAbp);
  const formattedHp = formatValue(totalHp);

  return (
    <section className="card space-y-6 border border-white/10 bg-slate-950/70">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Projection</p>
          <h2 className="text-2xl font-semibold text-white">Range estimate</h2>
        </div>
        <button type="button" className="btn-ghost text-sm" onClick={onReset}>
          Reset data
        </button>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-700/40 via-slate-900/60 to-slate-950 p-6 text-white shadow-xl shadow-ink-900/30">
          <div className="relative z-10 space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-indigo-100/80">Communicate this</p>
            <p className="text-4xl font-semibold sm:text-5xl">
              {formattedEstimate ?? '--'}{' '}
              <span className="text-lg font-normal uppercase tracking-wide text-slate-200">{unit}</span>
            </p>
            <p className="text-sm text-slate-200">
              Atomic range = <span className="font-semibold">{formattedAbp ?? 'ΣABP'}</span> +{' '}
              <span className="font-semibold">{formattedBuffer ?? 'buffer'}</span>
            </p>
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -right-10 top-6 h-32 w-32 rounded-full bg-ink-500/40 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <Stat label="Aggressive but Possible" value={formattedAbp} unit={unit} />
          <Stat label="Highly Probable" value={formattedHp} unit={unit} />
          <Stat label="Buffer" value={formattedBuffer} unit={unit} />
        </div>
      </div>

      {hasBlockingErrors ? (
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-50">
          <p className="font-semibold">Still missing something.</p>
          <p className="text-amber-100">
            Fix the highlighted tasks and make sure you have at least two complete entries before running the
            calculation.
          </p>
          {issues.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-100">
              {issues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm text-emerald-50">
          <p>
            You’re estimating in <span className="font-semibold">{unit.toLowerCase()}</span>. Highly Probable totals help
            you contrast your “full-fat” timeline with EZRANGER’s buffered range ({formattedAbp ?? '--'} +{' '}
            {formattedBuffer ?? '--'} = {formattedEstimate ?? '--'}).
          </p>
        </div>
      )}

      {lastCalculatedAt ? (
        <p className="text-xs text-slate-500">
          Last calculated {new Date(lastCalculatedAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
        </p>
      ) : null}
    </section>
  );
};

export default EstimateSummary;
