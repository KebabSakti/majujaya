import { ReactNode } from "react";

export default function Content({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <>
      <div className="h-full w-[90%] mx-auto my-4 flex flex-col gap-4">
        <div className=" text-onBackground font-semibold text-xl">{title}</div>
        <div className="flex gap-4 h-full text-onSurface">
          <div className="bg-surface w-full p-6">
            <div className="flex flex-col gap-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
