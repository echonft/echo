import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreOfferData } from '../../types/model/data/offer/firestore-offer-data'
import { propToDate } from '../../utils/mappers/prop-to-date'
import { propToMappedDocument } from '../../utils/mappers/prop-to-mapped-document'
import { propToMappedDocumentArray } from '../../utils/mappers/prop-to-mapped-document-array'
import { mapDiscordGuild } from '../discord-guild/map-discord-guild'
import { mapNft } from '../nft/map-nft'
import { mapUser } from '../user/map-user'
import { mapOfferActivity } from './map-offer-activity'
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
      propToMappedDocumentArray('senderItems', mapNft),
      propToMappedDocument('receiver', mapUser),
      propToMappedDocumentArray('receiverItems', mapNft),
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
