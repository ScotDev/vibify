"use client";
import { useState } from "react";
import Button from "@/app/components/Button";
import {
  SliderInput,
  LocalSearchInput,
  SpotifySearchInput,
} from "@/app/components/Input";

import { useRouter } from "next/navigation";

interface vibe {
  name: string;
  description: string;
  tracks: string[];
  genres: string[];
  tempo: number;
  popularity: number;
  totalTracks: number;
}

export default function ConfigurationForm({
  seed,
  vibe,
}: {
  seed: string;
  vibe: vibe;
}) {
  const router = useRouter();

  const [selectedTracks, setSelectedTracks] = useState([] as any[]);
  const [selectedGenres, setSelectedGenres] = useState(vibe.genres);
  const [tempoValue, setTempoValue] = useState(vibe.tempo);
  // const [energyValue, setEnergyValue] = useState(20);
  const [popularityValue, setPopularityValue] = useState(vibe.popularity);
  const [totalTracksValue, setTotalTracksValue] = useState(vibe.totalTracks);

  const handleTempoChange = (e: any) => {
    setTempoValue(e.target.value);
  };

  const handlePopularityChange = (e: any) => {
    setPopularityValue(e.target.value);
  };
  // const handleEnergyChange = (e: any) => {
  //   setEnergyValue(e.target.value);
  // };
  const handleTotalTracksChange = (e: any) => {
    setTotalTracksValue(e.target.value);
  };

  const handleTrackSelect = (value: any) => {
    if (selectedGenres.length + selectedTracks.length >= 5) {
      alert("You can only select a maximum of 5 genres and tracks combined");
      return;
    }
    setSelectedTracks([...selectedTracks, value.id]);
  };

  const handleGenreSelect = (value: string) => {
    console.log(value);
    if (selectedGenres.length + selectedTracks.length >= 5) {
      alert("You can only select a maximum of 5 genres and tracks combined");
      return;
    }
    setSelectedGenres([...selectedGenres, value]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    if (selectedGenres.length === 0) {
      alert("Please select at least one genre");
      return;
    }

    router.push(
      `/step3?seed=${seed}&genres=${selectedGenres.join(
        ","
      )}&tracks=${selectedTracks.join(
        ","
      )}&tempo=${tempoValue}&popularity=${popularityValue}&totaltracks=${totalTracksValue}
      `
    );
  };
  // &energy=${energyValue}

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <div className="mb-4">
        <h1 className="text-3xl">Adjust the vibe</h1>
        <h2 className="text-xl  py-6">
          The chosen vibe is
          <span className="font-bold capitalize"> {vibe.name}</span>
        </h2>
        {/* Redo this with grid cols set to repeat with a max width of w-96 - when there are more inputs */}
        <div className="bg-neutral-800 shadow-lg rounded-lg p-6 mt-4 xs:h-auto sm:h-auto md:h-96 xl:h-auto">
          <h3 className="text-xl">Set the tone</h3>
          <div className="xs:flex xs:flex-col xs:gap-2 sm:flex sm:flex-col md:grid md:grid-cols-2 sm:gap-6 gap-12 ">
            <div className="pt-6 xs:w-full w-full h-60 relative">
              <LocalSearchInput
                title="Seed genres"
                placeholder="House, Techno, Country"
                preselected={vibe.genres}
                handleResultSelect={handleGenreSelect}
                endpoint="/api/genres"
              />
            </div>
            <div className="pt-6 xs:w-full w-full h-60 relative">
              <SpotifySearchInput
                title="Seed tracks"
                placeholder="Efecto, Crazy In Love, CUFF IT"
                handleResultSelect={handleTrackSelect}
                endpoint="/api/tracks"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12 bg-neutral-800 shadow-lg rounded-lg p-6">
        <h3 className="text-xl">Finer details</h3>
        <div className="pt-6 flex flex-wrap gap-12 ">
          <SliderInput
            title="Tempo (bpm)"
            onChange={(e) => handleTempoChange(e)}
            value={tempoValue}
            min={30}
            max={200}
            step={5}
          />
          <SliderInput
            title="Number of tracks"
            onChange={(e) => handleTotalTracksChange(e)}
            value={totalTracksValue}
            min={5}
            max={100}
          />
          <SliderInput
            title="Popularity"
            onChange={(e) => handlePopularityChange(e)}
            value={popularityValue}
            min={0}
            max={100}
            step={10}
          />
        </div>
      </div>
      <Button title="Confirm" type="submit" />
    </form>
  );
}
