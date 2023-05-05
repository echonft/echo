/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreRequestForOfferActivity } from '@echo/firestore'
import { RequestForOfferState } from '@echo/model'

export const firestoreRequestForOfferActivities: FirestoreRequestForOfferActivity[] = [
  {
    date: 1676984897,
    toState: RequestForOfferState.CREATED
  },
  {
    date: 1676900000,
    toState: RequestForOfferState.EXPIRED,
    fromState: RequestForOfferState.CREATED
  }
]
