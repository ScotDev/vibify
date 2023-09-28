"use client";

import { useEffect } from "react";

import { setCookie } from "cookies-next";
// Next imports
import { useSearchParams, useRouter } from "next/navigation";

export default function Credentials() {
  const params = useSearchParams();
  const router = useRouter();

  const redirect_URL = params.get("redirect_URL");
  const providerAccessToken = params.get("providerAccessToken");
  const preset = params.get("preset");

  const date = new Date(0);
  const oneHour = new Date(date.setSeconds(3600));
  console.log("Creds", redirect_URL, providerAccessToken);

  useEffect(() => {
    if (providerAccessToken) {
      try {
        if (typeof sessionStorage === undefined) {
          throw new Error("No sessionstorage");
        }
        if (typeof sessionStorage !== undefined && preset) {
          const appState = {
            // I need to store seed/preset for step2, start with that
            preset,
          };
          sessionStorage.setItem("appState", JSON.stringify(appState));
        }
        if (typeof window == undefined) {
          throw new Error("No window");
        }
        setCookie("providerAccessToken", providerAccessToken, {
          maxAge: 3600,
          expires: oneHour,
          secure: true,
        });
      } catch (error) {
        console.log(error);
        return router.replace(`/`);
      }
    }
  }, []);

  if (redirect_URL) {
    if (preset) {
      router.replace(`/${redirect_URL}?seed=${preset}`);
    } else {
      router.replace(`/${redirect_URL}`);
    }
  } else {
    router.replace(`/`);
  }

  return <div>Credentials</div>;
}
