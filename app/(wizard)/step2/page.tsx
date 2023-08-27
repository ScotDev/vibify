"use client";

import ConfigurationForm from "@/app/components/ConfigurationForm";

export default function page({
  searchParams,
}: {
  searchParams: { seed: string };
}) {
  const seed = searchParams.seed;

  return (
    <>
      <ConfigurationForm seed={seed}></ConfigurationForm>
    </>
  );
}
