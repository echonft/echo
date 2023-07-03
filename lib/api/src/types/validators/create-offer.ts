import { z } from 'zod'

export const createOfferSchema = z.discriminatedUnion('withRequestForOffer', [
  z.object({
    withRequestForOffer: z.literal(true),
    receiverItems: z.string().array().nonempty(),
    senderItems: z.string().array().nonempty(),
    requestForOfferId: z.string().nonempty(),
    receiverId: z.undefined(),
    discordGuildId: z.undefined()
  }),
  z.object({
    withRequestForOffer: z.literal(false),
    receiverItems: z.string().array().nonempty(),
    senderItems: z.string().array().nonempty(),
    requestForOfferId: z.undefined(),
    receiverId: z.string().nonempty(),
    discordGuildId: z.string().nonempty()
  })
])
