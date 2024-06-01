// TODO replace with zod validators
export function parseFetchResponse<T>(response: Response) {
  return response.json() as Promise<T>
}
