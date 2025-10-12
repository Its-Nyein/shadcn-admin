import { ClientSidebarWrapper } from "@/components/client-sidebar-wrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextToploader from "nextjs-toploader";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Shadcn Admin",
  description: "Admin Dashboard UI built with NextJs and Shadcn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <NextToploader color="var(--primary)" showSpinner={false}/>
        <ClientSidebarWrapper>{children}</ClientSidebarWrapper>
      </body>
    </html>
  );
}
