/* eslint-disable @typescript-eslint/ban-ts-comment */
import { contractReferences } from '../contract/contract-reference'
import { FirestoreRequestForOfferItem } from '@echo/firestore'

export const firestoreRequestForOfferItems: FirestoreRequestForOfferItem[] = [
  {
    // @ts-ignore
    contract: contractReferences['37dBlwJYahEAKeL0rNP8']!,
    tokenId: '1'
  },
  {
    // @ts-ignore
    contract: contractReferences['37dBlwJYahEAKeL0rNP8']!,
    tokenId: '10',
    balance: 1
  }
]
