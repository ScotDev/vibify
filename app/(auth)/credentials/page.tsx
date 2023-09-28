"use client";

import Credentials from "@/app/components/Credentials";

export default function page() {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Credentials />
    </>
  );
}
