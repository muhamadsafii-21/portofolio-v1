import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteUrl, siteName } from "@/lib/site";
import { LanguageProvider } from "@/lib/language";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const description =
  "Portofolio Muhamad Safi'i, Full-Stack Developer. Lihat skill, project pribadi, dan cara menghubungi saya.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | Muhamad Safi'i`,
  },
  description,
  keywords: [
    "portfolio",
    "full-stack developer",
    "next.js",
    "web developer",
    "Muhamad Safi'i",
    "react",
    "supabase",
  ],
  authors: [{ name: "Muhamad Safi'i", url: siteUrl }],
  creator: "Muhamad Safi'i",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Muhamad Safi'i Portfolio",
    title: siteName,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
  },
  icons: { icon: "/favicon.ico" },
};

// Structured data untuk Google (Person schema)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhamad Safi'i",
  jobTitle: "Full-Stack Developer",
  url: siteUrl,
  sameAs: [
    "https://github.com/",
    "https://linkedin.com/in/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

