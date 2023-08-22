import Button from "@/app/components/Button";
import { TagInput, SliderInput, Tag } from "@/app/components/Input";
import Link from "next/link";

export default function page({
  searchParams,
}: {
  searchParams: { preseed: string };
}) {
  // export default function page({ params }: { params: string }) {
  const preseed = searchParams.preseed;
  return (
    <form className="flex flex-col gap-12 w-full justify-center ">
      <div>
        <h1 className="text-3xl">Adjust the vibe</h1>
        <h2 className="text-xl capitalize py-6">
          Chosen vibe is <span className="font-bold">{preseed}</span>
        </h2>

        <div className="flex gap-12">
          <div className="pt-6">
            <TagInput title="tracks" />
            <div className="flex flex-wrap gap-2 pt-2">
              <Tag title="Coco Chanel" />
              <Tag title="CUFF IT" />
            </div>
          </div>
          <div className="pt-6">
            <TagInput title="genres" />
            <div className="flex flex-wrap gap-2 pt-2">
              <Tag title="Coco Chanel" />
              <Tag title="CUFF IT" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <h3 className="text-xl">Finer details</h3>
        <div className="pt-6">
          <SliderInput />
          <SliderInput />
        </div>
      </div>
      <Link href="/step3">
        <Button title="Confirm" />
      </Link>
    </form>
  );
}
