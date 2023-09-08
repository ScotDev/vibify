"use client";
import { useRouter } from "next/navigation";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/supabase";

import { hasCookie, deleteCookie } from "cookies-next";

export default function Button() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const oneDay = 24 * 60 * 60 * 1000;
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    const hasAccessToken = hasCookie("providerAccessToken", {
      maxAge: 3600,
      secure: true,
    });
    // router.refresh();
    if (!error) {
      deleteCookie("providerRefreshToken", {
        maxAge: oneDay * 365,
        secure: true,
      });

      if (hasAccessToken) {
        deleteCookie("providerAccessToken");
      }
      console.log("Signed out, cookies removed");
      router.refresh();
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
