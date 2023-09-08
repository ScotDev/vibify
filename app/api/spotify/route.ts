import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

type SpotifyTokenRequestData = {
  grant_type: string;
  refresh_token: string;
  client_id?: string;
};
type SpotifyTokenRequestOptions = {
  method: string;
  headers: {
    Authorization: string;
    "Content-Type": string;
  };
  body: any;
  json: boolean;
};

export async function GET(request: NextRequest) {
  //  A cookie must first be set in the browser on first auth to store the refresh token. DONE

  // This API route takes the refresh token stored in a secure cookie (httpOnly, same-site=strict, max-age)
  //  and uses it to request a new access token from Spotify.
  const refreshToken = cookies().get("providerRefreshToken");

  //  If no refresh token is found,
  if (!refreshToken) {
    // return NextResponse.redirect("/login");
    return NextResponse.json({ data: null, error: "No refresh token found" });
  }

  // If a refresh token is found, the API route makes a GET request to the Spotify API to request a new access token.
  const authData: any = Buffer.from(
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENTID +
      ":" +
      process.env.NEXT_PUBLIC_SPOTIFY_CLIENTSECRET
  ).toString("base64");

  const formData: SpotifyTokenRequestData = {
    grant_type: "refresh_token",
    refresh_token: refreshToken.value,
    // client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENTID,
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
  // console.log(options);
  const newAccessToken = await fetch(
    "https://accounts.spotify.com/api/token",
    options
  );

  const data = await newAccessToken.json();
  // console.log("New access token", data);
  // https://dev.to/j471n/how-to-use-spotify-api-with-nextjs-50o5

  return NextResponse.json({
    access_token: data.access_token,
    expires_in: data.expires_in,
  });
}
