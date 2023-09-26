"use server";

// Next imports
import { cookies } from "next/headers";

// Third-party library imports
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

// Types
import type { Database } from "@/supabase";
import {
  SpotifyTokenRequestData,
  SpotifyTokenRequestOptions,
} from "@/types/customTypes";

async function handleTokenRefresh() {
  const supabase = createServerActionClient<Database>({ cookies });
  const cookieStore = cookies();
  const spotifyAccessToken = cookieStore.get("providerAccessToken")?.value;
  const spotifyRefreshToken = cookieStore.get("providerRefreshToken")?.value;
  const { data, error } = await supabase.auth.getSession();
  console.log("access token", spotifyRefreshToken);

  const authData: any = Buffer.from(
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENTID +
      ":" +
      process.env.NEXT_PUBLIC_SPOTIFY_CLIENTSECRET
  ).toString("base64");

  if (!data.session || error) return console.log(error);

  if (!spotifyAccessToken || spotifyAccessToken.length < 1) {
    // Use refresh token to get new access token
    if (spotifyRefreshToken && spotifyRefreshToken.length > 0) {
      const formData: SpotifyTokenRequestData = {
        grant_type: "refresh_token",
        refresh_token: spotifyRefreshToken,
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

      const newAccessToken = await fetch(
        "https://accounts.spotify.com/api/token",
        options
      );
      const newSpotifyToken = await newAccessToken.json();
      console.log("New access token returned from spotify", newSpotifyToken);

      // const testToken = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/api/refresh`,
      //   {
      //     method: "POST",
      //     body: JSON.stringify({ refreshToken: spotifyRefreshToken }),
      //   }
      // );
      // console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh`);
      // const data = await testToken.json();
      // console.log("API", data, testToken.headers);

      return newSpotifyToken.access_token;
    }
  } else {
    console.log("Access token returned from cookies", spotifyAccessToken);

    return spotifyAccessToken;
  }

  //   If no access token found and no refresh token found, return null
  return null;
  // First check logged in with supabase
  // If logged in:
  // Check if access token exists, if so then return token
  // If not, check for refresh token.
  // If refresh token exists, then hit API route to refresh token
  // set new access token in cookies
}

export { handleTokenRefresh };
