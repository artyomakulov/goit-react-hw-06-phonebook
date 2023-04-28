import { configureStore } from '@reduxjs/toolkit';
import { contactSlice } from './contacts/slice';

export const store = configureStore({
  reducer: {
    contacts: contactSlice.reducer,
  },
});

console.log('contactSlice', contactSlice);
