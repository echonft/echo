import { addressSchema } from '@echo/model/validators/address-schema'
import { EchoOfferState } from '@echo/web3/constants/echo-offer-state'
import { nativeEnum, number, object } from 'zod'

const offerItemSchema = object({
  tokenAddress: addressSchema,
  tokenIdOrAmount: number().int().positive(),
  tokenType: number().int().min(0).max(1)
})

export const echoOfferSchema = object({
  sender: addressSchema,
  receiver: addressSchema,
  senderItems: object({
    items: offerItemSchema.array().nonempty()
  }),
  receiverItems: object({
    items: offerItemSchema.array().nonempty()
  }),
  expiration: number().int().positive(),
  state: nativeEnum(EchoOfferState)
})
