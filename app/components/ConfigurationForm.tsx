"use client";
import { useState } from "react";
import Button from "@/app/components/Button";
import { TagInput, SliderInput, SearchInput } from "@/app/components/Input";

import { useRouter } from "next/navigation";

export default function ConfigurationForm({ seed }: { seed: string }) {
  const router = useRouter();

  const [selectedTracks, setSelectedTracks] = useState([] as string[]);
  const [selectedGenres, setSelectedGenres] = useState([] as string[]);
  const [tempoValue, setTempoValue] = useState(85);
  // const [energyValue, setEnergyValue] = useState(20);
  const [popularityValue, setPopularityValue] = useState(90);
  const [totalTracksValue, setTotalTracksValue] = useState(10);

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

  const handleTrackSelect = (value: string) => {
    setSelectedTracks([...selectedTracks, value]);
  };

  const handleGenreSelect = (value: string) => {
    console.log(value);
    setSelectedGenres([...selectedGenres, value]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");

    router.push(
      `/step3?seed=${seed}&tracks=${selectedTracks.join(
        ","
      )}&genres=${selectedGenres.join(
        ","
      )}&tempo=${tempoValue}&popularity=${popularityValue}&totaltracks=${totalTracksValue}
      `
    );
  };
  // &energy=${energyValue}

  return (
    <form
      className="flex flex-col gap-12 w-full justify-center"
      onSubmit={handleSubmit}
    >
      <div>
        <h1 className="text-3xl">Adjust the vibe</h1>
        <h2 className="text-xl  py-6">
          The chosen vibe is{" "}
          <span className="font-bold capitalize">{seed}</span>
        </h2>

        <div className="flex flex-wrap gap-12 ">
          <div className="pt-6 w-96">
            <TagInput
              title="tracks"
              onSelect={handleTrackSelect}
              placeholder="Coco Chanel, CUFF IT, Crazy In Love"
            />
            <div className="flex flex-wrap gap-2 pt-2"></div>
          </div>
          <div className="pt-6 w-96">
            <TagInput
              title="genres"
              onSelect={handleGenreSelect}
              placeholder="House, Techno, Country"
            />
          </div>
          <div className="pt-6 w-96">
            <SearchInput
              title="Seed genres"
              handleResultSelect={handleGenreSelect}
              endpoint="/api/test"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 ">
        <h3 className="text-xl">Finer details</h3>
        <div className="pt-6 flex flex-wrap gap-12 ">
          <SliderInput
            title="Tempo (bpm)"
            onChange={(e) => handleTempoChange(e)}
            value={tempoValue}
            min={30}
            max={200}
          />
          <SliderInput
            title="Number of tracks"
            onChange={(e) => handleTotalTracksChange(e)}
            value={totalTracksValue}
            min={5}
            max={100}
          />
          {/* <SliderInput
            title="Energy"
            onChange={(e) => handleEnergyChange(e)}
            value={energyValue}
            min={0}
            max={100}
          /> */}
          <SliderInput
            title="Popularity"
            onChange={(e) => handlePopularityChange(e)}
            value={popularityValue}
            min={0}
            max={100}
          />
        </div>
      </div>
      {/* <Link href="/step3"> */}
      <Button title="Confirm" type="submit" />
      {/* </Link> */}
    </form>
  );
}
