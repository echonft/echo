import { FirestoreConverter } from '../../types/converter'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
import { FirestoreSwapActivity, FirestoreSwapActivityData } from '@echo/firestore'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertSwapActivity: FirestoreConverter<FirestoreSwapActivity, FirestoreSwapActivityData> = pipe(
  convertSnapshot,
  juxt([
    propToPromise<string>('id'),
    propToPromise<number>('date'),
    propToPromise<string | undefined>('fromState'),
    propToPromise<string>('toState')
  ]),
  (promises) => Promise.all(promises),
  zipPromisesToObject<FirestoreSwapActivityData>(['id', 'date', 'fromState', 'toState'])
)
