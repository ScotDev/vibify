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
      <h1 className="pt-12">Choose a vibe</h1>
      <div className="pt-12 card-grid">
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
