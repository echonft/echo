import { FirestoreRequestForOfferData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToDate } from '../../utils/mapper/prop-to-date'
import { propToMappedDocument } from '../../utils/mapper/prop-to-mapped-document'
import { propToMappedDocumentArray } from '../../utils/mapper/prop-to-mapped-document-array'
import { mapContract } from '../contract'
import { mapDiscordGuild } from '../discord-guild'
import { mapOffer } from '../offer/map-offer'
import { mapSwap } from '../swap/map-swap'
import { mapUser } from '../user'
import { mapRequestForOfferActivity } from './map-request-for-offer-activity'
import { mapRequestForOfferItem } from './map-request-for-offer-item'
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
      propToMappedDocumentArray('items', mapRequestForOfferItem),
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
