type AvatarProps = {
  name?: string;
  subtitle?: string;
  image_URL?: string;
};
// import Image from "next/image";

export default function Avatar({ name, subtitle, image_URL }: AvatarProps) {
  return (
    <div className="flex space-x-4 items-center">
      {/* <Image
        src={image_URL ?? "/test.png"}
        alt="User profile picture"
        width={36}
        height={36}
        className="rounded-full ring ring-neutral-600 h-[36px]"
      /> */}
      <img
        src={image_URL ?? "/test.png"}
        alt="User profile picture"
        className="rounded-full ring ring-neutral-600 h-9 w-9"
      />
      <div className="flex-col xs:hidden flex">
        <p className="text-neutral-100">{name ?? "User"}</p>
        <p className="text-neutral-300 font-light text-sm">
          {subtitle ? subtitle : "Product designer"}
        </p>
      </div>
    </div>
  );
}
