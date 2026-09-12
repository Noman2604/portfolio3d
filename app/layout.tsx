import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Noman Patel — Full-Stack Software Developer",
  description: "Full-stack developer building AptiCore, AI assistants, and scalable web apps. Intern @ Autowhat.ai.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plexMono.variable} ${newsreader.variable} antialiased selection:bg-[#f59e0b]/30`}
    >
      <body className="bg-[#05070c] text-[#f1f5f9] min-h-screen overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
