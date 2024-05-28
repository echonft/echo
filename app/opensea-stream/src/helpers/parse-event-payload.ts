import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import type { TransferData } from '@echo/opensea-stream/types/transfer-data'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { isSupportedChain } from '@echo/utils/helpers/is-supported-chain'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import type { ItemTransferredEventPayload } from '@opensea/stream-js'
import { isNil, toLower } from 'ramda'

/**
 * Parse the payload of an ItemTransferredEvent.
 * Checks if we support the chain and if the wallets are in our database.
 *
 * @param {ItemTransferredEventPayload} payload - The payload to validate.
 * @return {Nullable<TransferData>}
 */
export async function parseEventPayload(payload: ItemTransferredEventPayload): Promise<Nullable<TransferData>> {
  const {
    chain,
    from_account: { address: fromAddress },
    to_account: { address: toAddress },
    item: { nft_id },
    collection: { slug }
  } = payload
  const chainName = chain as ChainName
  if (!isSupportedChain(chainName)) {
    return undefined
  }
  try {
    const from = await getWalletByAddress({ chain: chainName, address: toLower(fromAddress as HexString) })
    const to = await getWalletByAddress({ chain: chainName, address: toLower(toAddress as HexString) })
    // If both wallets are not present in our database, discard
    if (isNil(from) && isNil(to)) {
      return undefined
    }
    return {
      nftIndex: { tokenId: Number(nft_id), collection: { slug: toLower(slug) } },
      from,
      to
    }
  } catch (err) {
    pinoLogger.error(`Error getWalletByAddress: ${errorMessage(err)}`)
    return undefined
  }
}
