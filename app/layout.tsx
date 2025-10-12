import { ClientSidebarWrapper } from "@/components/client-sidebar-wrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextToploader from "nextjs-toploader";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shadcn Admin",
  icons: {
    icon: "/favicon.png",
  },
  description: "Admin Dashboard UI built with NextJs and Shadcn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NextToploader color="var(--primary)" showSpinner={false} />
        <AuthProvider>
          <ClientSidebarWrapper>{children}</ClientSidebarWrapper>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
