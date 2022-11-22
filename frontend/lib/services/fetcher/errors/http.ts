export class HTTPError extends Error {
  constructor(url: string, status: number, error: string) {
    super(`${url} returned status ${status}: ${error}`)
  }
}
