import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "ProdTrix",
  description:
    "A study-focused platform for outcome-based education and academic workflow",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="">
        {children}
      </body>
    </html>
  );
}
