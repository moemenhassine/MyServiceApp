import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./features/AuthReducer";
import PostSlice from "./features/PostReducer";

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
 
  import AsyncStorage from '@react-native-async-storage/async-storage';

  const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    //blacklist: ['counter'],
    whitelist: ['auth'],
  };
  const reducers = combineReducers({
    
    auth: AuthSlice,
    posts : PostSlice

    
  });
  
  const persistedReducer = persistReducer(persistConfig, reducers);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
//   // .concat(logger),
// });


export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        serializableCheck: false,
      }),
});
export const persistor = persistStore(store);