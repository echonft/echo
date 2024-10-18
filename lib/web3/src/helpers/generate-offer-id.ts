import type { Nft } from '@echo/model/types/nft/nft'
import type { BaseOffer } from '@echo/model/types/offer/base-offer'
import type { Wallet } from '@echo/model/types/wallet'
import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import type { Chain } from '@echo/utils/constants/chain'
import type { HexString } from '@echo/utils/types/hex-string'
import { hashNfts } from '@echo/web3/helpers/hash-nfts'
import { applySpec, head, juxt, partial, path, pipe, prop, toLower } from 'ramda'
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
        senderItemsChainId: pipe<[BaseOffer], Nft[], Nft, Wallet, Chain, number>(
          prop('senderItems'),
          head,
          path(['collection', 'contract']),
          prop('chain'),
          getChainId
        ),
        senderItems: pipe(prop('senderItems'), hashNfts),
        receiverItemsChainId: pipe<[BaseOffer], Nft[], Nft, Wallet, Chain, number>(
          prop('receiverItems'),
          head,
          path(['collection', 'contract']),
          prop('chain'),
          getChainId
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
