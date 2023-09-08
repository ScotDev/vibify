import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { cookies } from "next/headers";

const checkToken = async () => {
  const cookieStore = cookies();
  console.log(cookieStore.getAll());
  const hasAccessToken = cookieStore.get("providerAccessToken");
  if (hasAccessToken) {
    return {
      data: { access_token: cookieStore.get("providerAccessToken")?.value },
      error: null,
    };
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/spotify`);
  const { data, error } = await res.json();
  return { data, error };
};

const searchTracks = async (access_token: string, term: string) => {
  const options = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${term}&type=track&limit=6`,
    options
  );
  return await res.json();
};
// }

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  const { data, error } = await checkToken();
  // const spotifyToken = cookies().get("providerAccessToken")?.value;

  // const supabase = createServerComponentClient<Database>({ cookies });
  // const { data } = await supabase.auth.getSession();

  // https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres
  if (error) {
    return console.log(error);
  }
  // console.log(data);
  const result = await searchTracks(
    data.access_token as string,
    searchParams.get("term") || ""
  );
  const tracks = result.tracks.items;
  // console.log(tracks);
  return NextResponse.json({ tracks });
}
