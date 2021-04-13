import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

export default function configureAppStore () {
  const store = configureStore({
    reducer: rootReducer
  });

  return store;
};
