import type { Chain } from '@echo/model/constants/chain'
import { chainId } from '@echo/model/helpers/chain/chain-id'
import { evmAddressSchema } from '@echo/model/validators/evm-address-schema'
import { ContractOfferState } from '@echo/web3/types/contract-offer-state'
import { literal, nativeEnum, number, object } from 'zod'

const offerItemSchema = object({
  tokenAddress: evmAddressSchema,
  tokenId: number().int().positive().readonly()
}).readonly()

function offerItemsSchema(chain: Chain) {
  return object({
    chainId: literal(chainId(chain)).readonly(),
    items: offerItemSchema.array().nonempty().readonly()
  }).readonly()
}
export function contractOfferSchema(chain: Chain) {
  return object({
    sender: evmAddressSchema,
    receiver: evmAddressSchema,
    senderItems: offerItemsSchema(chain).readonly(),
    receiverItems: offerItemsSchema(chain).readonly(),
    expiration: number().int().positive().readonly(),
    state: nativeEnum(ContractOfferState).readonly()
  }).readonly()
}
