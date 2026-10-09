import type { Metadata } from "next";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

import "./globals.css";

export const metadata: Metadata = {
  title: "ProdTrix",
  description:
    "A study-focused platform for outcome-based education and academic workflow",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
<<<<<<< HEAD
    <html lang="en" 
    className="h-full antialiased" data-theme="light">
      <body cz-shortcut-listen="true">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
=======
    <html lang="en" className="h-full antialiased">
      <body className="">
        {children}
>>>>>>> 3906e4c (added admin features for the first iteration)
      </body>
    </html>
  );
}
