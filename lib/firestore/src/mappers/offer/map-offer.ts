/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreOfferData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { propToMappedDocument } from '../../utils/mapper/prop-to-mapped-document'
import { propToMappedDocumentArray } from '../../utils/mapper/prop-to-mapped-document-array'
import { mapDiscordGuild } from '../discord-guild'
import { mapUser } from '../user'
import { mapOfferActivity } from './map-offer-activity'
import { mapOfferItem } from './map-offer-item'
import { Offer, OfferState } from '@echo/model'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { Dayjs } from 'dayjs'
import { andThen, juxt, pipe } from 'ramda'

export const mapOffer: FirestoreMapper<FirestoreOfferData, Offer> = andThen(
  pipe(
    juxt([
      // @ts-ignore
      propToPromise<string>('id'),
      // @ts-ignore
      propToPromise<OfferState>('state'),
      // @ts-ignore
      propToMappedDocument('discordGuild', mapDiscordGuild),
      // @ts-ignore
      propToPromise<string | undefined>('threadId'),
      // @ts-ignore
      propToMappedDocument('sender', mapUser),
      // @ts-ignore
      propToMappedDocumentArray('senderItems', mapOfferItem),
      // @ts-ignore
      propToMappedDocument('receiver', mapUser),
      // @ts-ignore
      propToMappedDocumentArray('receiverItems', mapOfferItem),
      // @ts-ignore
      propToMappedDocumentArray('activities', mapOfferActivity),
      // @ts-ignore
      propToDate<Dayjs>('expiresAt'),
      // @ts-ignore
      propToDate('postedAt'),
      // @ts-ignore
      propToDate<Dayjs>('createdAt')
    ]),
    // @ts-ignore
    (promises) => Promise.all(promises),
    zipPromisesToObject<Offer>([
      'id',
      'state',
      'discordGuild',
      'threadId',
      'sender',
      'senderItems',
      'receiver',
      'receiverItems',
      'activities',
      'expiresAt',
      'postedAt',
      'createdAt'
    ])
  )
)
