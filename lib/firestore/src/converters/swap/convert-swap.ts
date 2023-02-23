/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreSwap, FirestoreSwapData } from '../../types'
import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
import { nestedDocumentArrayProp } from '../../utils/converter/nested-document-array-prop'
import { refProp } from '../../utils/converter/ref-prop'
import { convertOffer } from '../offer/convert-offer'
import { convertSwapActivity } from './convert-swap-activity'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertSwap: FirestoreConverter<FirestoreSwap, FirestoreSwapData> = pipe(
  convertSnapshot,
  juxt([
    // @ts-ignore
    propToPromise<string>('id'),
    // @ts-ignore
    propToPromise<string>('state'),
    // @ts-ignore
    refProp('offer', convertOffer),
    // @ts-ignore
    nestedDocumentArrayProp('activities', convertSwapActivity),
    // @ts-ignore
    propToPromise<number>('expiresAt'),
    // @ts-ignore
    propToPromise<number>('createdAt')
  ]),
  (promises) => Promise.all(promises),
  zipPromisesToObject<FirestoreSwapData>(['id', 'state', 'offer', 'activities', 'expiresAt', 'createdAt'])
)
