"use client";

import // createServerComponentClient,
// createClientComponentClient,
"@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "@/supabase";
import { redirect } from "next/navigation";
import Cookie from "../components/Cookie";

export default function page() {
  // const supabase = createServerComponentClient<Database>({ cookies });
  // const supabase = createClientComponentClient<Database>({ cookies });
  // const { data, error } = await supabase.auth.getSession();

  // if (!data.session) {
  //   redirect("/login");
  // }
  // console.log("welcome session:", data.session?.provider_refresh_token);
  // if (!error && data.session) {
  //   console.log(data);

  // await fetch(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/cookie`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     cookieName: "providerRefreshToken",
  //     cookieValue: data.session.provider_refresh_token,
  //   }),
  // });

  // await fetch(`${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/cookie`);
  // const cookieName: string = "providerRefreshToken";
  // const cookieValue: any = data.session.provider_refresh_token;
  // cookies().set(cookieName, cookieValue, {
  //   secure: true,
  //   httpOnly: true,
  //   path: "/",
  // });
  // const cook =
  // (document.cookie = `providerRefreshToken=${data.session.provider_refresh_token}; Secure; HttpOnly; Path=/`);
  // document.cookie = `providerRefreshToken=test; Secure; HttpOnly; Path=/`;
  // console.log(cook);

  //   const cookieStore = cookies();
  //   console.log("welcome cookies", cookieStore.getAll());
  // }

  return (
    <div>
      <p>welcome</p>
      <Cookie />
    </div>
  );
}
