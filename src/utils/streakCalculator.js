import {getTodayString} from './dateUtils';

/**
 * Calculates the current streak from an array of completed date strings.
 * A streak is broken if any day is missed between completions.
 * The streak counts backwards from today (or yesterday if today isn't completed yet).
 */
export const calculateStreak = completedDates => {
  if (!completedDates || completedDates.length === 0) {
    return 0;
  }

  const sorted = [...completedDates].sort().reverse();
  const today = getTodayString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split('T')[0];

  // Streak must include today or yesterday to be active
  if (sorted[0] !== today && sorted[0] !== yesterdayString) {
    return 0;
  }

  let streak = 1;
  for (let i = 0; i < sorted.length - 1; i++) {
    const current = new Date(sorted[i]);
    const next = new Date(sorted[i + 1]);
    const diffDays = Math.round((current - next) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Returns the completion rate for the current week (Mon-Sun).
 */
export const getWeeklyCompletionRate = completedDates => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
  const mondayStr = monday.toISOString().split('T')[0];

  const thisWeekCompletions = completedDates.filter(d => d >= mondayStr);
  const daysElapsed = ((dayOfWeek + 6) % 7) + 1;

  return {
    completed: thisWeekCompletions.length,
    total: daysElapsed,
    percentage: Math.round((thisWeekCompletions.length / daysElapsed) * 100),
  };
};
