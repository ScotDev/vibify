// Next imports
import { cookies } from "next/headers";

// Local component imports
import SignOutButtonServer from "../components/SignOutButtonServer";

// Types
import type { Database } from "@/supabase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vibify - Profile",
  description: "Bring your vibes to your playlists",
};

// Third-party library imports
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getSession();
  return (
    <>
      {children}
      {data.session && <SignOutButtonServer />}
    </>
  );
}
