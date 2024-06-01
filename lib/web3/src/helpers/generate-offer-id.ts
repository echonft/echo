import type { BaseOffer } from '@echo/model/types/base-offer'
import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { getChainId } from '@echo/utils/helpers/get-chain-id'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { parseOfferAbiParameters } from '@echo/web3/helpers/abi/parse-offer-abi-parameters'
import { hashNfts } from '@echo/web3/helpers/hash-nfts'
import { applySpec, head, path, pipe, prop } from 'ramda'
import { encodeAbiParameters, keccak256 } from 'viem'

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
export function generateOfferId(offer: BaseOffer): HexString {
  return keccak256(
    encodeAbiParameters(parseOfferAbiParameters(), [
      applySpec<OfferAbiParameters>({
        sender: nonNullableReturn(path(['sender', 'wallet', 'address'])),
        receiver: nonNullableReturn(path(['receiver', 'wallet', 'address'])),
        senderItemsChainId: pipe<[BaseOffer], Nft[], Nft, Wallet, ChainName, number>(
          prop('senderItems'),
          head,
          nonNullableReturn(path(['collection', 'contract'])),
          prop('chain'),
          getChainId
        ),
        senderItems: pipe(prop('senderItems'), hashNfts),
        receiverItemsChainId: pipe<[BaseOffer], Nft[], Nft, Wallet, ChainName, number>(
          prop('receiverItems'),
          head,
          nonNullableReturn(path(['collection', 'contract'])),
          prop('chain'),
          getChainId
        ),
        receiverItems: pipe(prop('receiverItems'), hashNfts),
        expiration: prop('expiresAt')
      })(offer)
    ])
  )
}
