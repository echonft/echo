import type { FirestoreSwap } from '@echo/firestore/types/model/swap/firestore-swap'
import { getAllSwapMocks } from '@echo/firestore-mocks/swap/get-all-swap-mocks'
import { find, propEq } from 'ramda'

export function getSwapMockByOfferId(offerId: string) {
  const mocks = getAllSwapMocks()
  return find(propEq(offerId, 'offerId'), mocks) as FirestoreSwap
}
