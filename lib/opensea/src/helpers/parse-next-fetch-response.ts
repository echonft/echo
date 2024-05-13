export function parseNextFetchResponse<T>(response: Response) {
  return response.json() as Promise<T>
}
