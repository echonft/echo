import { NextRequest as NextServerRequest } from 'next/server'

export class NextRequest<T> extends NextServerRequest {
  json(): Promise<T> {
    return super.json() as Promise<T>
  }
}
