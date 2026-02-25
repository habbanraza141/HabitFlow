import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import habitReducer from './slices/habitSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    habits: habitReducer,
    theme: themeReducer,
  },
  // Middleware placeholder for future persistence (redux-persist, etc.)
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
