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
    <button className="btn" onClick={onClick} type={type ?? "button"}>
      <p className="font-medium text-center ">{title}</p>
      {hasImage && (
        <Image src={spotify_logo} width={64} height={64} alt="Button icon" />
      )}
    </button>
  );
}
