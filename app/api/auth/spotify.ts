import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  //  A cookie must first be set in the browser on first auth to store the refresh token.
  // This API route takes the refresh token stored in a secure cookie (httpOnly, same-site=strict, max-age)
  //  and uses it to request a new access token from Spotify.
  // It then returns this to the client as a JSON object.
  //   The client can then use this access token to make requests to the Spotify API.
}

// https://dev.to/j471n/how-to-use-spotify-api-with-nextjs-50o5
