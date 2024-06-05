import type { EventLogHandlerArgs } from '@echo/contract-listener/types/event-log-handler-args'
import type { TransferData } from '@echo/contract-listener/types/transfer-data'
import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import type { Nullable } from '@echo/utils/types/nullable'
import type { Erc721TransferEventLog } from '@echo/web3/types/log/erc721-transfer-event-log'
import { isNil } from 'ramda'

export async function mapErc721TransferLogToTransferData(
  args: EventLogHandlerArgs<Erc721TransferEventLog>
): Promise<Nullable<TransferData>> {
  const {
    chain,
    log: {
      address: contractAddress,
      args: { from, to, tokenId }
    }
  } = args
  const fromWallet = await getWalletByAddress({ chain, address: from })
  const toWallet = await getWalletByAddress({ chain, address: to })
  // If both wallets are not present in our database, discard
  if (isNil(fromWallet) && isNil(toWallet)) {
    return undefined
  }
  return {
    tokenId,
    contractAddress,
    chain,
    from: fromWallet,
    to: toWallet
  }
}
