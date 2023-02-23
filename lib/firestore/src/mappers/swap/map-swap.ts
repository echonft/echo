/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreSwapData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { propToMappedDocument } from '../../utils/mapper/prop-to-mapped-document'
import { propToMappedDocumentArray } from '../../utils/mapper/prop-to-mapped-document-array'
import { mapOffer } from '../offer/map-offer'
import { mapSwapActivity } from './map-swap-activity'
import { Swap, SwapState } from '@echo/model'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { Dayjs } from 'dayjs'
import { andThen, juxt, pipe } from 'ramda'

export const mapSwap: FirestoreMapper<FirestoreSwapData, Swap> = andThen(
  pipe(
    juxt([
      // @ts-ignore
      propToPromise<string>('id'),
      // @ts-ignore
      propToPromise<SwapState>('state'),
      // @ts-ignore
      propToMappedDocument('offer', mapOffer),
      // @ts-ignore
      propToMappedDocumentArray('activities', mapSwapActivity),
      // @ts-ignore
      propToDate<Dayjs>('expiresAt'),
      // @ts-ignore
      propToDate<Dayjs>('createdAt')
    ]),
    // @ts-ignore
    (promises) => Promise.all(promises),
    zipPromisesToObject<Swap>(['id', 'state', 'offer', 'activities', 'expiresAt', 'createdAt'])
  )
)
