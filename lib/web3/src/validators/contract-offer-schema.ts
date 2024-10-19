import type { Chain } from '@echo/utils/constants/chain'
import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { ContractOfferState } from '@echo/web3/types/contract-offer-state'
import { literal, nativeEnum, number, object } from 'zod'

const offerItemSchema = object({
  tokenAddress: evmAddressSchema,
  tokenId: number().int().positive()
})

function offerItemsSchema(chain: Chain) {
  return object({
    chainId: literal(getChainId(chain)),
    items: offerItemSchema.array().nonempty()
  })
}
export function contractOfferSchema(chain: Chain) {
  return object({
    sender: evmAddressSchema,
    receiver: evmAddressSchema,
    senderItems: offerItemsSchema(chain),
    receiverItems: offerItemsSchema(chain),
    expiration: number().int().positive(),
    state: nativeEnum(ContractOfferState)
  })
}
