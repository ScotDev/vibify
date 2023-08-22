"use client";
import { useState } from "react";
import Button from "@/app/components/Button";
import { TagInput, SliderInput, Tag } from "@/app/components/Input";
import Link from "next/link";

export default function ConfigurationForm({ seed }: { seed: string }) {
  const [tempoValue, setTempoValue] = useState(85);
  const handleTempoChange = async (e: any) => {
    setTempoValue(e.target.value);
  };
  const [energyValue, setEnergyValue] = useState(20);
  const handleEnergyChange = async (e: any) => {
    setEnergyValue(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(tempoValue);
    console.log("submit");
  };
  return (
    <form
      className="flex flex-col gap-12 w-full justify-center"
      onSubmit={handleSubmit}
    >
      <div>
        <h1 className="text-3xl">Adjust the vibe</h1>
        <h2 className="text-xl capitalize py-6">
          Chosen vibe is <span className="font-bold">{seed}</span>
        </h2>

        <div className="flex gap-12">
          <div className="pt-6">
            <TagInput title="tracks" />
            <div className="flex flex-wrap gap-2 pt-2">
              <Tag title="Coco Chanel" />
              <Tag title="CUFF IT" />
            </div>
          </div>
          <div className="pt-6">
            <TagInput title="genres" />
            <div className="flex flex-wrap gap-2 pt-2">
              <Tag title="Coco Chanel" />
              <Tag title="CUFF IT" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-xl">Finer details</h3>
        <div className="pt-6">
          <SliderInput
            title="Tempo (bpm)"
            onChange={(e) => handleTempoChange(e)}
            value={tempoValue}
            min={30}
            max={200}
          />
          <SliderInput
            title="Energy"
            onChange={(e) => handleEnergyChange(e)}
            value={energyValue}
            min={0}
            max={100}
          />
        </div>
      </div>
      <Link href="/step3">
        <Button title="Confirm" type="submit" />
      </Link>
    </form>
  );
}
