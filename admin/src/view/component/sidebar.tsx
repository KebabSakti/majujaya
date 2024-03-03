import { ReactNode } from "react";

export default function Sidebar({
  children,
  show,
}: {
  children: ReactNode;
  show: boolean;
}) {
  const sidebar = show ? "-translate-x-full" : "-translate-x-0";

  return (
    <>
      <div
        className={`bg-surface shadow-lg h-full z-10 fixed transition ease-in-out w-[70%] md:w-[25%] lg:w-[15%] ${sidebar}`}
      >
        {children}
      </div>
    </>
  );
}
