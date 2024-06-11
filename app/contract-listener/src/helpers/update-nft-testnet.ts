import { contractListenerLogger } from '@echo/contract-listener/constants/contract-listener-logger'
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
  const { nftIndex, owner, chain, collection } = args
  const nft = await getNft(nftIndex)

  if (!isNil(nft)) {
    contractListenerLogger.info({ msg: `NFT ${JSON.stringify(nftIndex)} already in database, updating owner...` })
    await pipe(assoc('owner', owner), updateNftInFirestore)(nft)
    contractListenerLogger.info({ msg: `NFT ${JSON.stringify(nftIndex)} owner updated to ${JSON.stringify(owner)}` })
    return
  }

  contractListenerLogger.info({ msg: `NFT ${JSON.stringify(nftIndex)} not found, fetching...` })
  await pipe(
    getNftFromOpensea,
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
    chain,
    fetch,
    identifier: nftIndex.tokenId.toString(),
    contract: pipe<[Collection], Wallet, HexString>(prop('contract'), prop('address'))(collection)
  })
}
