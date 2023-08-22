import Image from "next/image";

import shania from "./shania.png";
import Link from "next/link";
// TODO: combine this with MediaItem.tsx with named exports
export default function SmallMediaItem({ data }: { data: any }) {
  //   console.log(data);
  return (
    <div className="flex flex-col gap-6 w-52 ">
      <Link target="_blank" href={data.external_urls.spotify}>
        <Image
          src={data?.album.images[0].url}
          height={208}
          width={208}
          className="rounded-xl"
          alt="Media item cover art"
          // placeholder="blur"
        />
      </Link>
      <div className="flex flex-col h-full gap-4 justify-between ">
        <Link target="_blank" href={data.external_urls.spotify}>
          <h3 className="font-medium">{data?.name}</h3>
        </Link>
        {/* TODO: Make artist name into link */}
        <h4 className="text-sm text-neutral-400">
          {data.artists.map((artist: any, index: Number) => {
            if (index === data.artists.length - 1) {
              return (
                <Link target="_blank" href={artist.external_urls.spotify}>
                  {artist.name}
                </Link>
              );
            } else {
              return (
                <span>
                  <Link target="_blank" href={artist.external_urls.spotify}>
                    {artist.name},&nbsp;
                  </Link>
                </span>
              );
            }
          })}
        </h4>
        <Link target="_blank" href={data.album.external_urls.spotify}>
          <h5 className="text-sm text-neutral-400">{data.album.name}</h5>
        </Link>
      </div>
    </div>
  );
}
