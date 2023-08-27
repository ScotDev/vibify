import Image from "next/image";
import spotify_logo from "@/public/Spotify_Logo_RGB_Green.png";

export default function Button({
  title,
  onClick,
  type,
  hasImage,
}: {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  hasImage?: boolean;
}) {
  return (
    <button
      className="bg-neutral-200 w-fit py-2 px-4 rounded-md cursor-pointer flex gap-2 items-center"
      onClick={onClick}
      type={type ?? "button"}
    >
      <p className="font-bold text-center text-neutral-950">{title}</p>
      {hasImage && (
        <Image src={spotify_logo} width={64} height={64} alt="Button icon" />
      )}
    </button>
  );
}
