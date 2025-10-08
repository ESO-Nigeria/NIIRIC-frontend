"use client";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store";

export default function ReduxProvider({
	children,
	session,
}: {
	children: React.ReactNode;
	session?: any;
}) {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<SessionProvider session={session}>{children}</SessionProvider>
			</PersistGate>
		</Provider>
	);
}
