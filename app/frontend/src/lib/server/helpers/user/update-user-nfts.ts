import { mapAlchemyNftToNft } from '@echo/alchemy/mappers/map-alchemy-nft-to-nft'
import { getAllCollections } from '@echo/firestore/crud/collection/get-all-collections'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { findNftByCollectionContract } from '@echo/firestore/crud/nft/find-nft-by-collection-contract'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { getUser } from '@echo/firestore/helpers/user/get-user'
import { type UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { getNftsForOwner } from '@echo/frontend/lib/server/helpers/alchemy/get-nfts-for-owner'
import { type Wallet } from '@echo/model/types/wallet'
import { filter, find, isNil, map, path, pathEq } from 'ramda'

export async function updateUserNfts(user: UserDocumentData, wallet: Wallet) {
  const collections = await getAllCollections()
  const collectionsForChain = filter(pathEq(wallet.chainId, ['contract', 'chainId']), collections)
  const collectionsAddresses = map(path<string>(['contract', 'address']), collectionsForChain) as string[]
  const nfts = await getNftsForOwner(wallet.address, collectionsAddresses, wallet.chainId)
  for (const alchemyNft of nfts) {
    const { contractAddress, chainId, tokenId } = alchemyNft
    // FIXME this is true only for ERC721
    const nft = await findNftByCollectionContract(contractAddress, chainId, tokenId)
    if (isNil(nft)) {
      const collection = find(pathEq(contractAddress, ['contract', 'address']), collectionsForChain)
      if (!isNil(collection)) {
        const nft = mapAlchemyNftToNft(alchemyNft, getUser(user, wallet), collection)
        await addNft(nft)
      }
    } else {
      await setNftOwner(nft.id, user, wallet)
    }
  }
}
