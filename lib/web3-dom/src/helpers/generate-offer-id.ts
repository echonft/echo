import type { Chain } from '@echo/model/constants/chain'
import { chainId } from '@echo/model/helpers/chain/chain-id'
import type { BaseOffer } from '@echo/model/types/base-offer'
import type { ChainId } from '@echo/model/types/chain'
import type { Contract } from '@echo/model/types/contract'
import type { Item } from '@echo/model/types/item'
import type { Nft } from '@echo/model/types/nft'
import type { HexString } from '@echo/utils/types/hex-string'
import { applySpec, head, juxt, map, type NonEmptyArray, partial, path, pipe, prop, toLower } from 'ramda'
import { encodeAbiParameters, keccak256, parseAbiParameters } from 'viem'

interface OfferItemAbi {
  readonly tokenAddress: HexString
  readonly tokenId: bigint
}

interface OfferAbiParameters {
  sender: HexString
  receiver: HexString
  senderItemsChainId: bigint
  senderItems: HexString
  receiverItemsChainId: bigint
  receiverItems: HexString
  expiration: bigint
}

function hashNfts(nfts: Nft[]): HexString {
  const params = parseAbiParameters(['struct OfferItem { address tokenAddress; uint256 tokenId; }', 'OfferItem[]'])
  return keccak256(
    encodeAbiParameters(params, [
      map(
        applySpec<OfferItemAbi>({
          tokenAddress: pipe<[Nft], Contract, HexString>(path(['collection', 'contract']), prop('address')),
          tokenId: prop('tokenId')
        })
      )(nfts)
    ])
  )
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
