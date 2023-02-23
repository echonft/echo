/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreRequestForOffer, FirestoreRequestForOfferData } from '../../types'
import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
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
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertRequestForOffer: FirestoreConverter<FirestoreRequestForOffer, FirestoreRequestForOfferData> = pipe(
  convertSnapshot,
  juxt([
    // @ts-ignore
    propToPromise<string>('id'),
    // @ts-ignore
    propToPromise<string>('state'),
    // @ts-ignore
    refProp('sender', convertUser),
    // @ts-ignore
    nestedDocumentArrayProp('items', convertRequestForOfferItem),
    // @ts-ignore
    refProp('discordGuild', convertDiscordGuild),
    // @ts-ignore
    refArrayProp('target', convertContract),
    // @ts-ignore
    nestedDocumentArrayProp('activities', convertRequestForOfferActivity),
    // @ts-ignore
    refArrayProp('offers', convertOffer),
    // @ts-ignore
    refArrayProp('swaps', convertSwap),
    // @ts-ignore
    propToPromise<number>('expiresAt'),
    // @ts-ignore
    propToPromise<number | undefined>('postedAt'),
    // @ts-ignore
    propToPromise<number>('createdAt')
  ]),
  (promises) => Promise.all(promises),
  zipPromisesToObject<FirestoreRequestForOfferData>([
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
