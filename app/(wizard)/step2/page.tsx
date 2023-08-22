"use client";

import Button from "@/app/components/Button";
import ConfigurationForm from "@/app/components/ConfigurationForm";
import { TagInput, SliderInput, Tag } from "@/app/components/Input";
import Link from "next/link";

import { useState } from "react";

export default function page({
  searchParams,
}: {
  searchParams: { preseed: string };
}) {
  const preseed = searchParams.preseed;

  // const [tempoValue, setTempoValue] = useState(85);
  // const handleTempoChange = async (e: any) => {
  //   setTempoValue(e.target.value);
  // };
  // const [energyValue, setEnergyValue] = useState(20);
  // const handleEnergyChange = async (e: any) => {
  //   setEnergyValue(e.target.value);
  // };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   console.log(tempoValue);
  //   console.log("submit");
  // };
  return (
    <>
      <ConfigurationForm seed={preseed}></ConfigurationForm>
    </>
  );
}
