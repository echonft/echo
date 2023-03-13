import { OfferItem } from '@echo/model'
import { castAs, isNilOrEmpty, returns } from '@echo/utils'
import { ifElse, join, juxt, map, path, pipe, prop } from 'ramda'

// TODO This logic might need to be reviewed
export const stringForOfferItems: (items: OfferItem[] | undefined) => string = ifElse<
  [OfferItem[]] | [undefined],
  string,
  string
>(
  isNilOrEmpty,
  returns('Any NFT'),
  pipe(castAs, map(pipe(juxt([prop('tokenId'), path(['contract', 'address'])]), join(':'))), join(','))
)
