import { OfferItem } from '@echo/model'
import { castAs, isNilOrEmpty } from '@echo/utils'
import { always, ifElse, join, juxt, map, path, pipe, prop } from 'ramda'

// TODO This logic might need to be reviewed
export const stringForOfferItems: (items: OfferItem[] | undefined) => string = ifElse<
  [OfferItem[]] | [undefined],
  string,
  string
>(
  isNilOrEmpty,
  always('Any NFT'),
  pipe(castAs, map(pipe(juxt([prop('tokenId'), path(['contract', 'address'])]), join(':'))), join(','))
)
