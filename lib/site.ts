// Sumber tunggal URL website. Set NEXT_PUBLIC_SITE_URL di Vercel
// (mis. https://portofolio-abc.vercel.app atau domain custom kamu).
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhamadsafii.dev"
).replace(/\/+$/, "");

export const siteName = "Muhamad Safi'i — Full-Stack Developer";
