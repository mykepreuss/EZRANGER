import { describe, expect, it } from 'vitest';
import { createBlankTask, createDefaultState, evaluateTasks, formatDecimal } from './estimator.js';

describe('evaluateTasks', () => {
  it('computes totals, buffer, and estimate for valid decimals', () => {
    const tasks = [
      createBlankTask({ abp: '3', hp: '5' }),
      createBlankTask({ abp: '4.5', hp: '6' }),
    ];

    const result = evaluateTasks(tasks);

    expect(result.hasBlockingErrors).toBe(false);
    expect(result.totalAbp).toBeCloseTo(7.5);
    expect(result.buffer).toBeCloseTo(2.5);
    expect(result.estimate).toBeCloseTo(10.0);
  });

  it('flags rows where HP is lower than ABP or numbers are missing', () => {
    const tasks = [
      createBlankTask({ abp: '5', hp: '4' }),
      createBlankTask({ abp: '', hp: '' }),
      createBlankTask({ abp: '-1', hp: '2' }),
    ];

    const { taskSummaries, hasBlockingErrors } = evaluateTasks(tasks);

    expect(hasBlockingErrors).toBe(true);
    expect(taskSummaries[0].errors).toContain(
      'Highly Probable must be greater than or equal to Aggressive but Possible.',
    );
    expect(taskSummaries[1].errors).toEqual([
      'Enter a decimal value for Aggressive but Possible.',
      'Enter a decimal value for Highly Probable.',
    ]);
    expect(taskSummaries[2].errors).toContain('Aggressive but Possible must be zero or greater.');
  });

  it('requires at least two tasks before producing an estimate', () => {
    const tasks = [createBlankTask({ abp: '2', hp: '3' })];

    const result = evaluateTasks(tasks);

    expect(result.hasBlockingErrors).toBe(true);
    expect(result.issues[0]).toMatch(/at least 2 tasks/i);
    expect(result.estimate).toBeNull();
  });
});

describe('createDefaultState', () => {
  it('produces independent task instances', () => {
    const stateA = createDefaultState();
    const stateB = createDefaultState();

    expect(stateA).not.toBe(stateB);
    expect(stateA.tasks).toHaveLength(2);
    expect(stateA.tasks[0].id).not.toEqual(stateA.tasks[1].id);
    expect(stateA.tasks[0].id).not.toEqual(stateB.tasks[0].id);
  });
});

describe('formatDecimal', () => {
  it('formats finite numbers to fixed decimals and rejects invalid input', () => {
    expect(formatDecimal(3.14159, 2)).toEqual('3.14');
    expect(formatDecimal(NaN)).toBeNull();
  });
});

