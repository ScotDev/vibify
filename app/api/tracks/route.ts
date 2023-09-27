import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { cookies } from "next/headers";

const checkToken = async () => {
  const cookieStore = cookies();
  console.log(cookieStore.getAll());
  const hasAccessToken = cookieStore.get("providerAccessToken");
  const refreshToken = cookieStore.get("providerRefreshToken")?.value;
  if (hasAccessToken) {
    return {
      data: { access_token: cookieStore.get("providerAccessToken")?.value },
      error: null,
      status: 200,
    };
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/spotify?refreshtoken=${refreshToken}`
  );
  const { data, error, status } = await res.json();
  return { data, error, status };
};

const searchTracks = async (access_token: string, term: string) => {
  const options = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${term}&type=track&limit=12`,
    options
  );
  return await res.json();
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  const { data, error, status } = await checkToken();

  // https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres
  if (error || status === 400) {
    return console.log("route.ts 50", data, error, "status:", status);
  }

  const result = await searchTracks(
    data.access_token as string,
    searchParams.get("term") || ""
  );
  const tracks = result.tracks.items;
  return NextResponse.json({ tracks });
}
