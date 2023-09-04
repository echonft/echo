import { OfferItem } from '../../types/offer-item'
import { mapNftWithCollection } from './map-nft-with-collection'
import { OfferItemResponse } from '@echo/api'
import { modify, pipe } from 'ramda'

export function mapOfferItem(response: OfferItemResponse) {
  // FIXME Approved is not set here
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('nft', mapNftWithCollection)
  )(response) as OfferItem
}
