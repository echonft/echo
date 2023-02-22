import { FirestoreConverter, FirestoreSwapActivity, FirestoreSwapActivityData } from '../../types'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
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
