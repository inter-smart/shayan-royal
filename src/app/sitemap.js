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

  // Dynamic routes arrays
  const serviceRoutes = [];
  const blogRoutes = [];
  const inventoryRoutes = [];

  // 1. Fetch Services dynamically
  try {
    const { data } = await fetchFromAPI("services");
    if (data && Array.isArray(data.services)) {
      data.services.forEach((service) => {
        if (service.slug) {
          const typePath = service.type === "service-detail" ? "service-detail" : "service-fitment";
          serviceRoutes.push({
            url: `${baseUrl}/${typePath}/${service.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      });
    }
  } catch (error) {
    console.error("Error fetching services for sitemap:", error);
  }

  // 2. Fetch Blogs dynamically (handles pagination page-by-page)
  try {
    let currentPage = 1;
    const limit = 50;
    let keepFetching = true;

    while (keepFetching && currentPage <= 10) { // Safety cap of 500 blogs
      const { data, error } = await fetchFromAPI(`blogs?page=${currentPage}&limit=${limit}`);
      if (!error && Array.isArray(data) && data.length > 0) {
        data.forEach((blog) => {
          if (blog.link) {
            blogRoutes.push({
              url: `${baseUrl}${blog.link}`,
              lastModified: blog.date ? new Date(blog.date) : new Date(),
              changeFrequency: "weekly",
              priority: 0.6,
            });
          }
        });

        if (data.length < limit) {
          keepFetching = false;
        } else {
          currentPage++;
        }
      } else {
        keepFetching = false;
      }
    }
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
  }

  // 3. Fetch Inventories dynamically (handles pagination page-by-page)
  try {
    let currentPage = 1;
    const limit = 50;
    let keepFetching = true;

    while (keepFetching && currentPage <= 20) { // Safety cap of 1000 cars
      const { data, error } = await fetchFromAPI(`inventories/filtered?page=${currentPage}&limit=${limit}`);
      if (!error && Array.isArray(data) && data.length > 0) {
        data.forEach((car) => {
          if (car.shayan_code) {
            inventoryRoutes.push({
              url: `${baseUrl}/inventory/srcode=${car.shayan_code}`,
              lastModified: new Date(),
              changeFrequency: "weekly",
              priority: 0.8,
            });
          }
        });

        if (data.length < limit) {
          keepFetching = false;
        } else {
          currentPage++;
        }
      } else {
        keepFetching = false;
      }
    }
  } catch (error) {
    console.error("Error fetching inventories for sitemap:", error);
  }

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...inventoryRoutes];
}
