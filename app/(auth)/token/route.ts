// This route is used purely to set and update the spotify access token AFTER INITIAL LOGIN,
// should it be expired, missing or invalid in some way.

// The overall flow is as follows:

// User navigates to a page that requires a spotify access token.
// If they aren't logged into supabase, or the refresh token is missing,
// they are redirected to /login.

// If both the refresh token and supabase session are valid,
// but the access token is missing, expired or invalid,
// the user is redirected to this endpoint (/token).

// This endpoint then exchanges the refresh token for a new access token, by making
// a request to the spotify api. This logic already exists in the handleTokenRefresh action.

// The user is then redirected to a "use client" page that sets/updates the access token cookie
// The updated access token is passed in a URL param, along with the redirect URL.

// They are then returned to their previous page if possible, otherwise to the homepage.

// Next imports
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

// Types
import {
  SpotifyTokenRequestData,
  SpotifyTokenRequestOptions,
} from "@/types/customTypes";
import { Database } from "@/supabase";

// export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const redirect_URL = requestUrl.searchParams.get("redirect_URL");
  const preset = requestUrl.searchParams.get("preset");
  const spotifyRefreshToken = cookies().get("providerRefreshToken");

  const supabase = createRouteHandlerClient<Database>({ cookies });

  console.log("requestUrl", requestUrl);

  if (!spotifyRefreshToken) {
    // 401 unauthorised
    // Can't dictate status and redirect?
    console.log("token route: no refresh token found");
    await supabase.auth.signOut();
    return NextResponse.redirect(`${requestUrl.origin}/login`);
  }

  const authData: any = Buffer.from(
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENTID +
      ":" +
      process.env.NEXT_PUBLIC_SPOTIFY_CLIENTSECRET
  ).toString("base64");

  const formData: SpotifyTokenRequestData = {
    grant_type: "refresh_token",
    refresh_token: spotifyRefreshToken.value,
  };

  const options: SpotifyTokenRequestOptions = {
    method: "POST",
    headers: {
      Authorization: "Basic " + authData,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(formData),
    json: true,
  };

  // If refresh token is present, contact spotify api to get new access token
  const res = await fetch("https://accounts.spotify.com/api/token", options);

  if (!res.ok) {
    return NextResponse.redirect(`${requestUrl.origin}/login`);
  }

  const newSpotifyAccessToken = await res.json();

  console.log("New access token returned from spotify", newSpotifyAccessToken);

  // If all is successful, redirect to the credentials page to allow the cookies to be set
  // Then redirect back to the original page

  // If a preset is passed in, i.e. if redirect comes from step2, redirect to the preset page
  if (preset) {
    return NextResponse.redirect(
      `${requestUrl.origin}/credentials?redirect_URL=${redirect_URL}&providerAccessToken=${newSpotifyAccessToken.access_token}&preset=${preset}`
    );
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/credentials?redirect_URL=${redirect_URL}&providerAccessToken=${newSpotifyAccessToken.access_token}`
  );
}
