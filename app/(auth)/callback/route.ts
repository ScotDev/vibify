import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/supabase";

export const dynamic = "force-dynamic";

// import { handleTokenRefresh } from "@/app/actions/SpotifyToken";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const provider_token = requestUrl.searchParams.get("providerToken");
  const provider_refresh_token = requestUrl.searchParams.get(
    "providerRefreshToken"
  );
  const redirect_URL = requestUrl.searchParams.get("redirect_URL");
  // const seed = requestUrl.searchParams.get("seed");
  const supabase = createRouteHandlerClient<Database>({ cookies });
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const { data, error } = await supabase.auth.getSession();

  // const token = await handleTokenRefresh();
  // console.log(token);
  if (data.session?.provider_token) {
    return NextResponse.redirect(
      `${requestUrl.origin}/welcome?providerRefreshToken=${data?.session?.provider_refresh_token}&providerAccessToken=${data?.session?.provider_token}&redirect_URL=${redirect_URL}`
    );
  }
  if (!data.session) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login&redirect_URL=${redirect_URL}`
    );
  }
  return NextResponse.redirect(
    `${requestUrl.origin}/welcome?providerRefreshToken=${provider_refresh_token}&providerAccessToken=${provider_token}&redirect_URL=${redirect_URL}`
  );
}
