"use client";

import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/supabase";
import { setCookie } from "cookies-next";

import { useSearchParams } from "next/navigation";

export default function Cookie() {
  const supabase = createClientComponentClient<Database>();

  const params = useSearchParams();
  const token = params.get("refreshtoken");

  const checkSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log(data.session);
    document.cookie = `providerRefreshToken=test; Secure; HttpOnly; Path=/ Max-Age=3600;`;
  };
  const oneDay = 24 * 60 * 60 * 1000;
  const options = {
    secure: true,
    httpOnly: true,
    path: "/",
    maxAge: oneDay * 365,
  };
  useEffect(() => {
    checkSession();
    if (document) {
      //   console.log(document.cookie);
      setCookie("providerRefreshToken", token, {
        maxAge: oneDay * 365,
        secure: true,
      });
      //   document.cookie = `providerRefreshToken=test; Secure; HttpOnly; Path=/ Max-Age=3600;`;
    }
  }, []);

  return <div>Cookie</div>;
}
