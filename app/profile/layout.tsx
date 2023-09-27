import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vibify - Profile",
  description: "Bring your vibes to your playlists",
};

// Local component imports
import SignOutButtonServer from "../components/SignOutButtonServer";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <SignOutButtonServer />
    </>
  );
}
