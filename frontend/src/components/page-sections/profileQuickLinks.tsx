import { cn } from "@/lib/utils";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { usePathname } from "next/navigation";
import React from "react";
import { profileLinks } from "@/constants/data";
import Link from "next/link";

const profileQuickLinks = () => {
  const pathname = usePathname();
  return (
    <div className="w-full h-min  bg-gray-300/10 rounded-lg border-input border-1 py-4 mt-4 flex flex-col gap-4 md:px-4 px-2">
      <div className="font-medium px-0 pb-2  border-b border-dashed border-zinc-900/20 justify-between flex items-center mb-2 text-white">
        <h1 className="text-2xl text-black font-bold">Quick Links</h1>
      </div>
      <div className="mb-2 flex flex-col gap-4">
        {profileLinks.map((e, i) => (
          <Link
            className={cn(
              "w-full group flex items-center justify-between",
              pathname == e.href && "text-primary"
            )}
            key={e.href + "mobile" + i}
            href={e.href}
          >
            <span className="">{e.name}</span>
            <IoIosArrowDroprightCircle
              className={cn(
                "text-primary text-lg group-hover:translate-x-1 transition-all duration-300 group-hover:opacity-100 ",
                pathname != e.href && "opacity-50"
              )}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default profileQuickLinks;
