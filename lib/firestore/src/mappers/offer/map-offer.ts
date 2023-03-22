import { FirestoreOfferData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { propToMappedDocument } from '../../utils/mapper/prop-to-mapped-document'
import { propToMappedDocumentArray } from '../../utils/mapper/prop-to-mapped-document-array'
import { mapDiscordGuild } from '../discord-guild'
import { mapUser } from '../user'
import { mapOfferActivity } from './map-offer-activity'
import { mapOfferItem } from './map-offer-item'
import { Offer } from '@echo/model'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, omit, pipe } from 'ramda'

export const mapOffer: FirestoreMapper<FirestoreOfferData, Offer> = andThen(
  pipe(
    omit(['refPath']),
    juxt([
      propToPromise('id'),
      propToPromise('state'),
      propToMappedDocument('discordGuild', mapDiscordGuild),
      propToPromise('threadId'),
      propToMappedDocument('sender', mapUser),
      propToMappedDocumentArray('senderItems', mapOfferItem),
      propToMappedDocument('receiver', mapUser),
      propToMappedDocumentArray('receiverItems', mapOfferItem),
      propToMappedDocumentArray('activities', mapOfferActivity),
      propToDate('expiresAt'),
      propToDate('postedAt'),
      propToDate('createdAt')
    ]),
    promiseAll,
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
