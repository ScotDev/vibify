"use client";

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

  if (providerAccessToken) {
    try {
      if (typeof sessionStorage !== "undefined" && preset) {
        const appState = {
          // I need to store seed/preset for step2, start with that
          preset,
        };
        sessionStorage.setItem("appState", JSON.stringify(appState));
      }

      setCookie("providerAccessToken", providerAccessToken, {
        maxAge: 3600,
        expires: oneHour,
        secure: true,
      });
    } catch (error) {
      console.log(error);
      router.push(`/`);
    }
  }

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
