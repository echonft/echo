import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { FirestoreRequestForOffer } from '../../types/model/collections/request-for-offer/firestore-request-for-offer'
import { FirestoreRequestForOfferData } from '../../types/model/data/request-for-offer/firestore-request-for-offer-data'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converter/convert-root-collection-document-snapshot'
import { nestedDocumentArrayProp } from '../../utils/converter/nested-document-array-prop'
import { refArrayProp } from '../../utils/converter/ref-array-prop'
import { refProp } from '../../utils/converter/ref-prop'
import { convertContract } from '../contract/convert-contract'
import { convertDiscordGuild } from '../discord-guild/convert-discord-guild'
import { convertOffer } from '../offer/convert-offer'
import { convertSwap } from '../swap/convert-swap'
import { convertUser } from '../user/convert-user'
import { convertRequestForOfferActivity } from './convert-request-for-offer-activity'
import { convertRequestForOfferItem } from './convert-request-for-offer-item'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertRequestForOffer: FirestoreConverter<FirestoreRequestForOffer, FirestoreRequestForOfferData> = pipe(
  convertRootCollectionDocumentSnapshot,
  juxt([
    propToPromise('refPath'),
    propToPromise('id'),
    propToPromise('state'),
    refProp('sender', convertUser),
    nestedDocumentArrayProp('items', convertRequestForOfferItem),
    refProp('discordGuild', convertDiscordGuild),
    refArrayProp('target', convertContract),
    nestedDocumentArrayProp('activities', convertRequestForOfferActivity),
    refArrayProp('offers', convertOffer),
    refArrayProp('swaps', convertSwap),
    propToPromise('expiresAt'),
    propToPromise('postedAt'),
    propToPromise('createdAt')
  ]),
  promiseAll,
  zipPromisesToObject<FirestoreRequestForOfferData>([
    'refPath',
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
