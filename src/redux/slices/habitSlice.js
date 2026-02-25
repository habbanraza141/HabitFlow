import {createSlice} from '@reduxjs/toolkit';
import {calculateStreak} from '../../utils/streakCalculator';
import {getTodayString} from '../../utils/dateUtils';

const initialState = {
  habits: [],
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    addHabit: (state, action) => {
      state.habits.unshift(action.payload);
    },

    deleteHabit: (state, action) => {
      state.habits = state.habits.filter(h => h.id !== action.payload);
    },

    toggleHabitCompletion: (state, action) => {
      const habit = state.habits.find(h => h.id === action.payload);
      if (!habit) {
        return;
      }

      const today = getTodayString();
      const alreadyCompleted = habit.completedDates.includes(today);

      if (alreadyCompleted) {
        habit.completedDates = habit.completedDates.filter(d => d !== today);
      } else {
        habit.completedDates.push(today);
      }

      habit.streakCount = calculateStreak(habit.completedDates);
    },

    updateHabit: (state, action) => {
      const index = state.habits.findIndex(h => h.id === action.payload.id);
      if (index !== -1) {
        state.habits[index] = {...state.habits[index], ...action.payload};
      }
    },

    // Placeholder: load habits from AsyncStorage / Firebase
    setHabits: (state, action) => {
      state.habits = action.payload;
    },
  },
});

export const {
  addHabit,
  deleteHabit,
  toggleHabitCompletion,
  updateHabit,
  setHabits,
} = habitSlice.actions;

export default habitSlice.reducer;
