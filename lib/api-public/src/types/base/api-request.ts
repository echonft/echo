import { NextRequest } from 'next/server'

export class ApiRequest<T> extends NextRequest {
  json(): Promise<T> {
    return super.json() as Promise<T>
  }
}
