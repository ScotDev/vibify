import { redirect } from "next/navigation";

import VibeCard from "@/app/components/VibeCard";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/supabase";

export default async function page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getSession();

  if (!data.session?.user) {
    return redirect("/login");
  }
  return (
    <div>
      <h1>Choose a vibe</h1>
      <div className="flex gap-12 pt-24 w-full flex-wrap">
        <VibeCard title="running" />
        <VibeCard title="disco" />
        <VibeCard title="focus" />
        <VibeCard title="hip hop" />
        <VibeCard title="k-pop" />
        <VibeCard title="custom" />
      </div>
    </div>
  );
}
