import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const supabase = createRouteHandlerClient<Database>({ cookies });
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const { data, error } = await supabase.auth.getSession();

  // if (!error && data.session) {
  //   console.log(data);
  //   await fetch("/api/cookie", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       cookieName: "providerRefreshToken",
  //       cookieValue: data.session.provider_refresh_token,
  //     }),
  //   });
  // }
  // URL to redirect to after sign in process completes
  return NextResponse.redirect(
    `${requestUrl.origin}/welcome?refreshtoken=${
      data?.session?.provider_refresh_token || "none"
    }`
  );
}
