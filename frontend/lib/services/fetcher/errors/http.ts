export class HTTPError<Response> extends Error {
  public res: Response
  public status: number
  constructor(url: string, res: Response, status: number) {
    super(`Error fetching: ${url}`)
    this.res = res
    this.status = status
  }
}
