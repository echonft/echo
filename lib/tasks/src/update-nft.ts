import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { updateNft as updateNftInFirestore } from '@echo/firestore/crud/nft/update-nft'
import type { Collection } from '@echo/model/types/collection'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { User } from '@echo/model/types/user'
import { getNft as getNftFromNftScan } from '@echo/nft-scan/services/get-nft'
import { getNft as getNftFromOpensea } from '@echo/opensea/services/get-nft'
import { isTestnetChain } from '@echo/utils/helpers/chains/is-testnet-chain'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, ifElse, isNil, pipe, prop, tap } from 'ramda'

export interface UpdateNftArgs {
  nftIndex: NftIndex
  owner: User
  collection: Collection
}

/**
 * Adds an NFT to the DB if it doesn't exist, else it updates the ownership.
 * Will decide where to fetch the data based on chain. We use OpenSea API on testnet and NFTScan on mainnet
 */
export async function updateNft(args: WithLoggerType<UpdateNftArgs>) {
  const { nftIndex, owner, collection, logger } = args
  const nftFetcher = isTestnetChain(collection.contract.chain) ? getNftFromNftScan : getNftFromOpensea
  const nft = await getNft(nftIndex)
  if (isNil(nft)) {
    await pipe(
      nftFetcher,
      andThen(
        ifElse(
          isNil,
          tap(() => {
            logger?.error({ fn: updateNft.name, nft: nftIndex }, 'NFT not found in API')
          }),
          pipe(
            assoc('collection', collection),
            assoc('owner', owner),
            addNft,
            andThen(
              tap(({ id, data }) => {
                logger?.info({ fn: updateNft.name, nft: assoc('id', id, data) }, 'added NFT')
              })
            )
          )
        )
      )
    )({
      fetch,
      identifier: nftIndex.tokenId.toString(),
      contract: prop('contract', collection)
    })
    return
  }
  await pipe(
    assoc('owner', owner),
    updateNftInFirestore,
    andThen(
      tap((nft) => {
        logger?.info({ fn: updateNft.name, nft }, 'updated NFT')
      })
    )
  )(nft)
}
