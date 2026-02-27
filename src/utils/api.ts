import { getAccessToken, removeAccessToken } from "@/utils/auth";

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

interface ApiOptions extends RequestInit {
  data?: unknown;
  useAuth?: boolean;
  params?: Record<string, string | number | boolean | undefined | null>;
}

function getApiBase(): string {
  const env = import.meta.env.VITE_API_URL as string | undefined;
  const url = env ?? `${window.location.origin}/api`;
  return url.endsWith("/") ? url : `${url}/`;
}

function joinUrl(base: string, path: string): string {
  const baseURL = new URL(base, window.location.origin);
  return new URL(path, baseURL).toString();
}

function buildUrl(base: string, params?: ApiOptions["params"]): string {
  const url = new URL(base);
  if (!params) return url.toString();

  for (const [k, v] of Object.entries(params)) {
    if (v == null) continue;
    const value = String(v).trim();
    if (value === "") continue;
    url.searchParams.set(k, value);
  }

  return url.toString();
}

export interface ResponseWrapper<T> {
  status: string;
  message?: string;
  data: T;
}

export async function api<T = unknown>(
  url: string,
  opts: ApiOptions = {},
): Promise<ResponseWrapper<T>> {
  const { headers = {}, data, useAuth = true, params, ...rest } = opts;

  const apiBase = getApiBase();
  const requestHeaders = new Headers(headers);
  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json");
  }
  const token = getAccessToken();

  let body = rest.body ?? undefined;
  if (body == null && data !== undefined) {
    body = JSON.stringify(data);
  }
  if (body && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (useAuth && token && !requestHeaders.has("Authorization")) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const fullUrl = buildUrl(joinUrl(apiBase, url), params);

  const response = await fetch(fullUrl, {
    headers: requestHeaders,
    mode: "cors",
    ...rest,
    body,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;
    const message =
      (payload.message as string | undefined) ?? response.statusText;
    const err = new ApiError(response.status, message, payload);

    if (response.status === 401) {
      removeAccessToken();
      window.location.href = "/login";
      throw err;
    }

    throw err;
  }

  return (await response.json()) as ResponseWrapper<T>;
}
