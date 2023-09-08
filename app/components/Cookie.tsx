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

  const checkSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (!error && data.session) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const setCookies = async () => {
      const hasActiveSession = await checkSession();
      if (document && hasActiveSession) {
        // TO-DO: check if cookie exists before setting, avoiding overwriting
        // if not needed and expiration timing errors
        // Should I check if the user has an active supabase session?
        // I think so, that would mean that if the user isn't logged in with supabase then they can't use
        // the spotify tokens, which would give a layer of security and control, as I would be able to
        // remove a user and block new sign ups if needed.
        setCookie("providerAccessToken", providerAccessToken, {
          maxAge: 3600,
          secure: true,
        });
        setCookie("providerRefreshToken", providerRefreshToken, {
          maxAge: oneDay * 365,
          secure: true,
        });
      }
    };
    setCookies();
  }, []);

  return <div>Cookie</div>;
}
