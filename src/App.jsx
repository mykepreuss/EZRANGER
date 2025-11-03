import { useEffect, useMemo, useState } from 'react';
import AppHeader from './components/AppHeader.jsx';
import EstimateSummary from './components/EstimateSummary.jsx';
import Instructions from './components/Instructions.jsx';
import TaskList from './components/TaskList.jsx';
import UnitToggle from './components/UnitToggle.jsx';
import { createBlankTask, createDefaultState, evaluateTasks, storage } from './lib/estimator.js';

const useEstimatorState = () => {
  const [state, setState] = useState(() => storage.load() ?? createDefaultState());

  useEffect(() => {
    storage.save(state);
  }, [state]);

  return [state, setState];
};

const App = () => {
  const [state, setState] = useEstimatorState();

  const evaluation = useMemo(() => evaluateTasks(state.tasks), [state.tasks]);

  const handleTaskChange = (taskId, patch) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => (task.id === taskId ? { ...task, ...patch } : task)),
    }));
  };

  const handleTaskRemove = (taskId) => {
    setState((prev) => {
      if (prev.tasks.length <= 2) {
        return prev;
      }
      return {
        ...prev,
        tasks: prev.tasks.filter((task) => task.id !== taskId),
      };
    });
  };

  const handleAddTask = () => {
    setState((prev) => ({
      ...prev,
      tasks: [...prev.tasks, createBlankTask({ title: `Task ${prev.tasks.length + 1}` })],
    }));
  };

  const handleProjectTitleChange = (event) => {
    setState((prev) => ({
      ...prev,
      projectTitle: event.target.value,
    }));
  };

  const handleUnitChange = (nextUnit) => {
    setState((prev) => ({
      ...prev,
      unit: nextUnit,
    }));
  };

  const handleCalculate = () => {
    setState((prev) => {
      const nextEvaluation = evaluateTasks(prev.tasks);
      if (nextEvaluation.hasBlockingErrors) {
        return prev;
      }
      return {
        ...prev,
        lastCalculatedAt: new Date().toISOString(),
      };
    });
  };

  const handleReset = () => {
    storage.reset();
    setState(createDefaultState());
  };

  return (
    <div className="app-shell min-h-screen">
      <div className="pattern-overlay" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 lg:px-8">
        <AppHeader
          estimate={evaluation.estimate}
          unit={state.unit}
          buffer={evaluation.buffer}
          totalHp={evaluation.totalHp}
        />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <main className="space-y-6">
            <section className="card space-y-6">
              <header className="space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Project</p>
                <input
                  className="input text-3xl font-semibold text-white"
                  value={state.projectTitle}
                  onChange={handleProjectTitleChange}
                  placeholder="Project Title"
                />
                <div className="flex flex-wrap items-center gap-4">
                  <UnitToggle value={state.unit} onChange={handleUnitChange} />
                  <p className="text-sm text-slate-400">
                    Switch units anytime—values are stored exactly as you enter them.
                  </p>
                </div>
              </header>

              <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-200">
                <p className="font-semibold text-white">Why two numbers?</p>
                <p>
                  Aggressive but Possible assumes zero interruptions. Highly Probable bakes in meetings, reviews, and the
                  unknowns you already anticipate.
                </p>
              </div>

              <TaskList
                tasks={evaluation.taskSummaries}
                onTaskChange={handleTaskChange}
                onTaskRemove={handleTaskRemove}
              />

              <div className="flex flex-wrap gap-3">
                <button type="button" className="btn-ghost" onClick={handleAddTask}>
                  Add task
                </button>
                <button
                  type="button"
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={handleCalculate}
                  disabled={evaluation.hasBlockingErrors}
                  title={
                    evaluation.hasBlockingErrors
                      ? 'Complete at least two valid tasks to enable the calculation.'
                      : 'Run the buffered estimate.'
                  }
                >
                  Calculate
                </button>
              </div>
            </section>
          </main>

          <aside className="space-y-6">
            <EstimateSummary
              totalAbp={evaluation.totalAbp}
              totalHp={evaluation.totalHp}
              buffer={evaluation.buffer}
              estimate={evaluation.estimate}
              unit={state.unit}
              issues={evaluation.issues}
              hasBlockingErrors={evaluation.hasBlockingErrors}
              lastCalculatedAt={state.lastCalculatedAt}
              onReset={handleReset}
            />
            <Instructions />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default App;
