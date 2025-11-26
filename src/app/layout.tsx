import type { Metadata } from "next";
import { DM_Sans, Poppins, Raleway } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import "./styles/embla.css";
import "./styles/animations.css";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "./ReduxProvider";

const raleway = Raleway({
	variable: "--font-raleway",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap"
});

const poppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	weight: ["400", "500", "600", "700"],
	display: "swap" 
});

const DmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-dm_sans",
	weight: ["400", "500", "600", "700"],
	display: "swap" 
});

export const metadata: Metadata = {
  title: "NIIRIC - The Nigerian Impact Investing Research Industry Collaborative",
  description: "Catalyzing Impact Through Research and Collaboration",
  icons: {
    icon: "/favicon.ico", 
  },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const userId = 'current-user-id';

	return (
		<html lang="en">
			 <head>
        {/* FlatIcon UIcons CDN */}
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css"
        />
      </head>
			<body
				className={`${raleway.variable} ${raleway.variable} ${poppins.variable} ${DmSans.variable} antialiased`}
			>
				<ReduxProvider>
					<ToastContainer limit={5} />
                        {children}
				</ReduxProvider>
			</body>
		</html>
	);
}
