export default function Button({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="bg-neutral-200 w-fit py-2 px-4 rounded-md cursor-pointer"
      onClick={onClick}
    >
      <p className="font-bold text-center text-neutral-950">{title}</p>
    </button>
  );
}
