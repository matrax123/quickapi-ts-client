import axios, { AxiosError, AxiosInstance } from "axios";
import type { ApiError } from "./types";

export function createApiClient(baseURL: string) {
  const apiClient: AxiosInstance = axios.create({
    baseURL,
    timeout: 30000,
    headers: { "Content-Type": "application/json" },
  });

  async function apiGet<T = any>(endpoint: string, params: object = {}): Promise<T | ApiError> {
    try {
      const res = await apiClient.get(endpoint, { params });
      return res.data as T;
    } catch (err) {
      return handleError(err);
    }
  }

  async function apiPost<T = any>(endpoint: string, body: object = {}): Promise<T | ApiError> {
    try {
      const res = await apiClient.post(endpoint, body);
      return res.data as T;
    } catch (err) {
      return handleError(err);
    }
  }

  async function apiPut<T = any>(endpoint: string, body: object = {}): Promise<T | ApiError> {
    try {
      const res = await apiClient.put(endpoint, body);
      return res.data as T;
    } catch (err) {
      return handleError(err);
    }
  }

  async function apiDelete<T = any>(endpoint: string): Promise<T | ApiError> {
    try {
      const res = await apiClient.delete(endpoint);
      return res.data as T;
    } catch (err) {
      return handleError(err);
    }
  }

  function handleError(err: unknown): ApiError {
    if (axios.isAxiosError(err)) {
      const e = err as AxiosError<any>;
      if (e.response) {
        return {
          status: e.response.status,
          message: e.response.data?.message || e.message || "API_ERROR",
          data: e.response.data,
        };
      } else if (e.request) {
        return { status: 500, message: "NO_RESPONSE_FROM_API" };
      }
    }
    return { status: 500, message: (err as Error).message || "UNKNOWN_ERROR" };
  }

  return { apiGet, apiPost, apiPut, apiDelete };
}
