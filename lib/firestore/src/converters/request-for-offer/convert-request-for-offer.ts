import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { FirestoreRequestForOffer } from '../../types/model/collections/request-for-offer/firestore-request-for-offer'
import { FirestoreRequestForOfferData } from '../../types/model/data/request-for-offer/firestore-request-for-offer-data'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converters/convert-root-collection-document-snapshot'
import { nestedDocumentArrayProp } from '../../utils/converters/nested-document-array-prop'
import { refArrayProp } from '../../utils/converters/ref-array-prop'
import { refProp } from '../../utils/converters/ref-prop'
import { convertActivity } from '../activity/convert-activity'
import { convertContract } from '../contract/convert-contract'
import { convertDiscordGuild } from '../discord-guild/convert-discord-guild'
import { convertNft } from '../nft/convert-nft'
import { convertOffer } from '../offer/convert-offer'
import { convertSwap } from '../swap/convert-swap'
import { convertUser } from '../user/convert-user'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertRequestForOffer: FirestoreConverter<FirestoreRequestForOffer, FirestoreRequestForOfferData> = pipe(
  convertRootCollectionDocumentSnapshot,
  juxt([
    propToPromise('refPath'),
    propToPromise('id'),
    propToPromise('state'),
    refProp('sender', convertUser),
    refArrayProp('items', convertNft),
    refProp('discordGuild', convertDiscordGuild),
    refArrayProp('target', convertContract),
    nestedDocumentArrayProp('activities', convertActivity),
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
