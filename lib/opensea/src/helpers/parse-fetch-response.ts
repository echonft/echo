export function parseFetchResponse<T>(response: Response) {
  return response.json() as Promise<T>
}
