import { NextResponse } from 'next/server'

export function toNextReponse<T extends object>(obj: T) {
  return NextResponse.json<T>(obj)
}
