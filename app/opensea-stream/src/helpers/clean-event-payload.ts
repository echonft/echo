import type { Wallet } from '@echo/model/types/wallet'
import { assertWalletExists } from '@echo/opensea-stream/helpers/assert-wallet-exists'
import type { TransferData } from '@echo/opensea-stream/types/transfer-data'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'
import { isSupportedChain } from '@echo/web3/helpers/is-supported-chain'
import type { ItemTransferredEventPayload } from '@opensea/stream-js'
import { toLower } from 'ramda'

/**
 * Clean the payload of an ItemTransferredEvent.
 * Checks if we support the chain and if the users are on the platform
 * Returns the data needed for further computation
 *
 * @param {ItemTransferredEventPayload} payload - The payload to validate.
 * @return {Promise<boolean>} - A promise that resolves to true if the payload is valid, false otherwise.
 */
export async function cleanEventPayload(payload: ItemTransferredEventPayload): Promise<Nullable<TransferData>> {
  const {
    chain,
    from_account: { address: from },
    to_account: { address: to },
    item: { nft_id },
    collection: { slug }
  } = payload
  if (!isSupportedChain(chain as ChainName)) {
    return undefined
  }
  const fromWallet = { chain, address: from } as Wallet
  const toWallet = { chain, address: to } as Wallet
  // Check if we have the users wallets
  const fromExists = await assertWalletExists(fromWallet)
  const toExists = await assertWalletExists(toWallet)
  // If both wallets are not present in our DB, discard
  if (!fromExists && !toExists) {
    return undefined
  }
  const tokenId = Number(nft_id)
  // Should never happen
  if (isNaN(tokenId)) {
    return undefined
  }

  return {
    nftIndex: { tokenId, collection: { slug: toLower(slug) } },
    from: fromExists ? fromWallet : undefined,
    to: toExists ? toWallet : undefined
  }
}
