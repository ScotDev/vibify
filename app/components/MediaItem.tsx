import Image from "next/image";
import Link from "next/link";

import shania from "./shania.png";

import { msToMinSec, formatDate } from "@/app/utils/calc";
// const msToMinSec = (ms: any) => {
//   const minutes: any = Math.floor(ms / 60000);
//   const seconds: any = ((ms % 60000) / 1000).toFixed(0);
//   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
// };

// const formatDate = (date: Date) => {
//   const dateAsDateObj = new Date(date);
//   const options: any = { year: "numeric", month: "short" };
//   return dateAsDateObj.toLocaleDateString("en-US", options);
// };

export default function MediaItem({ data }: { data: any }) {
  return (
    <div className="flex justify-between media-item">
      <div className="flex gap-6 w-full  truncate">
        <Link target="_blank" href={data.external_urls.spotify}>
          {/* <div className="h-[100px] w-[100px]"> */}
          {/* next/image uses too many billable resources on vercel */}
          <img
            src={data?.album.images[1].url}
            alt="Media item cover art"
            className="object-fill object-center aspect-square h-24 w-24 min-w-[96px] min-h-[96px] rounded-xl"
          />
          {/* </div> */}
        </Link>
        <div className="flex flex-col h-full justify-between ">
          <Link target="_blank" href={data.external_urls.spotify}>
            <h3 className="font-medium truncate ">{data?.name}</h3>
          </Link>
          <h4 className="text-sm text-neutral-400 truncate ">
            {data.artists.map((artist: any, index: Number) => {
              if (index === data.artists.length - 1) {
                return (
                  <Link
                    target="_blank"
                    key={artist.name}
                    href={artist.external_urls.spotify}
                  >
                    {artist.name}
                  </Link>
                );
              } else {
                return (
                  <span key={artist.name}>
                    <Link target="_blank" href={artist.external_urls.spotify}>
                      {artist.name},&nbsp;
                    </Link>
                  </span>
                );
              }
            })}
          </h4>
          <Link target="_blank" href={data.album.external_urls.spotify}>
            <h5 className="text-sm text-neutral-400 truncate">
              {data.album.name}
            </h5>
          </Link>
        </div>
      </div>

      <p className="xs:hidden flex w-1/4 px-6">
        {formatDate(data.album.release_date)}
      </p>
      <p className="xs:hidden flex w-1/4 px-6">
        {msToMinSec(data.duration_ms)}
      </p>
    </div>
  );
}
