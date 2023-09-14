const Loading = ({ height }: { height?: string }) => {
  const itemHeight = height || "h-6";
  return (
    <div
      className={`bg-neutral-600 ${itemHeight} leading-6 max-w-sm w-full rounded animate-pulse`}
    ></div>
  );
};
const LoadingMediaItem = () => {
  return (
    <div className="flex flex-col gap-2 md:gap-6 md:w-52 w-40 mb-2">
      <div className="bg-neutral-600 aspect-square md:h-52 md:w-52 rounded-xl animate-pulse"></div>
      <div className="flex flex-col gap-6 justify-between">
        <div className="bg-neutral-600 h-6 max-w-sm w-full rounded animate-pulse mt-2"></div>
        <div className="bg-neutral-600 h-6 max-w-sm w-full rounded animate-pulse"></div>
        <div className="bg-neutral-600 h-6 max-w-sm w-full rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export { Loading, LoadingMediaItem };
