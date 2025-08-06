import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import "./styles/embla.css";
import "./styles/animations.css";

const raleway = Raleway({
	variable: "--font-raleway",
	subsets: ["latin"],
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
			<body className={`${raleway.variable} ${raleway.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
