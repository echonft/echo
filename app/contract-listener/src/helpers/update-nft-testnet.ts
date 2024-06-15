import type { UpdateNftArgs } from '@echo/contract-listener/helpers/update-nft'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { updateNft as updateNftInFirestore } from '@echo/firestore/crud/nft/update-nft'
import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import { getNft as getNftFromOpensea } from '@echo/opensea/services/get-nft'
import type { HexString } from '@echo/utils/types/hex-string'
import { andThen, assoc, isNil, pipe, prop, tap } from 'ramda'

/**
 * TESTNET ONLY
 * This method uses OpenSea which doesn't work well on mainnet
 */
export async function updateNftTestnet(args: UpdateNftArgs) {
  const fn = 'updateNftTestnet'
  const { nftIndex, owner, chain, collection, logger } = args
  const nft = await getNft(nftIndex)

  if (!isNil(nft)) {
    logger?.info({ nft, fn }, 'NFT already in database, updating owner')
    await pipe(assoc('owner', owner), updateNftInFirestore)(nft)
    logger?.info({ nft, new_owner: owner, fn }, 'NFT owner updated')
    return
  }

  logger?.info({ fn, nft: nftIndex }, 'NFT not found, fetching')
  await pipe(
    getNftFromOpensea,
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
    chain,
    fetch,
    identifier: nftIndex.tokenId.toString(),
    contract: pipe<[Collection], Wallet, HexString>(prop('contract'), prop('address'))(collection),
    logger
  })
}
