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
});

const poppins = Poppins({
	subsets: ["latin"],
	variable: "--font-poppins",
	weight: ["400", "500", "600", "700"], // optional: choose the weights you need
});

const DmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-dm_sans",
	weight: ["400", "500", "600", "700"], // optional: choose the weights you need
});

export const metadata: Metadata = {
  title: "NIIRIC",
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
					{/* <SessionProvider> */}
					<ToastContainer limit={5} />
					{children}
					{/* </SessionProvider> */}
				</ReduxProvider>
			</body>
		</html>
	);
}
