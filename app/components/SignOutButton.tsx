"use client";
import { useRouter } from "next/navigation";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/supabase";

export default function Button() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // router.refresh();
    console.log("signed out");
    router.push(location.origin);
  };
  return (
    <button
      className="bg-neutral-200 w-fit py-2 px-4 rounded-md cursor-pointer"
      onClick={handleSignOut}
    >
      <p className="font-bold text-center text-neutral-950">Log out</p>
    </button>
  );
}
