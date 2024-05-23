import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNft } from '@echo/firestore/crud/nft/get-nft'
import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import type { Collection, Contract } from '@echo/model/types/collection'
import type { NftIndex } from '@echo/model/types/nft-index'
import type { User } from '@echo/model/types/user'
import { getNft as getNftOpenSea } from '@echo/opensea/services/get-nft'
import { mapOpenSeaNftToNft } from '@echo/opensea-stream/mappers/map-open-sea-nft-to-nft'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { head, isNil, pipe, prop } from 'ramda'

interface AddNftIfNeededArgs {
  nftIndex: NftIndex
  owner: User
  chain: ChainName
  collection: Collection
}

/**
 * Adds an NFT to the DB if it doesn't exist. Else it chanupdatesges ownership
 *
 * @param {AddNftIfNeededArgs} args - The arguments for adding the NFT.
 * @param {number} args.nftIndex - The index of the NFT.
 * @param {string} args.owner - The new owner of the NFT.
 * @param {string} args.chain - The chain where the NFT exists.
 * @param {Collection} args.collection - The collection to add the NFT to.
 */
export async function addNftIfNeeded(args: AddNftIfNeededArgs) {
  const { nftIndex, owner, chain, collection } = args
  const savedNft = await getNft(nftIndex)
  // Shouldn't happen but in case, we simply update the NFT
  if (!isNil(savedNft)) {
    const updatedNft = {
      ...savedNft,
      owner
    }
    await updateNft(updatedNft)
  }

  const nftResponse = await getNftOpenSea({
    chain,
    fetch,
    identifier: nftIndex.tokenId.toString(),
    contract: pipe<[Collection], Contract[], Contract, HexString>(prop('contracts'), head, prop('address'))(collection)
  })

  await addNft(mapOpenSeaNftToNft({ response: nftResponse, owner, collection }))
}
