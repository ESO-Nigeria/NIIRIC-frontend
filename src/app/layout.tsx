import type { Metadata } from "next";
import { Raleway, Poppins, DM_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import "./styles/embla.css";
import "./styles/animations.css";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "./ReduxProvider";

const raleway = Raleway({
	variable: "--font-raleway",
	subsets: ["latin"],
	weight:["400", "500", "600", "700"]
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
};

// export async function generateMetadata({ params }): Promise<Metadata> {
//   // Example: Use params or fetch data here
//   const title = params?.slug ? `${params.slug}` : "Niiric";
//   return {
//     title,
//     description: "Dynamic description",
//   };
// }

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${raleway.variable} ${raleway.variable} ${poppins.variable} ${DmSans.variable} antialiased`}>
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
