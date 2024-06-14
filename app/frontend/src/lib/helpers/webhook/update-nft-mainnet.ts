import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { updateNft as updateNftInFirestore } from '@echo/firestore/crud/nft/update-nft'
import type { UpdateNftArgs } from '@echo/frontend/lib/helpers/webhook/update-nft-switch'
import { getNft as getNftFromNftScan } from '@echo/nft-scan/services/get-nft'
import { andThen, assoc, isNil, pipe } from 'ramda'

export async function updateNftMainnet(args: UpdateNftArgs) {
  const { nftIndex, owner, collection } = args
  const nft = await getNft(nftIndex)

  if (!isNil(nft)) {
    await pipe(assoc('owner', owner), updateNftInFirestore)(nft)
    return
  }

  await pipe(
    getNftFromNftScan,
    andThen(pipe(assoc('collection', collection), assoc('owner', owner), addNft))
  )({
    fetch,
    identifier: nftIndex.tokenId.toString(),
    contract: collection.contract
  })
}
