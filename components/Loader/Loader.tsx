interface Props {
  color?: string;
}

export function Loader(props: Props) {
  const color = props.color || "bg-white";
  return (
    <div className="flex space-x-2">
      <div
        className={`w-3 h-3 ${color} rounded-full animate-bounce-slow`}
      ></div>
      <div
        className={`w-3 h-3 ${color} rounded-full animate-bounce-delay-200`}
      ></div>
      <div
        className={`w-3 h-3 ${color} rounded-full animate-bounce-delay-400`}
      ></div>
    </div>
  );
}
