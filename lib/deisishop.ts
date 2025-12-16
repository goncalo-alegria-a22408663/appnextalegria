export const apiUrl = "https://deisishop.pythonanywhere.com";

export function toAbsoluteUrl(url: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${apiUrl}${url}`;
  return `${apiUrl}/${url}`;
}

export async function swrFetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    let detail = "";
    try {
      const data = await res.json();
      detail = typeof data?.detail === "string" ? data.detail : JSON.stringify(data);
    } catch {
      detail = await res.text();
    }
    throw new Error(detail || `HTTP ${res.status}`);
  }

  return (await res.json()) as T;
}
