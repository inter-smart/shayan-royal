const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/web/` || "http://localhost:3001";
export const MEDIA_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "APIError";
    this.status = status;
  }
}

export async function fetchFromAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "force-cache",
    next: { revalidate: 60 },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      return {
        data: null,
        error: true,
      };
    }

    const data = await response.json();

    return {
      data: data?.success ? data?.data : null,
      error: !data?.success,
    };
  } catch (error) {
    return {
      data: null,
      error: true,
    };
  }
}
