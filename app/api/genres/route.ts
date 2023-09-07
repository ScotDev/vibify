import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import data from "../../../data/genres.json";

function search(term: string) {
  const pattern = new RegExp(term, "i");
  return data.genres.filter((item: string) => pattern.test(item));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  console.log(searchParams);

  // https://developer.spotify.com/documentation/web-api/reference/get-recommendation-genres

  const result = search(searchParams.get("term") || "");

  return NextResponse.json({ result });
}
