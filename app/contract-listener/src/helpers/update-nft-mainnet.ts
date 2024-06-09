import { contractListenerLogger } from '@echo/contract-listener/constants/contract-listener-logger'
import type { UpdateNftArgs } from '@echo/contract-listener/helpers/update-nft'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { updateNft as updateNftInFirestore } from '@echo/firestore/crud/nft/update-nft'
import { getNft as getNftFromNftScan } from '@echo/nft-scan/services/get-nft'
import { andThen, assoc, isNil, pipe, tap } from 'ramda'

export async function updateNftMainnet(args: UpdateNftArgs) {
  const { nftIndex, owner, collection } = args
  const nft = await getNft(nftIndex)

  if (!isNil(nft)) {
    contractListenerLogger.info({ msg: `NFT ${JSON.stringify(nftIndex)} already in database, updating owner...` })
    await pipe(assoc('owner', owner), updateNftInFirestore)(nft)
    contractListenerLogger.info(`NFT ${JSON.stringify(nftIndex)} owner updated to ${JSON.stringify(owner)}`)
    return
  }

  contractListenerLogger.info({ msg: `NFT ${JSON.stringify(nftIndex)} not found, fetching...` })
  await pipe(
    getNftFromNftScan,
    andThen(
      pipe(
        assoc('collection', collection),
        assoc('owner', owner),
        addNft,
        andThen(
          tap(({ id }) => {
            contractListenerLogger.info({ msg: `Added NFT ${id}` })
          })
        )
      )
    )
  )({
    fetch,
    identifier: nftIndex.tokenId.toString(),
    contract: collection.contract
  })
}
