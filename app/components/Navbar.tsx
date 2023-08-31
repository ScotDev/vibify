import Link from "next/link";
import Avatar from "./Avatar";

import { DM_Mono } from "next/font/google";

const Mono = DM_Mono({ subsets: ["latin"], weight: ["400"] });

export default async function Navbar({ data }: { data: any }) {
  return (
    <>
      <nav className="flex justify-between px-4 md:px-12 lg:px-24 py-6">
        <Link href="/">
          <p className={Mono.className}>vibify</p>
        </Link>

        {data.session?.user && (
          <Link href="/profile">
            <Avatar
              name={data?.session?.user.user_metadata?.name}
              subtitle={data?.session?.user.user_metadata?.email}
              image_URL={data?.session?.user.user_metadata?.avatar_url}
            />
          </Link>
        )}
      </nav>
    </>
  );
}
