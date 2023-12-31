"use client";

import { Noto_Sans_KR } from "next/font/google";

import { GiRunningShoe, GiPartyPopper, GiBasketballBall } from "react-icons/gi";

import { BsHeadphones, BsQuestion } from "react-icons/bs";
import Link from "next/link";
import { Tag } from "./Input";

const noto_sans_kr = Noto_Sans_KR({ weight: "500", subsets: ["latin"] });

const icon = (title: string) => {
  switch (title) {
    case "running":
      return (
        <GiRunningShoe className="text-neutral-900 justify-self-center aspect-square text-5xl  " />
      );
      break;
    case "party":
      return (
        <GiPartyPopper className="text-neutral-900 justify-self-center aspect-square text-5xl " />
      );
      break;
    case "k-pop":
      return (
        <h3
          className={`${noto_sans_kr.className} font-medium text-4xl leading-none text-center `}
        >
          케이팝
        </h3>
      );
      break;
    case "hip hop":
      return (
        <GiBasketballBall className="text-neutral-900 justify-self-center aspect-square text-5xl " />
      );
      break;
    case "focus":
      return (
        <BsHeadphones className="text-neutral-900 justify-self-center aspect-square text-5xl " />
      );
      break;
    case "custom":
      return (
        <h3 className="font-medium text-7xl leading-none text-center">+</h3>
      );
      break;
    default:
      return (
        <BsQuestion className="text-neutral-900 justify-self-center aspect-square text-6xl md:text-[96px] " />
      );
      break;
  }
};

export default function VibeCard({
  title,
  seedAttributes,
}: {
  title: string;
  seedAttributes?: string[];
}) {
  return (
    <Link href={`/step2/?seed=${title}`}>
      <div
        // className="bg-neutral-400 w-[250px] aspect-square p-6 grid cursor-pointer transition-all hover:translate-x-2 hover:-translate-y-2 card"
        className="card"
        onClick={() => console.log(title)}
      >
        <h2 className="font-medium capitalize">{title}</h2>

        <div className="mx-auto">{icon(title)}</div>
      </div>
    </Link>
  );
}
