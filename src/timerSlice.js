import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    seconds: parseInt(localStorage.getItem('timerSeconds')) || 0,
    isRunning: false,
  },
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    pauseTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.seconds = 0;
      state.isRunning = false;
      localStorage.removeItem('timerSeconds');// Clear the timer state from local storage
    },
    incrementTimer: (state) => {
      state.seconds += 1;
      localStorage.setItem('timerSeconds', state.seconds); // Update the timer state in local storage
    },
  },
});

export const {
  startTimer,
  pauseTimer,
  resetTimer,
  incrementTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
