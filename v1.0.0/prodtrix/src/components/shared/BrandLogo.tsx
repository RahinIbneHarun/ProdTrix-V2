import type { BrandLogoProps } from "@/interfaces/BrandLogoProps";
import Image from "next/image";

export function BrandLogo({ className = "h-10 w-10" }: BrandLogoProps) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ${className}`}
    >
      <Image
        src="/images/ProdTrix.jpeg"
        alt="ProdTrix logo"
        width={96}
        height={96}
        priority
        className="h-full w-full object-cover scale-[1.4]"
      />
    </span>
  );
}
