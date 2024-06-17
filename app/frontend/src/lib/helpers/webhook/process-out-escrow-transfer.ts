import { deleteEscrowedNft } from '@echo/firestore/crud/escrowed-nft/delete-escrowed-nft'
import { getEscrowedNftSnapshot } from '@echo/firestore/crud/escrowed-nft/get-escrowed-nft'
import { addNftWithId } from '@echo/firestore/crud/nft/add-nft-with-id'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { NftWithId } from '@echo/firestore/types/model/nft/nft-with-id'
import { getCollection } from '@echo/frontend/lib/helpers/webhook/get-collection'
import type { NftTransfer } from '@echo/frontend/lib/types/transfer/nft-transfer'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { applySpec, assoc, chain, invoker, isNil, pipe, prop } from 'ramda'

export async function processOutEscrowTransfer(args: WithLoggerType<Record<'transfer', NftTransfer>>): Promise<void> {
  const {
    transfer: { contract, to: toWallet, tokenId },
    logger
  } = args
  const collection = await getCollection({ contract, logger })
  const nftIndex = getNftIndex({ collection, tokenId })
  const nftSnapshot = await getEscrowedNftSnapshot(nftIndex)
  if (isNil(nftSnapshot)) {
    logger?.error({ fn: processOutEscrowTransfer.name, nft: nftIndex }, 'NFT not found')
    return
  }
  const to = await getWalletByAddress(toWallet)
  // wallet is not in the database, we simply delete the NFT in that case
  if (isNil(to)) {
    logger?.warn(
      { fn: processOutEscrowTransfer.name, wallet: { address: toWallet, chain } },
      'target wallet not found in the database'
    )
    await deleteEscrowedNft(nftSnapshot.id)
    logger?.warn({ fn: processOutEscrowTransfer.name, nft: nftIndex }, 'deleted escrowed NFT')
    return
  }
  const userDocumentData = await getUserById(to.userId)
  if (isNil(userDocumentData)) {
    logger?.error({ fn: processOutEscrowTransfer.name, user: { id: to.userId } }, 'user not found')
    return
  }
  const user = getUserFromFirestoreData(userDocumentData, to)
  // We add NFT back in the NFT database and remove the escrowed one
  const nft = pipe(
    applySpec<Omit<NftWithId, 'owner'>>({
      data: invoker(0, 'data'),
      id: prop('id')
    }),
    assoc('owner', user)
  )(nftSnapshot)
  await addNftWithId(nft)
  logger?.info({ fn: processOutEscrowTransfer.name, nft }, 'added NFT')
  await deleteEscrowedNft(nftSnapshot.id)
  logger?.info({ fn: processOutEscrowTransfer.name, nft: { id: nftSnapshot.id } }, 'deleted escrowed NFT')
}
