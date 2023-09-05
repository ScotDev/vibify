import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/supabase";

// function search(term: string) {
//   const pattern = new RegExp(term, "i");
//   return data.genres.filter((item: string) => pattern.test(item));

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

  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getSession();
  // console.log(data);

  // https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres

  const result = await searchTracks(
    data.session?.provider_token as string,
    searchParams.get("term") || ""
  );
  const tracks = result.tracks.items;
  console.log(tracks);
  return NextResponse.json({ tracks });
}
