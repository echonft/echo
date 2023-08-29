import { both, equals, last, length, pipe } from 'ramda'
import { z } from 'zod'

export const getNftCollectionNftsRequestSchema = z.object({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  slug: z.custom<string[]>(both(pipe(length, equals(2)), pipe(last, equals('nfts'))), 'Invalid slug')
})
