import { getNftsForWallet } from '@echo/firestore/crud/nft/get-nfts-for-wallet'
import { eqNftContract } from '@echo/model/helpers/nft/eq-nft-contract'
import type { Address } from '@echo/model/types/address'
import type { Collection } from '@echo/model/types/collection'
import { getNftsByWallet } from '@echo/nft-scan/services/get-nfts-by-wallet'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { error, info, warn } from '@echo/tasks/helpers/logger'
import { addOrUpdateNft } from '@echo/tasks/tasks/add-or-update-nft'
import { getOrAddCollection } from '@echo/tasks/tasks/get-or-add-collection'
import { updateNftOwner } from '@echo/tasks/tasks/update-nft-owner'
import { isInWith } from '@echo/utils/helpers/is-in-with'
import type { Nullable } from '@echo/utils/types/nullable'
import { getNftOwner } from '@echo/web3/services/get-nft-owner'
import { andThen, assoc, collectBy, flatten, head, isEmpty, isNil, map, otherwise, path, pipe } from 'ramda'

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
 * @param wallet
 */
export async function updateNftsForWallet(wallet: Address): Promise<void> {
  info({ wallet }, 'started updating NFTs for wallet')
  const groups = await pipe(
    getNftsByWallet,
    andThen((nfts: PartialNft[]) => {
      if (isEmpty(nfts)) {
        return [] as PartialNft[][]
      }
      return collectBy(path(['collection', 'contract']), nfts)
    }),
    otherwise((err) => {
      error({ err, wallet }, 'could not fetch NFTs')
      return [] as PartialNft[][]
    })
  )(wallet)
  for (const group of groups) {
    const contract = pipe<[PartialNft[]], PartialNft, Address>(head, path(['collection', 'contract']))(group)
    const collection = await pipe(
      getOrAddCollection,
      otherwise((err) => {
        warn({ err, collection: { contract } }, 'could not get/add collection')
        return undefined as Nullable<Collection>
      })
    )(contract)
    if (!isNil(collection)) {
      const nfts = map(assoc('collection', collection), group)
      for (const nft of nfts) {
        await pipe(
          addOrUpdateNft,
          otherwise((err) => {
            warn({ err, nft }, 'could not add/update NFT')
          })
        )(nft)
      }
    }
  }
  // check if there are any NFTs owned by the wallet in our database for which ownership changed
  const nfts = flatten(groups)
  const walletNfts = await getNftsForWallet(wallet)
  for (const nft of walletNfts) {
    if (!isInWith(nfts, eqNftContract, nft)) {
      const ownerWallet = await getNftOwner(nft)
      await updateNftOwner({ nft, wallet: ownerWallet })
    }
  }
  info({ wallet }, 'done updating NFTs for wallet')
}
