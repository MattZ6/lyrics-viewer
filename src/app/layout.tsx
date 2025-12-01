import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "@/styles/global.css";

import { env } from "@/config/env";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  style: "normal",
});

export const metadata: Metadata = {
  title: env.appName,
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
