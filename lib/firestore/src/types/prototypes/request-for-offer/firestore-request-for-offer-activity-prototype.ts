import { FirestoreRequestForOfferState } from '../../model/data/request-for-offer/firestore-request-for-offer-state'
import { FirestorePrototypeData } from '../base/firestore-prototype-data'
import dayjs from 'dayjs'

export interface FirestoreRequestForOfferActivityPrototype extends FirestorePrototypeData {
  date: dayjs.Dayjs
  fromState: FirestoreRequestForOfferState | undefined
  toState: FirestoreRequestForOfferState
}
