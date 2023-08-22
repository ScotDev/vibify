"use client";

import { Noto_Sans_KR } from "next/font/google";

import { GiRunningShoe, GiPartyPopper, GiBasketballBall } from "react-icons/gi";

import { BsHeadphones } from "react-icons/bs";
import Link from "next/link";

const noto_sans_kr = Noto_Sans_KR({ weight: "500", subsets: ["latin"] });

const icon = (title: string) => {
  switch (title) {
    case "running":
      return (
        <GiRunningShoe className="text-neutral-900 justify-self-center aspect-square text-[96px] " />
      );
      break;
    case "disco":
      return (
        <GiPartyPopper className="text-neutral-900 justify-self-center aspect-square text-[96px] " />
      );
      break;
    case "k-pop":
      return (
        <h3
          className={`${noto_sans_kr.className} text-neutral-900 font-medium text-[64px] text-center `}
        >
          케이팝
        </h3>
      );
      break;
    case "hip hop":
      return (
        <GiBasketballBall className="text-neutral-900 justify-self-center aspect-square text-[96px] " />
      );
      break;
    case "focus":
      return (
        <BsHeadphones className="text-neutral-900 justify-self-center aspect-square text-[96px] " />
      );
      break;
    case "custom":
      return (
        <h3 className="text-neutral-900 font-medium text-[128px] text-center">
          +
        </h3>
      );
      break;
    default:
      return (
        <GiRunningShoe className="text-neutral-900 justify-self-center aspect-square text-[96px] " />
      );
      break;
  }
};

export default function VibeCard({ title }: { title: string }) {
  return (
    <Link href={`/step2/?preseed=${title}`}>
      <div
        className="rounded-xl bg-neutral-400 w-[250px] aspect-square p-6 grid cursor-pointer  transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        onClick={() => console.log(title)}
      >
        <h2 className="font-medium capitalize">{title}</h2>
        {icon(title)}
      </div>
    </Link>
  );
}
