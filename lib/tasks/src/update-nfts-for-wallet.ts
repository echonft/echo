import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getNftsForWallet } from '@echo/firestore/crud/nft/get-nfts-for-wallet'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { eqNftWithCollectionContract } from '@echo/model/helpers/nft/eq-nft-with-collection-contract'
import type { Wallet } from '@echo/model/types/wallet'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { fetchNftsByAccount } from '@echo/tasks/fetch-nfts-by-account'
import { getOrAddCollection } from '@echo/tasks/get-or-add-collection'
import { updateNftOwner } from '@echo/tasks/update-nft-owner'
import { isInWith } from '@echo/utils/fp/is-in-with'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { WithFetch } from '@echo/utils/types/with-fetch'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { getNftOwner } from '@echo/web3/helpers/nft/get-nft-owner'
import { andThen, assoc, equals, flatten, head, isNil, map, path, pipe, prop } from 'ramda'

interface UpdateNftsForWalletArgs extends WithFetch {
  wallet: WalletDocumentData
}

/**
 * To update NFTs for a wallet, we query an NFT API to fetch the NFTs owned by the wallet, compare the results
 * against our database, and update it accordingly.
 * There are 3 scenarios possible here:
 * 1. The wallet acquired a new NFT that is not in our database
 *    => we add it to the database
 * 2. The wallet acquired an NFT that belonged to another wallet in our database (or vice versa)
 *    => we update the owner of the NFT
 * 3. The wallet transferred an NFT to a wallet that is not on our platform
 *    => we remove the NFT owner
 * @param args
 */
export async function updateNftsForWallet(args: WithLoggerType<UpdateNftsForWalletArgs>): Promise<void> {
  const { wallet, logger } = args
  logger?.info({ wallet }, 'started updating NFTs for wallet')
  const nftGroups = await fetchNftsByAccount(args)
  for (const nftGroup of nftGroups) {
    const contract = pipe<[PartialNft[]], PartialNft, Wallet>(
      head,
      nonNullableReturn(path(['collection', 'contract']))
    )(nftGroup)
    const collection = await getOrAddCollection({ contract, fetch: args.fetch, logger })
    const nftGroupWithCollection = map(assoc('collection', collection), nftGroup)
    for (const nft of nftGroupWithCollection) {
      const currentWallet = mapWalletDocumentDataToWallet(wallet)
      const owner = await pipe(getNftByIndex, andThen(unlessNil(prop('owner'))))(nft)
      if (isNil(owner) || !equals(currentWallet, owner.wallet)) {
        await updateNftOwner({ nft, wallet: currentWallet })
      }
    }
  }
  // check if there are any NFTs owned by the wallet in our database for which ownership changed
  const nfts = flatten(nftGroups)
  const walletNfts = await getNftsForWallet({ wallet })
  for (const walletNft of walletNfts) {
    if (!isInWith(nfts, eqNftWithCollectionContract, walletNft)) {
      const ownerWallet = await getNftOwner(walletNft)
      await updateNftOwner({ nft: walletNft, wallet: ownerWallet })
    }
  }
  logger?.info({ wallet }, 'done updating NFTs for wallet')
}
