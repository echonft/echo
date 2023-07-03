import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { FirestoreOffer } from '../../types/model/collections/offer/firestore-offer'
import { FirestoreOfferData } from '../../types/model/data/offer/firestore-offer-data'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converter/convert-root-collection-document-snapshot'
import { nestedDocumentArrayProp } from '../../utils/converter/nested-document-array-prop'
import { refArrayProp } from '../../utils/converter/ref-array-prop'
import { refProp } from '../../utils/converter/ref-prop'
import { convertDiscordGuild } from '../discord-guild/convert-discord-guild'
import { convertNft } from '../nft/convert-nft'
import { convertUser } from '../user/convert-user'
import { convertOfferActivity } from './convert-offer-activity'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertOffer: FirestoreConverter<FirestoreOffer, FirestoreOfferData> = pipe(
  convertRootCollectionDocumentSnapshot,
  juxt([
    propToPromise('refPath'),
    propToPromise('id'),
    propToPromise('state'),
    refProp('discordGuild', convertDiscordGuild),
    propToPromise('threadId'),
    refProp('sender', convertUser),
    refArrayProp('senderItems', convertNft),
    refProp('receiver', convertUser),
    refArrayProp('receiverItems', convertNft),
    nestedDocumentArrayProp('activities', convertOfferActivity),
    propToPromise('postedAt'),
    propToPromise('expiresAt'),
    propToPromise('createdAt')
  ]),
  promiseAll,
  zipPromisesToObject<FirestoreOfferData>([
    'refPath',
    'id',
    'state',
    'discordGuild',
    'threadId',
    'sender',
    'senderItems',
    'receiver',
    'receiverItems',
    'activities',
    'postedAt',
    'expiresAt',
    'createdAt'
  ])
)
