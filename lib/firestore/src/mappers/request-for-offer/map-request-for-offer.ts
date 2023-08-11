import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreRequestForOfferData } from '../../types/model/data/request-for-offer/firestore-request-for-offer-data'
import { propToDate } from '../../utils/mappers/prop-to-date'
import { propToMappedDocument } from '../../utils/mappers/prop-to-mapped-document'
import { propToMappedDocumentArray } from '../../utils/mappers/prop-to-mapped-document-array'
import { mapContract } from '../contract/map-contract'
import { mapDiscordGuild } from '../discord-guild/map-discord-guild'
import { mapNft } from '../nft/map-nft'
import { mapOffer } from '../offer/map-offer'
import { mapSwap } from '../swap/map-swap'
import { mapUser } from '../user/map-user'
import { mapRequestForOfferActivity } from './map-request-for-offer-activity'
import { RequestForOffer } from '@echo/model'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, omit, pipe } from 'ramda'

export const mapRequestForOffer: FirestoreMapper<FirestoreRequestForOfferData, RequestForOffer> = andThen(
  pipe(
    omit(['refPath']),
    juxt([
      propToPromise('id'),
      propToPromise('state'),
      propToMappedDocument('sender', mapUser),
      propToMappedDocumentArray('items', mapNft),
      propToMappedDocument('discordGuild', mapDiscordGuild),
      propToMappedDocumentArray('target', mapContract),
      propToMappedDocumentArray('activities', mapRequestForOfferActivity),
      propToMappedDocumentArray('offers', mapOffer),
      propToMappedDocumentArray('swaps', mapSwap),
      propToDate('expiresAt'),
      propToDate('postedAt'),
      propToDate('createdAt')
    ]),
    promiseAll,
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
