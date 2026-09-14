const BASE_URL = 'http://localhost:5002'

export class ApiError extends Error {
  status: number
  errors?: Record<string, string[]>

  constructor(status: number, message: string, errors?: Record<string, string[]>) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  if (!response.ok) {
    let problem: { title?: string; errors?: Record<string, string[]> } = {}
    try {
      problem = await response.json()
    } catch {
      // No body in response
    }
    throw new ApiError(response.status, problem.title ?? response.statusText, problem.errors)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export const http = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}

export function queryString(params: Record<string, string | number | boolean | undefined>): string {
  const pairs = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => [key, String(value)])

  if (pairs.length === 0) {
    return ''
  }

  return `?${new URLSearchParams(pairs)}`
}
