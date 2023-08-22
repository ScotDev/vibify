import Button from "@/app/components/Button";
import MediaItem from "@/app/components/MediaItem";

export default function page() {
  return (
    <div className="lg:pr-48">
      <h1 className="text-3xl">Playlist</h1>
      <div className="flex gap-12 py-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm">Average bpm</p>
          <p className="">90</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm">Average energy</p>
          <p className="">82%</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm">Total duration</p>
          <p className="">4:25:12</p>
        </div>
      </div>
      <Button title="Save playlist" />
      <div className="flex flex-col gap-6 py-12">
        <MediaItem />
        <MediaItem />
        <MediaItem />
      </div>
    </div>
  );
}
