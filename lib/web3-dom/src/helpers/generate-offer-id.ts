import type { HexString } from '@echo/model/types/hex-string'
import type { Item } from '@echo/model/types/item'
import type { BaseOffer } from '@echo/model/types/offer'
import { always, applySpec, juxt, map, partial, path, pipe, prop, toLower } from 'ramda'
import { encodeAbiParameters, keccak256, parseAbiParameters } from 'viem'
import { sei } from 'viem/chains'

interface OfferItemAbi {
  readonly tokenAddress: HexString
  readonly tokenType: number
  readonly tokenIdOrAmount: bigint
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

function hashNfts(nfts: Item[]): HexString {
  const params = parseAbiParameters([
    'struct OfferItem { address tokenAddress; uint8 tokenType; uint256 tokenIdOrAmount }',
    'OfferItem[]'
  ])
  return keccak256(
    encodeAbiParameters(params, [
      map(
        applySpec<OfferItemAbi>({
          tokenAddress: path(['token', 'contract']),
          tokenIdOrAmount: path(['token', 'tokenId']),
          tokenType: always(1)
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
export function generateOfferId(offer: BaseOffer): HexString {
  const params = parseAbiParameters([
    'struct Offer { address sender; address receiver; uint256 senderItemsChainId; bytes32 senderItems; uint256 receiverItemsChainId; bytes32 receiverItems; uint256 expiration; }',
    'Offer'
  ])
  return pipe(
    juxt([
      applySpec<OfferAbiParameters>({
        sender: path(['sender', 'wallet']),
        receiver: path(['receiver', 'wallet']),
        // No multi chain support yet
        senderItemsChainId: always(sei.id),
        senderItems: pipe(prop('senderItems'), hashNfts),
        // No multi chain support yet
        receiverItemsChainId: always(sei.id),
        receiverItems: pipe(prop('receiverItems'), hashNfts),
        expiration: prop('expiresAt')
      })
    ]),
    partial(encodeAbiParameters, [params]),
    keccak256,
    toLower<HexString>
  )(offer)
}
