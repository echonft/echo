/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { ConvertRequestForOfferOptions } from '../../types/converter/request-for-offer/convert-request-for-offer-options'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
import { nestedDocumentArrayProp } from '../../utils/converter/nested-document/nested-document-array-prop'
import { refArrayProp } from '../../utils/converter/ref-array-prop'
import { refProp } from '../../utils/converter/ref-prop'
import { subcollectionProp } from '../../utils/converter/subcollection/subcollection-prop'
import { convertContract } from '../contract/convert-contract'
import { convertDiscordGuild } from '../discord-guild/convert-discord-guild'
import { convertOffer } from '../offer/convert-offer'
import { convertSwap } from '../swap/convert-swap'
import { convertUser } from '../user/convert-user'
import { convertRequestForOfferActivity } from './convert-request-for-offer-activity'
import { convertRequestForOfferItem } from './convert-request-for-offer-item'
import { FirestoreRequestForOffer, FirestoreRequestForOfferData } from '@echo/firestore'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, partialRight, pipe } from 'ramda'

export const convertRequestForOffer: (
  options: ConvertRequestForOfferOptions
) => FirestoreConverter<FirestoreRequestForOffer, FirestoreRequestForOfferData> = (options) =>
  pipe(
    partialRight(convertSnapshot, [['activities']]),
    juxt([
      // @ts-ignore
      propToPromise<string>('id'),
      // @ts-ignore
      propToPromise<string>('state'),
      // @ts-ignore
      refProp('sender', convertUser({ wallets: { getDocs: false } })),
      // @ts-ignore
      nestedDocumentArrayProp('items', convertRequestForOfferItem),
      // @ts-ignore
      refProp('discordGuild', convertDiscordGuild),
      // @ts-ignore
      refArrayProp('target', convertContract),
      // @ts-ignore
      subcollectionProp('activities', options.activities, convertRequestForOfferActivity),
      // @ts-ignore
      refArrayProp('offers', convertOffer({ activities: { getDocs: false } })),
      // @ts-ignore
      refArrayProp('swaps', convertSwap({ activities: { getDocs: false } })),
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
