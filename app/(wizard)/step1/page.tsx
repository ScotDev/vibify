import { redirect } from "next/navigation";

import VibeCard from "@/app/components/VibeCard";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/supabase";

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getSession();

  if (!data?.session) {
    redirect("/login");
  }
  return (
    <div>
      <h1>Choose a vibe</h1>
      {/* <div className="md:flex md:justify-normal grid grid-cols-2 gap-6 lg:gap-12 pt-12 md:pt-24 w-full flex-wrap"> */}
      <div className="xs:grid-cols-2 flex flex-wrap w-full gap-6 pt-12">
        <VibeCard title="running" />
        <VibeCard title="party" />
        <VibeCard title="focus" />
        <VibeCard title="hip hop" />
        <VibeCard title="k-pop" />
        <VibeCard title="reggaeton" />
        <VibeCard title="custom" />
      </div>
    </div>
  );
}
