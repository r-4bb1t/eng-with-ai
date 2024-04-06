import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "English with AI",
  description: "Have conversations with AI to improve your English skills!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex w-full flex-col items-center">{children}</body>
    </html>
  );
}
