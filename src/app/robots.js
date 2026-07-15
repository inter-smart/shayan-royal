export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shayanroyal.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/_next/",
        "/static/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
