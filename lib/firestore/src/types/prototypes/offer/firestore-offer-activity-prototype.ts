import { FirestoreOfferState } from '../../model/data/offer/firestore-offer-state'
import { FirestorePrototypeData } from '../base/firestore-prototype-data'
import dayjs from 'dayjs'

export interface FirestoreOfferActivityPrototype extends FirestorePrototypeData {
  date: dayjs.Dayjs
  fromState: FirestoreOfferState | undefined
  toState: FirestoreOfferState
}
