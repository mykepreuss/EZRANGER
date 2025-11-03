const STORAGE_KEY = 'ezranger:v2';
const MIN_TASKS = 2;

const makeId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `task-${Math.random().toString(36).slice(2, 10)}`;
};

export const createBlankTask = (overrides = {}) => ({
  id: overrides.id ?? makeId(),
  title: overrides.title ?? 'Task Title',
  abp: overrides.abp ?? '',
  hp: overrides.hp ?? '',
});

export const createDefaultState = () => ({
  projectTitle: 'Project Title',
  unit: 'Hours',
  tasks: [createBlankTask(), createBlankTask()],
  lastCalculatedAt: null,
});

const parseDecimal = (value) => {
  if (value === undefined || value === null || `${value}`.trim() === '') {
    return null;
  }

  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const evaluateTasks = (tasks) => {
  const taskSummaries = [];
  let totalAbp = 0;
  let bufferVariance = 0;
  let totalHp = 0;
  let hasBlockingErrors = false;

  tasks.forEach((task) => {
    const abpValue = parseDecimal(task.abp);
    const hpValue = parseDecimal(task.hp);
    const errors = [];

    if (abpValue === null) {
      errors.push('Enter a decimal value for Aggressive but Possible.');
    }
    if (hpValue === null) {
      errors.push('Enter a decimal value for Highly Probable.');
    }

    if (abpValue !== null && abpValue < 0) {
      errors.push('Aggressive but Possible must be zero or greater.');
    }
    if (hpValue !== null && hpValue < 0) {
      errors.push('Highly Probable must be zero or greater.');
    }

    if (abpValue !== null && hpValue !== null && hpValue < abpValue) {
      errors.push('Highly Probable must be greater than or equal to Aggressive but Possible.');
    }

    const isValid = errors.length === 0;
    if (isValid) {
      totalAbp += abpValue;
      totalHp += hpValue;
      bufferVariance += Math.pow(hpValue - abpValue, 2);
    } else {
      hasBlockingErrors = true;
    }

    taskSummaries.push({
      ...task,
      abpValue,
      hpValue,
      errors,
      isValid,
    });
  });

  const structuralIssues = [];
  if (tasks.length < MIN_TASKS) {
    structuralIssues.push(`Add at least ${MIN_TASKS} tasks to calculate an estimate.`);
    hasBlockingErrors = true;
  }

  const buffer = hasBlockingErrors ? null : Math.sqrt(bufferVariance);
  const estimate = hasBlockingErrors ? null : Number((buffer + totalAbp).toFixed(1));

  return {
    taskSummaries,
    totalAbp,
    buffer,
    estimate,
    totalHp,
    issues: structuralIssues,
    hasBlockingErrors,
  };
};

export const formatDecimal = (value, digits = 1) => {
  if (!Number.isFinite(value)) {
    return null;
  }
  return value.toFixed(digits);
};

export const storage = {
  key: STORAGE_KEY,
  load: () => {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      return {
        projectTitle: parsed.projectTitle ?? 'Project Title',
        unit: parsed.unit === 'Days' ? 'Days' : 'Hours',
        tasks:
          Array.isArray(parsed.tasks) && parsed.tasks.length
            ? parsed.tasks.map((task) =>
                createBlankTask({
                  ...task,
                  id: task.id ?? makeId(),
                }),
              )
            : createDefaultState().tasks,
        lastCalculatedAt: parsed.lastCalculatedAt ?? null,
      };
    } catch (error) {
      console.warn('Unable to load estimator data, falling back to defaults.', error);
      return null;
    }
  },
  save: (data) => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Unable to persist estimator data.', error);
    }
  },
  reset: () => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.removeItem(STORAGE_KEY);
  },
};
