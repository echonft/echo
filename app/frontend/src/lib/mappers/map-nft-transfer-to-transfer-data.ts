import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import type { TransferData } from '@echo/frontend/lib/types/transfer/transfer-data'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export async function mapNftTransferToTransferData(args: NftTransfer): Promise<Nullable<TransferData>> {
  const { chain, contractAddress, to, from, tokenId } = args
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
