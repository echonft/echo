/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreSwap, FirestoreSwapData } from '../../types'
import { FirestoreConverter } from '../../types/converter'
import { ConvertSwapOptions } from '../../types/converter/swap/convert-swap-options'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
import { refProp } from '../../utils/converter/ref-prop'
import { subcollectionProp } from '../../utils/converter/subcollection/subcollection-prop'
import { convertOffer } from '../offer/convert-offer'
import { convertSwapActivity } from './convert-swap-activity'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, partialRight, pipe } from 'ramda'

export const convertSwap: (options: ConvertSwapOptions) => FirestoreConverter<FirestoreSwap, FirestoreSwapData> = (
  options
) =>
  pipe(
    partialRight(convertSnapshot, [['activities']]),
    juxt([
      // @ts-ignore
      propToPromise<string>('id'),
      // @ts-ignore
      propToPromise<string>('state'),
      // @ts-ignore
      refProp('offer', convertOffer({ activities: { getDocs: false } })),
      // @ts-ignore
      subcollectionProp('activities', options.activities, convertSwapActivity),
      // @ts-ignore
      propToPromise<number>('expiresAt'),
      // @ts-ignore
      propToPromise<number>('createdAt')
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<FirestoreSwapData>(['id', 'state', 'offer', 'activities', 'expiresAt', 'createdAt'])
  )
