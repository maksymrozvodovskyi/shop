export async function apiGet<T>(path: string): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api${path}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch from Strapi");

  return res.json() as Promise<T>;
}
