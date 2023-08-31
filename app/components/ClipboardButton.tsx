"use client";

import { PiCopySimpleFill } from "react-icons/pi";

import { copyToClipboard } from "../utils/clipboard";

export default function ClipboardButton({
  title,
  type,
  value,
}: {
  title: string;
  type?: "button" | "submit";
  value: string;
}) {
  const handleClick = () => {
    copyToClipboard(value);
  };

  return (
    <button
      className="bg-black w-fit p-2 aspect-square cursor-pointer grid gap-2 items-center transition-all hover:translate-x-1 hover:-translate-y-1 clipboard"
      onClick={handleClick}
      type={type ?? "button"}
    >
      <span className="font-bold text-center text-xl text-neutral-300">
        <PiCopySimpleFill />
      </span>
    </button>
  );
}
