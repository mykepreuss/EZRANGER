const instructions = [
  'Enter a descriptive project title.',
  'Break the work into at least two tasks.',
  'For each task, enter an Aggressive but Possible estimate (no delays).',
  'Add a Highly Probable estimate that includes interruptions and known risks.',
  'Choose whether you are estimating in hours or days.',
  'Click Calculate to generate a buffered range.',
];

const Instructions = () => (
  <section className="card space-y-5 border border-white/5 bg-gradient-to-b from-slate-900/70 to-slate-950/80">
    <header className="space-y-1">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Playbook</p>
      <h2 className="text-xl font-semibold text-white">How to get the tightest range</h2>
    </header>
    <p className="text-sm text-slate-300">
      Chunk work by real deliverables, then capture two numbers per task. EZRANGER turns that matrix into a buffered
      projection that assumes life happens.
    </p>
    <ol className="instruction-list text-sm">
      {instructions.map((text, index) => (
        <li key={text} className="flex gap-3">
          <span className="gradient-step">{index + 1}</span>
          <span className="step-text">{text}</span>
        </li>
      ))}
    </ol>
    <p className="text-xs text-slate-500">
      Formula inspired by{' '}
      <a
        href="https://spin.atomicobject.com/2009/01/14/making-better-estimates-range-estimates/"
        className="text-ink-200 underline decoration-dotted"
        target="_blank"
        rel="noreferrer"
      >
        Atomic Object
      </a>
      . Rebuilt with React + Tailwind in 2025.
    </p>
  </section>
);

export default Instructions;
