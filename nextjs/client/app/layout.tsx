import ReactQueryProvider from "./providers/react-query-providers";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "gantt-task-react/dist/index.css";
import "react-day-picker/style.css";
import "./globals.css";

import { LayoutBreadcrumb } from "./components/header/components/breadcrumb";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { AppSidebar } from "./components/siderbar";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./components/header";
import { Suspense } from "react";
import Loading from "./loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider>
                <Suspense fallback={<Loading />}>
                  <AppSidebar />
                </Suspense>
                <SidebarInset className="flex flex-col">
                  <Header />
                  <LayoutBreadcrumb />
                  <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                    <Analytics />
                  </div>
                </SidebarInset>
              </SidebarProvider>
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
