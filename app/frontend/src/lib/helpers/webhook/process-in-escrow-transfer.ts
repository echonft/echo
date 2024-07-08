import { addEscrowedNftWithId } from '@echo/firestore/crud/escrowed-nft/add-escrowed-nft-with-id'
import { deleteNft } from '@echo/firestore/crud/nft/delete-nft'
import { getNftSnapshotForIndex } from '@echo/firestore/crud/nft/get-nft'
import type { NftWithId } from '@echo/firestore/types/model/nft/nft-with-id'
import { NotFoundError } from '@echo/frontend/lib/helpers/error/not-found-error'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft } from '@echo/model/types/nft'
import { addCollection } from '@echo/tasks/add-collection'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, isNil, otherwise, pipe } from 'ramda'

export async function processInEscrowTransfer(args: WithLoggerType<Record<'nft', Nft>>): Promise<void> {
  const {
    nft: {
      tokenId,
      collection: { contract }
    },
    logger
  } = args
  const collection = await addCollection({ contract, fetch, logger })
  const nftIndex = getNftIndex({ collection, tokenId })
  const nftSnapshot = await pipe(
    getNftSnapshotForIndex,
    otherwise((err) => {
      logger?.error({ err, nft: nftIndex }, 'could get NFT snapshot')
      return undefined
    })
  )(nftIndex)
  if (isNil(nftSnapshot)) {
    return Promise.reject(new NotFoundError({ message: 'NFT snapshot not found', severity: 'warning' }))
  }
  const nft: NftWithId = { ...nftSnapshot.data(), id: nftSnapshot.id }
  // We add the escrowed NFT with NFT data and remove it from the NFT database
  await pipe(
    addEscrowedNftWithId,
    andThen(({ id, data }) => {
      logger?.info({ nft: assoc('id', id, data) }, 'added escrowed NFT')
    })
  )(nft)
  await pipe(
    deleteNft,
    andThen((id) => {
      logger?.info({ nft: { id } }, 'deleted NFT')
    })
  )(nftSnapshot.id)
}
