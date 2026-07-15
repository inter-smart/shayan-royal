import { fetchFromAPI } from "@/lib/api";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shayanroyal.com";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/brand",
    "/contact",
    "/fabrication",
    "/inventory",
    "/privacy-policy",
    "/service",
    "/terms-conditions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic routes
  let serviceRoutes = [];
  let blogRoutes = [];
  let inventoryRoutes = [];

  // Fetch Services
  try {
    const { data } = await fetchFromAPI("services");
    if (data && Array.isArray(data.services)) {
      serviceRoutes = data.services.map((service) => ({
        url: `${baseUrl}/service-detail/${service.slug}`,
        lastModified: new Date(service.updated_at || new Date()),
        changeFrequency: "weekly",
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error("Error fetching services for sitemap:", error);
  }

  // Fetch Blogs
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/blogs?page=1&limit=100`,
      { next: { revalidate: 3600 } }
    );
    if (response.ok) {
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        blogRoutes = result.data.map((blog) => ({
          url: `${baseUrl}/blog/${blog.slug}`,
          lastModified: new Date(blog.updated_at || new Date()),
          changeFrequency: "weekly",
          priority: 0.6,
        }));
      }
    }
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  // Fetch Inventories
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/inventories/filtered?page=1&limit=100`,
      { next: { revalidate: 3600 } }
    );
    if (response.ok) {
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        inventoryRoutes = result.data.map((car) => ({
          url: `${baseUrl}/inventory/${car.slug}`,
          lastModified: new Date(car.updated_at || new Date()),
          changeFrequency: "weekly",
          priority: 0.7,
        }));
      }
    }
  } catch (error) {
    console.error("Error fetching inventories for sitemap:", error);
  }

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...inventoryRoutes];
}
