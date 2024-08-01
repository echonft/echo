import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { getUserFromWalletDocumentData } from '@echo/frontend/lib/helpers/webhook/get-user-from-wallet-document-data'
import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import { getOrAddCollection } from '@echo/tasks/get-or-add-collection'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { isNil } from 'ramda'

/**
 * Processes the transfer of an NFT from a user (foreign or in our database) to a user in our database.
 */
export async function processInTransfer(
  args: WithLoggerType<Record<'transfer', Omit<NftTransfer, 'to'> & Record<'to', WalletDocumentData>>>
): Promise<void> {
  const {
    transfer: { contract, to, tokenId },
    logger
  } = args
  const user = await getUserFromWalletDocumentData(to)
  if (isNil(user)) {
    return
  }
  const collection = await getOrAddCollection({ contract, fetch, logger })
  await setNftOwner({ nft: { collection, tokenId }, owner: user })
}
