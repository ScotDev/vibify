"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/supabase";
import { setCookie, hasCookie } from "cookies-next";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import Button from "@/app/components/Button";
import { getSubstrings } from "../utils/strings";

export default function Welcome() {
  const [user, setUser] = useState<string>("");
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const params = useSearchParams();
  const providerRefreshToken = params.get("providerRefreshToken");
  const providerAccessToken = params.get("providerAccessToken");
  const redirect_URL = params.get("redirect_URL");
  const seed = params.get("seed");
  const oneDay = 24 * 60 * 60 * 1000;

  useEffect(() => {
    const setCookies = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (document && data.session && !error) {
        // TO-DO: check if cookie exists before setting, avoiding overwriting
        // if not needed and expiration timing errors
        // Should I check if the user has an active supabase session?
        // I think so, that would mean that if the user isn't logged in with supabase then they can't use
        // the spotify tokens, which would give a layer of security and control, as I would be able to
        // remove a user and block new sign ups if needed.
        const userFirstName = getSubstrings(
          data.session.user.user_metadata.full_name,
          " "
        );
        if (userFirstName) setUser(userFirstName[0]);

        const date = new Date(0);
        const oneHour = new Date(date.setSeconds(3600));
        if (!hasCookie("providerAccessToken")) {
          // deleteCookie("providerAccessToken", {
          //   maxAge: 3600,
          //   expires: oneHour,
          //   secure: true,
          // });
          setCookie("providerAccessToken", providerAccessToken, {
            maxAge: 3600,
            expires: oneHour,
            secure: true,
          });
        }
        if (!hasCookie("providerRefreshToken")) {
          setCookie("providerRefreshToken", providerRefreshToken, {
            maxAge: oneDay * 365,
            secure: true,
          });
        }
      }
    };
    setCookies();
  }, []);

  if (providerRefreshToken && redirect_URL) {
    if (seed) {
      console.log("redirecting to: ", `/${redirect_URL}?seed=${seed}`);
      router.push(`/${redirect_URL}?seed=${seed}`);
    }

    router.push("/" + redirect_URL);
  }

  if (!providerRefreshToken) {
    router.push(`/login`);
  }

  return (
    <div className="flex flex-col pt-12 gap-6">
      <h1>
        Welcome<span>{user && `, ${user}`}</span>
      </h1>
      <div className="grid place-items-center pt-12">
        <Link href="/step1">
          <Button title="Get Started" />
        </Link>
      </div>
    </div>
  );
}
