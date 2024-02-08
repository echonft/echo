import { head, pipe, split } from 'ramda'

export function removeQueryFromUrl(url: string): string {
  return pipe<[string], string[], string>(split('?'), head)(url)
}
