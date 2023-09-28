import "./globals.css";
import type { Metadata } from "next";
// import { Analytics } from "@vercel/analytics/react";
import { DM_Sans } from "next/font/google";
import Navbar from "./components/Navbar";
import spotify_logo from "@/public/Spotify_Logo_RGB_White.png";
import Image from "next/image";
const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vibify - Home",
  description: "Bring your vibes to your playlists",
};

// This is a temporary bug fix. Supabase doesn't work properly with SSG - watching github issue for fix
export const dynamic = "force-dynamic";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/supabase";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getSession();
  return (
    <html lang="en">
      <body className={dm_sans.className}>
        <Navbar data={data} />
        <main className="flex min-h-screen flex-col justify-between xs:px-4 sm:px-12 md:px-24">
          {children}
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
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
