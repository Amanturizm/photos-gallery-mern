import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { usersReducer } from '../features/users/usersSlice';
import { photosReducer } from '../features/photos/photosSlice';
import { mainReducer } from '../features/main/mainSlice';

const usersPersistConfig = {
  key: 'cocktail:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  main: mainReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
  photos: photosReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
