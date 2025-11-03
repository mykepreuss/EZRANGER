const formatLabel = (index) => `Task ${index + 1}`;

const TaskRow = ({ task, index, onChange, onRemove, disableRemove = false }) => {
  const handleFieldChange = (field) => (event) => {
    onChange(task.id, { [field]: event.target.value });
  };

  const taskLabel = formatLabel(index);

  return (
    <article
      className={`task-card space-y-4 border border-slate-800/80 bg-slate-900/70 p-5 backdrop-blur ${
        task.errors?.length ? 'ring-1 ring-red-500/40' : ''
      }`}
      aria-label={taskLabel}
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-ink-500/80 to-indigo-500/60 text-lg font-semibold text-white">
            {index + 1}
          </span>
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">{taskLabel}</p>
            <h3 className="text-lg font-semibold text-white">{task.title || 'Untitled Task'}</h3>
          </div>
        </div>
        <button
          type="button"
          className="btn-ghost h-10 px-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => onRemove(task.id)}
          disabled={disableRemove}
          aria-label={`Remove ${taskLabel}`}
        >
          Remove
        </button>
      </header>

      <label className="block space-y-1 text-sm" htmlFor={`title-${task.id}`}>
        <span className="text-slate-300">Task title</span>
        <input
          id={`title-${task.id}`}
          className="input"
          placeholder="Design API docs"
          value={task.title}
          onChange={handleFieldChange('title')}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1 text-sm" htmlFor={`abp-${task.id}`}>
          <span className="text-slate-300">Aggressive but Possible</span>
          <input
            id={`abp-${task.id}`}
            className={`input ${task.errors?.length ? 'input-error' : ''}`}
            type="number"
            step="0.1"
            inputMode="decimal"
            min="0"
            placeholder="e.g. 3.5"
            value={task.abp}
            onChange={handleFieldChange('abp')}
          />
        </label>
        <label className="block space-y-1 text-sm" htmlFor={`hp-${task.id}`}>
          <span className="text-slate-300">Highly Probable</span>
          <input
            id={`hp-${task.id}`}
            className={`input ${task.errors?.length ? 'input-error' : ''}`}
            type="number"
            step="0.1"
            inputMode="decimal"
            min="0"
            placeholder="e.g. 5.25"
            value={task.hp}
            onChange={handleFieldChange('hp')}
          />
        </label>
      </div>

      {task.errors && task.errors.length > 0 && (
        <ul className="space-y-1 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-100">
          {task.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default TaskRow;
