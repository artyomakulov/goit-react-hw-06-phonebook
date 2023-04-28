import { createSlice } from '@reduxjs/toolkit';

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact(state, action) {
      state.push(action.payload);
    },
    deleteContact(state, action) {
      state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactSlice.actions;
