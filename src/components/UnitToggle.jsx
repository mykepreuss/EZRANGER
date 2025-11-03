const units = ['Hours', 'Days'];

const UnitToggle = ({ value, onChange }) => (
  <div className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 p-1 text-sm backdrop-blur">
    {units.map((unit) => {
      const isActive = unit === value;
      return (
        <button
          type="button"
          key={unit}
          onClick={() => onChange(unit)}
          className={`flex-1 rounded-xl px-4 py-2 font-semibold transition ${
            isActive ? 'bg-gradient-to-r from-ink-500 to-indigo-500 text-white shadow-lg shadow-indigo-900/40' : 'text-slate-300 hover:text-white'
          }`}
          aria-pressed={isActive}
        >
          {unit}
        </button>
      );
    })}
  </div>
);

export default UnitToggle;

