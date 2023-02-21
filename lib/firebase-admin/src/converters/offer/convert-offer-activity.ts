import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreConverter } from '../../types/converter'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
import { FirestoreOfferActivity, FirestoreOfferActivityData } from '@echo/firestore'
import { toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const convertOfferActivity: FirestoreConverter<FirestoreOfferActivity, FirestoreOfferActivityData> = pipe<
  [FirestoreSnapshot<FirestoreOfferActivity>],
  FirestoreOfferActivityData,
  Promise<FirestoreOfferActivityData>
>(convertSnapshot, toPromise)
