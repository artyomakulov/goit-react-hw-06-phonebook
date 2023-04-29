// import { configureStore } from '@reduxjs/toolkit';
// import { contactSlice } from './contacts/slice';
// import {filterReducer} from './filter/slice'

// export const store = configureStore({
//   reducer: {
//     contacts: contactSlice.reducer,
//     filter: filterReducer
//   },
// });

// console.log('contactSlice', contactSlice);

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { contactSlice } from './contacts/slice';
import { filterSlice } from './filter/slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  contacts: contactSlice.reducer,
  filter: filterSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
