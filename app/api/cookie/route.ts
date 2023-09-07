import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies, headers } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/supabase";

export async function GET(req: NextRequest, res: NextResponse) {
  // Set the cookie with httpOnly and SameSite=Strict attributes
  // res.setHeader(
  //   "Set-Cookie",
  //   "myCookie=value; HttpOnly; SameSite=Strict; Path=/;"
  // );

  console.log("Cookie set successfully");
  const requestUrl = new URL(req.url);
  const cookieStore = cookies();
  const oneDay = 24 * 60 * 60 * 1000;
  cookieStore.set("test", "store", {
    domain: requestUrl.origin,
    secure: true,
    // httpOnly: true,
    maxAge: oneDay * 365,
  });
  return new Response("Hello, Next.js!", {
    status: 200,
    // headers: { "Set-Cookie": `test=3235t3`, test: "pengis" },
  });
}

export async function POST(req: Request, res: Response) {
  // const supabase = createRouteHandlerClient<Database>({ cookies });
  const { cookieName, cookieValue } = await req.json();
  console.log(cookieName, cookieValue);
  const oneDay = 24 * 60 * 60 * 1000;
  // const options = {
  //   secure: true,
  //   httpOnly: true,
  //   path: "/",
  //   maxAge: oneDay * 365,
  // };

  const requestUrl = new URL(req.url);
  const cookieStore = cookies();

  cookieStore.set(cookieName, cookieValue, {
    domain: requestUrl.origin,
    secure: true,
    httpOnly: true,
    maxAge: oneDay * 365,
  });

  console.log(`Cookie ${cookieName} successfully`);

  const response = new Response("test, Next.js!", {
    status: 200,
  });
  // response.headers.set("Set-Cookie", "hello=post");
  return response;

  // return NextResponse.json({ message: `Cookie ${cookieName} successfully` });
}

// 2024-10-10T15:26:21.039Z
