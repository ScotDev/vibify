import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Navbar from "./components/Navbar";
import spotify_logo from "@/public/Spotify_Logo_RGB_White.png";
import Image from "next/image";
const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vibify - Home",
  description: "Bring your vibes to your playlists",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={dm_sans.className}>
        <Navbar />
        <main className="flex min-h-screen flex-col justify-between px-4 md:px-12 lg:px-24">
          {children}{" "}
          <div className="pt-24 pb-6 flex gap-2 items-center">
            <p className="text-xs">Made with data from</p>
            <Image
              height={72}
              width={72}
              placeholder="blur"
              src={spotify_logo}
              alt="Spotify Logo"
            />
          </div>
        </main>
      </body>
    </html>
  );
}
