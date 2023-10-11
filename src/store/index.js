import { combineReducers, configureStore } from '@reduxjs/toolkit'
import invoiceSlice from './invoice/invoiceSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    invoice: invoiceSlice
})

const blacklist = []

const persistConfig = {
  key: 'root',
  storage,
  blacklist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)