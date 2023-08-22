import VibeCard from "@/app/components/VibeCard";

export default function page() {
  return (
    <div className="flex gap-12 w-full flex-wrap justify-center">
      <VibeCard title="running" />
      <VibeCard title="disco" />
      <VibeCard title="focus" />
      <VibeCard title="hip hop" />
      <VibeCard title="k-pop" />
      <VibeCard title="custom" />
    </div>
  );
}
