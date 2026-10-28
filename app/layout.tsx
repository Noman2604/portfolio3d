import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nomanpatel.vercel.app"),
  title: "Noman Patel — Full-Stack Developer",
  description:
    "Full-Stack Developer building reliable web applications with Next.js, TypeScript, and MongoDB.",
  keywords: [
    "Noman Patel",
    "Full-Stack Developer",
    "Next.js 15",
    "TypeScript",
    "MongoDB",
    "Node.js",
    "AptiCore",
    "Software Engineer",
  ],
  authors: [{ name: "Noman Patel", url: "https://github.com/Noman2604" }],
  creator: "Noman Patel",
  openGraph: {
    title: "Noman Patel — Full-Stack Developer",
    description:
      "Full-stack web software, production applications, and clean software architecture.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noman Patel — Full-Stack Developer",
    description:
      "Full-stack web software, production applications, and clean software architecture.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Noman Patel",
    jobTitle: "Full-Stack Developer",
    url: "https://nomanpatel.vercel.app",
    sameAs: [
      "https://github.com/Noman2604",
      "https://linkedin.com/in/noman-patel",
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "MongoDB",
      "Node.js",
      "Tailwind CSS",
      "REST APIs",
      "Full-Stack Web Development",
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="bg-[#0C0D0E] text-[#EFEFF1] min-h-screen overflow-x-hidden font-sans selection:bg-[#262930] selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
