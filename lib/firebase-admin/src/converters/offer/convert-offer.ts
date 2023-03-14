/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
import { nestedDocumentArrayProp } from '../../utils/converter/nested-document-array-prop'
import { refProp } from '../../utils/converter/ref-prop'
import { convertDiscordGuild } from '../discord-guild/convert-discord-guild'
import { convertUser } from '../user/convert-user'
import { convertOfferActivity } from './convert-offer-activity'
import { convertOfferItem } from './convert-offer-item'
import { FirestoreOffer, FirestoreOfferData } from '@echo/firestore'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertOffer: FirestoreConverter<FirestoreOffer, FirestoreOfferData> = pipe(
  convertSnapshot,
  juxt([
    // @ts-ignore
    propToPromise<string>('id'),
    // @ts-ignore
    propToPromise<string>('state'),
    // @ts-ignore
    refProp('discordGuild', convertDiscordGuild),
    // @ts-ignore
    propToPromise<string | undefined>('threadId'),
    // @ts-ignore
    refProp('sender', convertUser),
    // @ts-ignore
    nestedDocumentArrayProp('senderItems', convertOfferItem),
    // @ts-ignore
    refProp('receiver', convertUser),
    // @ts-ignore
    nestedDocumentArrayProp('receiverItems', convertOfferItem),
    // @ts-ignore
    nestedDocumentArrayProp('activities', convertOfferActivity),
    // @ts-ignore
    propToPromise<number | undefined>('postedAt'),
    // @ts-ignore
    propToPromise<number>('expiresAt'),
    // @ts-ignore
    propToPromise<number>('createdAt')
  ]),
  (promises) => Promise.all(promises),
  zipPromisesToObject<FirestoreOfferData>([
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
