import Link from "next/link";
import Avatar from "./Avatar";
import Button from "./Button";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/supabase";

import { DM_Mono } from "next/font/google";

const Mono = DM_Mono({ subsets: ["latin"], weight: ["400"] });

export default async function Navbar() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getSession();
  return (
    <>
      <nav className="flex justify-between px-4 md:px-12 lg:px-24 py-6">
        <Link href="/">
          <p className={Mono.className}>vibify</p>
        </Link>

        {data.session?.user ? (
          <Link href="/profile">
            <Avatar
              name={data?.session?.user.user_metadata?.name}
              subtitle={data?.session?.user.user_metadata?.email}
              image_URL={data?.session?.user.user_metadata?.avatar_url}
            />
          </Link>
        ) : (
          <Link href="/login">
            <Button title="Log in" />
          </Link>
        )}
      </nav>
    </>
  );
}
