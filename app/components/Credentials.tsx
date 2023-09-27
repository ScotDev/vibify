"use client";

import { setCookie } from "cookies-next";
// Next imports
import { useSearchParams, useRouter } from "next/navigation";

export default function Credentials() {
  const params = useSearchParams();
  const router = useRouter();

  const redirect_URL = params.get("redirect_URL");
  const providerAccessToken = params.get("providerAccessToken");

  const date = new Date(0);
  const oneHour = new Date(date.setSeconds(3600));
  console.log("Creds", redirect_URL, providerAccessToken);

  setCookie("providerAccessToken", providerAccessToken, {
    maxAge: 3600,
    expires: oneHour,
    secure: true,
  });

  if (redirect_URL) {
    router.push(`/${redirect_URL}`);
  } else {
    router.push(`/`);
  }

  return <div>Credentials</div>;
}
