import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { updateNft as updateNftInFirestore } from '@echo/firestore/crud/nft/update-nft'
import type { UpdateNftArgs } from '@echo/frontend/lib/helpers/webhook/update-nft-switch'
import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import { getNft as getNftFromOpensea } from '@echo/opensea/services/get-nft'
import type { HexString } from '@echo/utils/types/hex-string'
import { andThen, assoc, isNil, pipe, prop } from 'ramda'

/**
 * TESTNET ONLY
 * This method uses OpenSea which doesn't work well on mainnet
 */
export async function updateNftTestnet(args: UpdateNftArgs) {
  const { nftIndex, owner, chain, collection } = args
  const nft = await getNft(nftIndex)

  if (!isNil(nft)) {
    await pipe(assoc('owner', owner), updateNftInFirestore)(nft)
    return
  }

  await pipe(
    getNftFromOpensea,
    andThen(pipe(assoc('collection', collection), assoc('owner', owner), addNft))
  )({
    chain,
    fetch,
    identifier: nftIndex.tokenId.toString(),
    contract: pipe<[Collection], Wallet, HexString>(prop('contract'), prop('address'))(collection)
  })
}
