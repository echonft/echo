import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { findNftByCollectionContract } from '@echo/firestore/crud/nft/find-nft-by-collection-contract'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { getAllNftCollections } from '@echo/firestore/crud/nft-collection/get-all-nft-collections'
import { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { USER_NFTS_VALIDITY_TIME } from '@server/constants/user-nfts-validity-time'
import { getNftsForOwner } from '@server/helpers/alchemy/get-nfts-for-owner'
import { mapAlchemyNftToFirestore } from '@server/helpers/alchemy/map-alchemy-nft-to-firestore'
import dayjs from 'dayjs'
import { filter, find, isNil, map, path, pathEq, pipe, prop, propEq } from 'ramda'

export async function updateUserNfts(user: AuthUser, chainId: number) {
  if (isNil(user.updatedAt) || dayjs.unix(user.updatedAt).add(USER_NFTS_VALIDITY_TIME, 'minute').isBefore(dayjs())) {
    const userWalletsForChain = pipe<[AuthUser], WalletData[], WalletData[]>(
      prop('wallets'),
      filter(propEq(chainId, 'chainId'))
    )(user)
    if (isNilOrEmpty(userWalletsForChain)) {
      return
    }
    const collections = await getAllNftCollections()
    const collectionsForChain = filter(pathEq(chainId, ['contract', 'chainId']), collections)
    const collectionsAddresses = map(path<string>(['contract', 'address']), collectionsForChain) as string[]
    for (const wallet of userWalletsForChain) {
      const nfts = await getNftsForOwner(wallet.address, collectionsAddresses, chainId)
      for (const alchemyNft of nfts) {
        const { contractAddress, chainId, tokenId } = alchemyNft
        // FIXME this is true only for ERC721
        const nft = await findNftByCollectionContract(contractAddress, chainId, tokenId)
        if (isNil(nft)) {
          const collection = find(pathEq(contractAddress, ['contract', 'address']), collectionsForChain)
          if (!isNil(collection)) {
            const nft = mapAlchemyNftToFirestore(alchemyNft, user, wallet, collection)
            await addNft(nft)
          }
        } else {
          await setNftOwner(nft.id, user, wallet)
        }
      }
    }
  }
}
