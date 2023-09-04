import { DM_Mono } from "next/font/google";
import Link from "next/link";

const Mono = DM_Mono({ subsets: ["latin"], weight: ["400"] });

type Props = {
  children: any;
  href?: string;
};

export default function Code({ children, href }: Props) {
  return (
    <div className="px-4 py-2 bg-black border-2 border-neutral-700 truncate w-full md:w-fit overflow-hidden text-sm">
      {href ? (
        <Link href={href} target="_blank">
          <p
            className={`${Mono.className} truncate text-neutral-300 hover:underline`}
          >
            {children}
          </p>
        </Link>
      ) : (
        <p className={`${Mono.className} truncate text-neutral-300 `}>
          {children}
        </p>
      )}
    </div>
  );
}
