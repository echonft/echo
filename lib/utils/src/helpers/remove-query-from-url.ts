import { head, pipe, split } from 'ramda'

export function removeQueryFromUrl(url: string): string {
  return pipe<[string], string[], string, string[], string>(split('?'), head, split('='), head)(url)
}
