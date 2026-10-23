import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.layer.css";
import "./globals.css";
import { UserContextProvider } from "@/context/UserContext";
import ToastProvider from "@/module/ToasterProvider";
import { RefreshContextProvider } from "@/context/RefreshContext";
import { Footer } from "@/module/Footer";
import { MantineProvider } from "@mantine/core";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Minggat Dulu",
	description: "Minggat Dulu Personal Project",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<MantineProvider>
					<UserContextProvider>
						<RefreshContextProvider>
							<ToastProvider />
							{children}
							<Footer />
						</RefreshContextProvider>
					</UserContextProvider>
				</MantineProvider>
			</body>
		</html>
	);
}
