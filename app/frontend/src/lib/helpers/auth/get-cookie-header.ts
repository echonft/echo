import { cookies } from 'next/headers'
import { invoker, join, juxt, map, pipe, prop } from 'ramda'

export function getCookieHeader(): string {
  return pipe(invoker(0, 'getAll'), map(pipe(juxt([prop('name'), prop('value')]), join('='))), join(';'))(cookies())
}
