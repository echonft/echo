import { getAllOfferMocks } from '@echo/model/mocks/offer/get-all-offer-mocks'
import type { Offer } from '@echo/model/types/offer/offer'
import type { HexString } from '@echo/utils/types/hex-string'
import { find, isNil, propEq } from 'ramda'

export function getOfferMockByIdContract(idContract: HexString): Offer {
  const mock = find(propEq(idContract, 'idContract'), getAllOfferMocks())
  if (isNil(mock)) {
    throw Error(`wrong offer id contract: ${idContract}`)
  }
  return mock
}
