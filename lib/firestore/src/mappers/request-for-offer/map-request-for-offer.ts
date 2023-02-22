/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreRequestForOfferData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { propToMappedDocument } from '../../utils/mapper/prop-to-mapped-document'
import { propToMappedDocumentArray } from '../../utils/mapper/prop-to-mapped-document-array'
import { propToSubcollection } from '../../utils/mapper/prop-to-subcollection'
import { mapContract } from '../contract'
import { mapDiscordGuild } from '../discord-guild'
import { mapOffer } from '../offer/map-offer'
import { mapSwap } from '../swap/map-swap'
import { mapUser } from '../user'
import { mapRequestForOfferActivity } from './map-request-for-offer-activity'
import { mapRequestForOfferItem } from './map-request-for-offer-item'
import { RequestForOffer, RequestForOfferState } from '@echo/model'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { Dayjs } from 'dayjs'
import { andThen, juxt, pipe } from 'ramda'

export const mapRequestForOffer: FirestoreMapper<FirestoreRequestForOfferData, RequestForOffer> = andThen(
  pipe(
    juxt([
      // @ts-ignore
      propToPromise<string>('id'),
      // @ts-ignore
      propToPromise<RequestForOfferState>('state'),
      // @ts-ignore
      propToMappedDocument('sender', mapUser),
      // @ts-ignore
      propToMappedDocumentArray('items', mapRequestForOfferItem),
      // @ts-ignore
      propToMappedDocument('discordGuild', mapDiscordGuild),
      // @ts-ignore
      propToMappedDocumentArray('target', mapContract),
      // @ts-ignore
      propToSubcollection('activities', mapRequestForOfferActivity),
      // @ts-ignore
      propToMappedDocumentArray('offers', mapOffer),
      // @ts-ignore
      propToMappedDocumentArray('swaps', mapSwap),
      // @ts-ignore
      propToDate<Dayjs>('expiresAt'),
      // @ts-ignore
      propToDate('postedAt'),
      // @ts-ignore
      propToDate<Dayjs>('createdAt')
    ]),
    // @ts-ignore
    (promises) => Promise.all(promises),
    zipPromisesToObject<RequestForOffer>([
      'id',
      'state',
      'sender',
      'items',
      'discordGuild',
      'target',
      'activities',
      'offers',
      'swaps',
      'expiresAt',
      'postedAt',
      'createdAt'
    ])
  )
)
