// "use client";

import Button from "@/app/components/Button";
import MediaItem from "@/app/components/MediaItem";

import { msToMinSec } from "@/app/utils/calc";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
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
    totaltracks: Number;
  };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getSession();

  const seed = searchParams.seed,
    tracks: string = searchParams.tracks,
    genres: string = searchParams.genres,
    energy: any = searchParams.energy,
    tempo: any = searchParams.tempo,
    totalTracks: any = searchParams.totaltracks;

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
    const res = await fetch(
      `https://api.spotify.com/v1/recommendations?limit=${totalTracks}&market=GB&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA&target_tempo=${tempo}&target_energy=${
        energy / 100
      }`,
      options
    );
    return await res.json();
  };

  const getAudioFeatures = async (access_token: string, trackIDs: string[]) => {
    const options = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(
      `https://api.spotify.com/v1/audio-features?ids=${trackIDs.join(",")}`,
      options
    );
    return await res.json();
  };

  const recommendations = await getRecommendations(
    data.session?.provider_token as string
  );
  const audioFeatures = await getAudioFeatures(
    data.session?.provider_token as string,
    recommendations.tracks.map((track: any) => track.id)
  );
  const totalDuration = recommendations.tracks.reduce(
    (a: any, b: any) => a + b.duration_ms,
    0
  );

  const totalTempo = audioFeatures.audio_features.reduce(
    (a: any, b: any) => a + b.tempo,
    0
  );
  const averageTempo = Math.round(
    totalTempo / audioFeatures.audio_features.length
  );
  const totalEnergy = audioFeatures.audio_features.reduce(
    (a: any, b: any) => a + b.energy,
    0
  );
  const averageEnergy = Math.round(
    (totalEnergy / audioFeatures.audio_features.length) * 100
  );

  // console.log(Math.round(averageEnergy * 10));
  console.log(recommendations);

  return (
    // <div className="lg:pr-48">
    <div>
      <h1 className="text-3xl">Playlist</h1>
      <div className="flex gap-12 py-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm">Average bpm</p>
          <p className="">{averageTempo}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm">Average energy</p>
          <p className="">{averageEnergy}%</p>
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
        {recommendations &&
          recommendations.tracks.map((track: any) => {
            return <MediaItem key={track.id} data={track} />;
          })}
      </div>
    </div>
  );
}
