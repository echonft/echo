import type { Offer } from '@echo/model/types/offer'
import { getAllOfferMocks } from '@echo/model/mocks/offer/get-all-offer-mocks'
import { find, isNil, propEq } from 'ramda'

export function getOfferMockBySlug(slug: string): Offer {
  const mock = find(propEq(slug, 'slug'), getAllOfferMocks())
  if (isNil(mock)) {
    throw Error(`wrong offer mock slug: ${slug}`)
  }
  return mock
}
