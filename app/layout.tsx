import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Navbar from "./components/Navbar";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vibify - Home",
  description: "Bring your vibes to your playlists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dm_sans.className}>
        <Navbar />
        <main className="flex min-h-screen flex-col justify-between px-24">
          {children}
        </main>
      </body>
    </html>
  );
}
