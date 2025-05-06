import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "./globals.css";
import {NuqsAdapter} from "nuqs/adapters/next/app"
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets :["latin"]
})

export const metadata: Metadata = {
  title: "Pages",
  description: "Pages is a collaborative document editor",
  icons: {
    icon: "/logo.svg",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Pages",
    statusBarStyle: "default",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pages",
    description: "Pages is a collaborative document editor. Create and edit documents with your friends in real-time.",
    creatorId: "Yashwanth Aravind",
    creator: "@yashwantharavind",
    images: [
      {
        url: "https://pages-docs.vercel.app/og.png",
        alt: "Pages",
      },
    ]
  },
  openGraph: {
    title: "Pages",
    description: "Pages is a collaborative document editor",
    siteName: "Pages",
    images: [
  
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    noarchive: true,
    noimageindex: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <NuqsAdapter>
          <ConvexClientProvider>
            <Toaster/>
        {children}
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
