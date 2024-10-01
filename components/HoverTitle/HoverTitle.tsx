import { useState } from "react";

interface Props {
  children: React.ReactNode;
  text: string;
}

export function HoverTitle(Props: Props) {
  const [tooltip, setTooltip] = useState("");

  return (
    <div className="">
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => {
          setTooltip(Props.text);
        }}
        onMouseLeave={() => setTooltip("")}
      >
        {Props.children}
        {tooltip !== "" && (
          <span className="z-10 absolute -bottom-8 -left-1/2 text-sm bg-gray-500 text-white p-1 rounded">
            {tooltip}
          </span>
        )}
      </div>
    </div>
  );
}
