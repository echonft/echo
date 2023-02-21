import { FirestoreConverter, FirestoreOfferActivity, FirestoreOfferActivityData } from '../../types'
import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
import { toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const convertOfferActivity: FirestoreConverter<FirestoreOfferActivity, FirestoreOfferActivityData> = pipe<
  [FirestoreSnapshot<FirestoreOfferActivity>],
  FirestoreOfferActivityData,
  Promise<FirestoreOfferActivityData>
>(convertSnapshot, toPromise)
