import { offerItem } from './offer-item'
import { z } from 'zod'

export const createOfferSchema = z.discriminatedUnion('withRequestForOffer', [
  z.object({
    withRequestForOffer: z.literal(true),
    receiverItems: offerItem.array().nonempty(),
    senderItems: offerItem.array().nonempty(),
    requestForOfferId: z.string().nonempty(),
    receiverId: z.undefined(),
    discordGuildId: z.undefined()
  }),
  z.object({
    withRequestForOffer: z.literal(false),
    receiverItems: offerItem.array().nonempty(),
    senderItems: offerItem.array().nonempty(),
    requestForOfferId: z.undefined(),
    receiverId: z.string().nonempty(),
    discordGuildId: z.string().nonempty()
  })
])
