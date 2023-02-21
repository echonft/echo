/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreConverter } from '../../types/converter'
import { ConvertOfferOptions } from '../../types/converter/offer/convert-offer-options'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
import { nestedDocumentArrayProp } from '../../utils/converter/nested-document/nested-document-array-prop'
import { refProp } from '../../utils/converter/ref-prop'
import { subcollectionProp } from '../../utils/converter/subcollection/subcollection-prop'
import { convertDiscordGuild } from '../discord-guild/convert-discord-guild'
import { convertUser } from '../user/convert-user'
import { convertOfferActivity } from './convert-offer-activity'
import { convertOfferItem } from './convert-offer-item'
import { FirestoreOffer, FirestoreOfferData } from '@echo/firestore'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, partialRight, pipe } from 'ramda'

export const convertOffer: (options: ConvertOfferOptions) => FirestoreConverter<FirestoreOffer, FirestoreOfferData> = (
  options
) =>
  pipe(
    partialRight(convertSnapshot, [['activities']]),
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
      refProp('sender', convertUser({ wallets: { getDocs: false } })),
      // @ts-ignore
      nestedDocumentArrayProp('senderItems', convertOfferItem),
      // @ts-ignore
      refProp('receiver', convertUser({ wallets: { getDocs: false } })),
      // @ts-ignore
      nestedDocumentArrayProp('receiverItems', convertOfferItem),
      // @ts-ignore
      subcollectionProp('activities', options.activities, convertOfferActivity),
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
