import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { Database } from "@/supabase";

interface vibe {
  name: string;
  description: string;
  tracks: string[];
  genres: string[];
  tempo: number;
  popularity: number;
  totalTracks: number;
}

import ConfigurationForm from "@/app/components/ConfigurationForm";

export default async function page({
  searchParams,
}: {
  searchParams: { seed: string };
}) {
  const seed = searchParams.seed;
  let vibe: vibe = {
    name: seed,
    description: "Default",
    tracks: [],
    genres: [],
    tempo: 85,
    popularity: 90,
    totalTracks: 20,
  };

  // Process seed here using switch statement
  // to determine which vibe (preset) to use

  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase.auth.getSession();
  if (!data?.session) {
    return redirect("/login");
  }

  const accessToken = cookies().get("providerAccessToken")?.value;

  if (!accessToken) {
    console.log("No access token");

    redirect(`/token?redirect_URL=step2&preset=${seed}`);
  }

  switch (seed) {
    case "running":
      vibe = {
        ...vibe,
        description: "Running",
        tracks: [],
        genres: ["drum-and-bass", "edm", "electronic", "garage"],
        tempo: 140,
        popularity: 100,
        totalTracks: 30,
      };
      break;
    case "party":
      vibe = {
        ...vibe,
        description: "Party time",
        tracks: [],
        genres: ["dance", "funk", "party"],
        tempo: 100,
        popularity: 100,
        totalTracks: 40,
      };
      break;
    case "focus":
      vibe = {
        ...vibe,
        description: "Time to focus up",
        tracks: [],
        genres: ["electronic", "progressive-house", "deep-house"],
        tempo: 95,
        popularity: 90,
        totalTracks: 40,
      };
      break;
    case "hip-hop":
      vibe = {
        ...vibe,
        description: "Let's chill",
        tracks: [],
        genres: ["hip-hop", "r-n-b"],
        tempo: 85,
        popularity: 90,
        totalTracks: 30,
      };
      break;
    case "k-pop":
      vibe = {
        ...vibe,
        description: "Let's chill",
        tracks: [],
        genres: ["k-pop"],
        tempo: 110,
        popularity: 100,
        totalTracks: 30,
      };
      break;
    case "reggaeton":
      vibe = {
        ...vibe,
        description: "Vamos",
        tracks: [],
        genres: ["reggaeton"],
        tempo: 95,
        popularity: 100,
        totalTracks: 30,
      };
      break;

    default:
      break;
  }

  return (
    <>
      <ConfigurationForm seed={seed} vibe={vibe} />
    </>
  );
}
