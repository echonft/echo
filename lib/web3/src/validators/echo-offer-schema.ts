import type { Chain } from '@echo/model/constants/chain'
import { chainId } from '@echo/model/helpers/chain/chain-id'
import { evmAddressSchema } from '@echo/model/validators/evm-address-schema'
import { EchoOfferState } from '@echo/web3/constants/echo-offer-state'
import { literal, nativeEnum, number, object } from 'zod'

const offerItemSchema = object({
  tokenAddress: evmAddressSchema,
  tokenId: number().int().positive()
})

function offerItemsSchema(chain: Chain) {
  return object({
    chainId: literal(chainId(chain)),
    items: offerItemSchema.array().nonempty()
  })
}

export function echoOfferSchema(chain: Chain) {
  return object({
    sender: evmAddressSchema,
    receiver: evmAddressSchema,
    senderItems: offerItemsSchema(chain),
    receiverItems: offerItemsSchema(chain),
    expiration: number().int().positive(),
    state: nativeEnum(EchoOfferState)
  })
}
