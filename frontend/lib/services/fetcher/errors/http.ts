export class HTTPError extends Error {
  public info: any
  public status: number
  constructor(url: string, info: any, status: number) {
    super(`Error fetching: ${url}`)
    this.info = info
    this.status = status
  }
}
