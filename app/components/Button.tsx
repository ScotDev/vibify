export default function Button({
  title,
  onClick,
  type,
}: {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      className="bg-neutral-200 w-fit py-2 px-4 rounded-md cursor-pointer"
      onClick={onClick}
      type={type ?? "button"}
    >
      <p className="font-bold text-center text-neutral-950">{title}</p>
    </button>
  );
}
