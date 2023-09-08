"use client";

import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/supabase";
import { setCookie } from "cookies-next";

import { useSearchParams } from "next/navigation";

export default function Cookie() {
  const supabase = createClientComponentClient<Database>();

  const params = useSearchParams();
  const providerRefreshToken = params.get("providerRefreshToken");
  const providerAccessToken = params.get("providerAccessToken");

  const oneDay = 24 * 60 * 60 * 1000;
  const options = {
    secure: true,
    httpOnly: true,
    path: "/",
    maxAge: oneDay * 365,
  };
  useEffect(() => {
    if (document) {
      // TO-DO: check if cookie exists before setting, avoiding overwriting
      // if not needed and expiration timing errors
      setCookie("providerAccessToken", providerAccessToken, {
        maxAge: 3600,
        secure: true,
        httpOnly: true,
      });
      setCookie("providerRefreshToken", providerRefreshToken, {
        maxAge: oneDay * 365,
        secure: true,
      });
    }
  }, []);

  return <div>Cookie</div>;
}
