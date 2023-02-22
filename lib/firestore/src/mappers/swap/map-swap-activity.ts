import { FirestoreSwapActivityData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { OfferState, SwapActivity } from '@echo/model'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { Dayjs } from 'dayjs'
import { andThen, juxt, pipe } from 'ramda'

export const mapSwapActivity: FirestoreMapper<FirestoreSwapActivityData, SwapActivity> = andThen(
  pipe(
    juxt([
      propToPromise<string>('id'),
      propToDate<Dayjs>('date'),
      propToPromise<OfferState | undefined>('fromState'),
      propToPromise<OfferState>('toState')
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<SwapActivity>(['id', 'date', 'fromState', 'toState'])
  )
)
