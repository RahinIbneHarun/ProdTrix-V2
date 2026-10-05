import { BrandLogoProps } from "@/app/types/BrandLogoProps";
import Image from "next/image";



export function BrandLogo({ className = "h-10 w-10" }: BrandLogoProps){
  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden rounded-lg bg-white ${className}`}
    >
      <Image
        src="/images/ProdTrix.jpeg"
        alt="ProdTrix logo"
        fill
        sizes="48px"
        className="object-cover scale-[1.4]"
      />
    </span>
  );
}

