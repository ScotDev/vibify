import Button from "@/app/components/Button";
import MediaItem from "@/app/components/MediaItem";

import { msToMinSec } from "@/app/utils/calc";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Database } from "@/supabase";

export default async function page({
  searchParams,
}: {
  searchParams: {
    seed: string;
    tracks: string;
    genres: string;
    energy: Number;
    tempo: Number;
    popularity: Number;
    totaltracks: Number;
  };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.auth.getSession();
  // const cookieStore = cookies();
  // const token = cookieStore.get("providerAccessToken")?.value;
  // console.log("page 3", cookieStore.getAll());

  const seed = searchParams.seed,
    tracks: string = searchParams.tracks,
    genres: string = searchParams.genres,
    energy: Number = searchParams.energy,
    tempo: Number = searchParams.tempo,
    popularity: Number = searchParams.popularity,
    totalTracks: Number = searchParams.totaltracks;

  const checkToken = async () => {
    const cookieStore = cookies();
    console.log(cookieStore.getAll());
    const hasAccessToken = cookieStore.get("providerAccessToken");
    const refreshToken = cookieStore.get("providerRefreshToken")?.value;
    if (hasAccessToken) {
      return {
        data: { access_token: cookieStore.get("providerAccessToken")?.value },
        error: null,
        status: 200,
      };
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/spotify?refreshtoken=${refreshToken}`
    );
    const { data, error, status } = await res.json();
    return { data, error, status };
  };

  // const spotifyToken = await checkToken();

  if (!data?.session) {
    return redirect("/login");
  }

  const accessToken = cookies().get("providerAccessToken")?.value;

  if (!accessToken) {
    console.log("No access token");
    // Missing state
    return redirect("/token?redirect_URL=step3");
  }

  const getSeedIDs = async (access_token: string) => {
    const options = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `https://api.spotify.com/v1/tracks?market=GB&ids=`,
      options
    );
    return await res.json();
  };

  const getRecommendations = async (access_token: string) => {
    const options = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };
    const genresParam = genres.length > 0 ? `&seed_genres=${genres}` : "";
    const tracksParam = tracks.length > 0 ? `&seed_tracks=${tracks}` : "";
    console.log(
      `https://api.spotify.com/v1/recommendations?limit=${totalTracks}${genresParam}${tracksParam}&target_tempo=${tempo}&target_popularity=${popularity}`,
      options
    );

    const res = await fetch(
      `https://api.spotify.com/v1/recommendations?limit=${totalTracks}${genresParam}${tracksParam}&target_tempo=${tempo}&target_popularity=${popularity}`,
      // &seed_tracks=${tracks}
      // `https://api.spotify.com/v1/recommendations?limit=${totalTracks}&market=GB&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA&target_tempo=${tempo}&target_energy=${

      options
    );
    if (!res.ok) {
      console.log("Error:", res);
      // return [];
    }
    return await res.json();
  };

  const getAudioFeatures = async (access_token: string, trackIDs: string[]) => {
    const options = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };
    if (!trackIDs) return Promise.resolve({ audio_features: [] });

    const res = await fetch(
      `https://api.spotify.com/v1/audio-features?ids=${trackIDs.join(",")}`,
      options
    );

    if (!res.ok) {
      console.log("Error:", res);
    }
    return await res.json();
  };

  // if (spotifyToken.error) return console.log(spotifyToken.error);

  const recommendations = await getRecommendations(accessToken as string);
  const audioFeatures = await getAudioFeatures(
    accessToken as string,
    recommendations?.tracks?.map((track: any) => track.id)
  );
  const totalDuration = recommendations?.tracks?.reduce(
    (a: any, b: any) => a + b.duration_ms,
    0
  );

  const totalTempo = audioFeatures.audio_features.reduce(
    (a: any, b: any) => a + b?.tempo,
    0
  );
  const averageTempo = Math.round(
    totalTempo / audioFeatures.audio_features.length
  );
  const totalEnergy = audioFeatures.audio_features.reduce(
    (a: any, b: any) => a + b?.energy,
    0
  );
  const averageEnergy = Math.round(
    (totalEnergy / audioFeatures.audio_features.length) * 100
  );

  return (
    // <div className="lg:pr-48">
    <div>
      <h1 className="text-3xl">Playlist</h1>
      <div className="flex gap-12 py-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm">Average bpm</p>
          <p className="">{averageTempo || 0}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm">Average energy</p>
          <p className="">{averageEnergy || 0}%</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm">Total duration</p>
          <p className="">{msToMinSec(totalDuration)}</p>
        </div>
        {/* <p>{seed}</p>
        <p>{tracks}</p>
        <p>{genres}</p>
        <p>{tempo.toString()}</p>
        <p>{energy.toString()}</p> */}
      </div>
      <Button title="Save playlist" />
      <div className="flex flex-col gap-8 py-12 ">
        {recommendations ? (
          recommendations.tracks?.map((track: any) => {
            return <MediaItem key={track.id} data={track} />;
          })
        ) : (
          <p>No tracks found</p>
        )}
      </div>
    </div>
  );
}
