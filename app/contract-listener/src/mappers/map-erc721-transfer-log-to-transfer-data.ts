import type { TransferData } from '@echo/contract-listener/types/transfer-data'
import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'
import type { Erc721TransferLog } from '@echo/web3/types/log/erc721-transfer-log'
import { isNil, toLower } from 'ramda'

export async function mapErc721TransferLogToTransferData(
  log: Erc721TransferLog,
  chain: ChainName
): Promise<Nullable<TransferData>> {
  const {
    address: contractAddress,
    args: { from: fromAddress, to: toAddress, tokenId }
  } = log
  // Need to clean data
  if (isNil(fromAddress) || isNil(toAddress) || isNil(tokenId)) {
    return undefined
  }
  try {
    const from = await getWalletByAddress({ chain, address: toLower(fromAddress) })
    const to = await getWalletByAddress({ chain, address: toLower(toAddress) })

    // If both wallets are not present in our database, discard
    if (isNil(from) && isNil(to)) {
      return undefined
    }
    return {
      tokenId: Number(tokenId),
      contractAddress: toLower(contractAddress),
      chain,
      from,
      to
    }
  } catch (err) {
    pinoLogger.error(`Error getWalletByAddress: ${errorMessage(err)}`)
    return undefined
  }
}
