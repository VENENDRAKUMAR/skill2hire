import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./Components/Navbar";
import FooterSection from "./Components/Footer";
import { Providers } from "./Provider/page"; // wrap children with session

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VBizGro JobBoard",
  description: "Cinematic recruiter-grade job board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* SessionProvider makes session available everywhere */}
     <Providers>
          <NavBar />
          {children}
          <FooterSection />
 </Providers>
      </body>
    </html>
  );
}
