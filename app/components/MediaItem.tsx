import Image from "next/image";

import shania from "./shania.png";

export default function MediaItem() {
  return (
    <div className="flex justify-between h-20 ">
      <div className="flex gap-6">
        <Image
          src={shania}
          height={80}
          width={80}
          className="rounded-xl"
          alt="Media item cover art"
          placeholder="blur"
        />
        <div className="flex flex-col h-full justify-between">
          <h3 className="font-medium">You&apos;re still the one</h3>
          <h4 className="text-sm">Shania Twain</h4>
          <h5 className="text-sm">Come On Over</h5>
        </div>
      </div>

      <p className="hidden sm:flex">1997</p>
      <p>3:32</p>
    </div>
  );
}
