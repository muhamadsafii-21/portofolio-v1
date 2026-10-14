import type { Metadata } from "next";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://muhamadsafii.dev"),
  title: {
    default: "Muhamad Safi'i — Full-Stack Developer",
    template: "%s | Muhamad Safi'i",
  },
  description:
    "Portofolio Muhamad Safi'i, Full-Stack Developer. Lihat skill, project pribadi, dan cara menghubungi saya.",
  keywords: ["portfolio", "full-stack developer", "next.js", "web developer", "safi'i"],
  authors: [{ name: "Muhamad Safi'i" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://muhamadsafii.dev",
    siteName: "Muhamad Safi'i Portfolio",
    title: "Muhamad Safi'i — Full-Stack Developer",
    description:
      "Portofolio Muhamad Safi'i, Full-Stack Developer. Lihat skill, project pribadi, dan cara menghubungi saya.",
  },
  twitter: { card: "summary_large_image", title: "Muhamad Safi'i — Full-Stack Developer" },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
