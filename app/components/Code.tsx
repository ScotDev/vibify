import { DM_Mono } from "next/font/google";

const Mono = DM_Mono({ subsets: ["latin"], weight: ["400"] });

type Props = {
  children: any;
};

export default function Code({ children }: Props) {
  return (
    <div className="px-4 py-2 bg-neutral-800 rounded-md border-2 border-neutral-700 w-fit ">
      <p className={Mono.className}>{children}</p>
    </div>
  );
}
