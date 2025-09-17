import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	persistReducer,
	persistStore,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { nirricApi } from "./features/api";
import { authReducer, reportReducer } from "./slices";

// import { setupListeners } from "@reduxjs/toolkit/dist/query";

const persistConfig = {
	key: "cart",
	storage,
	whitelist: [],
};

const rootReducer = combineReducers({
	auth: authReducer,
	reports: reportReducer,
	[nirricApi.reducerPath]: nirricApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   // reducer: {
//   //   auth: authReducer,
//   // },
// });

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(nirricApi.middleware),
});

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
