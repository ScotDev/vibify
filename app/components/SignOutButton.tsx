"use client";
import { useRouter } from "next/navigation";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/supabase";

export default function Button() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    // router.refresh();
    if (!error) {
      console.log("signed out");
      router.push("/login");
    }

    if (error) console.log(error);
  };
  return (
    <button className="btn" onClick={handleSignOut}>
      <p className="font-medium">Log out</p>
    </button>
  );
}
