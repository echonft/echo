import type { Chain } from '@echo/model/constants/chain'
import { chainId } from '@echo/model/helpers/chain/chain-id'
import type { ChainId } from '@echo/model/types/chain'
import type { Item } from '@echo/model/types/item'
import type { BaseOffer } from '@echo/model/types/base-offer'
import type { HexString } from '@echo/utils/types/hex-string'
import { hashNfts } from '@echo/web3/helpers/hash-nfts'
import { applySpec, head, juxt, type NonEmptyArray, partial, path, pipe, prop, toLower } from 'ramda'
import { encodeAbiParameters, keccak256, parseAbiParameters } from 'viem'

interface OfferAbiParameters {
  sender: HexString
  receiver: HexString
  senderItemsChainId: bigint
  senderItems: HexString
  receiverItemsChainId: bigint
  receiverItems: HexString
  expiration: bigint
}

/**
 * Recreate the offer ID generation from the contract to properly create the offer in the database
 * An offer ID is generated from keccak and encoding of its parameters.
 * See _generateOfferId on contract for details
 * @param offer The offer to generate the id from
 */
export function generateOfferId(offer: BaseOffer): Lowercase<HexString> {
  const params = parseAbiParameters([
    'struct Offer { address sender; address receiver; uint256 senderItemsChainId; bytes32 senderItems; uint256 receiverItemsChainId; bytes32 receiverItems; uint256 expiration; }',
    'Offer'
  ])
  return pipe(
    juxt([
      applySpec<OfferAbiParameters>({
        sender: path(['sender', 'wallet', 'address']),
        receiver: path(['receiver', 'wallet', 'address']),
        senderItemsChainId: pipe<[BaseOffer], NonEmptyArray<Item>, Item, Chain, ChainId>(
          prop('senderItems'),
          head,
          path(['token', 'contract', 'chain']),
          chainId
        ),
        senderItems: pipe(prop('senderItems'), hashNfts),
        receiverItemsChainId: pipe<[BaseOffer], NonEmptyArray<Item>, Item, Chain, ChainId>(
          prop('receiverItems'),
          head,
          path(['token', 'contract', 'chain']),
          chainId
        ),
        receiverItems: pipe(prop('receiverItems'), hashNfts),
        expiration: prop('expiresAt')
      })
    ]),
    partial(encodeAbiParameters, [params]),
    keccak256,
    toLower<HexString>
  )(offer)
}
