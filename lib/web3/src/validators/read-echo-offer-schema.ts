import type { Chain } from '@echo/model/constants/chain'
import { evmAddressSchema } from '@echo/model/validators/evm-address-schema'
import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import type { HexString } from '@echo/utils/types/hex-string'
import { EchoOfferState } from '@echo/web3/constants/echo-offer-state'
import { echoOfferSchema } from '@echo/web3/validators/echo-offer-schema'
import { applySpec, head, map, pipe, prop, toLower } from 'ramda'
import { bigint, nativeEnum, object, tuple, z } from 'zod'

type ReadContractOfferItem = z.infer<typeof itemSchema>
type ReadContractOfferItems = z.infer<typeof itemsSchema>

const itemSchema = object({
  tokenAddress: evmAddressSchema,
  tokenIdOrAmount: bigint().positive(),
  tokenType: bigint().positive() // TODO transform? what are the possible types?
})

const itemsSchema = object({
  chainId: bigint().positive(),
  items: itemSchema.array().nonempty()
})

function mapItem(readContractOfferItem: ReadContractOfferItem) {
  return applySpec({
    tokenAddress: pipe(prop('tokenAddress'), toLower<HexString>),
    tokenIdOrAmount: pipe(prop('tokenIdOrAmount'), Number),
    tokenType: pipe(prop('tokenType'), Number)
  })(readContractOfferItem)
}

function mapItems(readContractOfferItems: ReadContractOfferItems) {
  return applySpec({
    chainId: pipe(prop('chainId'), Number),
    items: pipe(prop('items'), map(mapItem))
  })(readContractOfferItems)
}

export function readEchoOfferSchema(chain: Chain) {
  return tuple([
    hexStringSchema,
    hexStringSchema,
    itemsSchema,
    itemsSchema,
    bigint().positive(),
    nativeEnum(EchoOfferState)
  ])
    .transform(
      applySpec({
        sender: pipe(head, toLower),
        receiver: pipe(prop(1), toLower),
        senderItems: pipe(prop(2), mapItems),
        receiverItems: pipe(prop(3), mapItems),
        expiration: pipe(prop(4), Number),
        state: prop(5)
      })
    )
    .pipe(echoOfferSchema(chain))
}
