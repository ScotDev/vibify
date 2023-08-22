import VibeCard from "@/app/components/VibeCard";

export default function page() {
  return (
    <div>
      <h1>Choose a vibe</h1>
      <div className="flex gap-12 pt-24 w-full flex-wrap">
        <VibeCard title="running" />
        <VibeCard title="disco" />
        <VibeCard title="focus" />
        <VibeCard title="hip hop" />
        <VibeCard title="k-pop" />
        <VibeCard title="custom" />
      </div>
    </div>
  );
}
