import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Telegram Statistics",
  description: "Find out how many messages and words you have sent in your time using telegram, get the full timeline of your activity and many more data based on your chating history.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
