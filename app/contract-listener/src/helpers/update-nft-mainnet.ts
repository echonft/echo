import type { UpdateNftArgs } from '@echo/contract-listener/helpers/update-nft'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { updateNft as updateNftInFirestore } from '@echo/firestore/crud/nft/update-nft'
import { getNft as getNftFromNftScan } from '@echo/nft-scan/services/get-nft'
import { andThen, assoc, isNil, pipe, tap } from 'ramda'

export async function updateNftMainnet(args: UpdateNftArgs) {
  const fn = 'updateNftMainnet'
  const { nftIndex, owner, collection, logger } = args
  const nft = await getNft(nftIndex)

  if (!isNil(nft)) {
    logger?.info({ nft, fn }, 'NFT already in database, updating owner')
    await pipe(assoc('owner', owner), updateNftInFirestore)(nft)
    logger?.info({ nft, new_owner: owner, fn }, 'NFT owner updated')
    return
  }

  logger?.info({ fn, nft: nftIndex }, 'NFT not found, fetching')
  await pipe(
    getNftFromNftScan,
    andThen(
      pipe(
        assoc('collection', collection),
        assoc('owner', owner),
        addNft,
        andThen(
          tap(({ id, data }) => {
            logger?.info({ fn, nft: assoc('id', id, data) }, 'added NFT')
          })
        )
      )
    )
  )({
    fetch,
    identifier: nftIndex.tokenId.toString(),
    contract: collection.contract,
    logger
  })
}
