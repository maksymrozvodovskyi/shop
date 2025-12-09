export async function apiGet<T>(path: string): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api${path}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    let errorMessage = `Failed to fetch from Strapi (${res.status})`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.error?.message || errorMessage;
    } catch {
      // If response is not JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return res.json() as Promise<T>;
}
