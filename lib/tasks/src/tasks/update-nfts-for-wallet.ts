import { getNftsForOwnerWallet } from '@echo/firestore/crud/nft/get-nfts-for-owner-wallet'
import type { Chain } from '@echo/model/constants/chain'
import { chainsForVirtualMachine } from '@echo/model/helpers/chain/chains-for-virtual-machine'
import { eqNftContract } from '@echo/model/helpers/nft/eq-nft-contract'
import type { EvmAddress } from '@echo/model/types/address'
import type { Contract } from '@echo/model/types/contract'
import type { Wallet } from '@echo/model/types/wallet'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { error, info } from '@echo/tasks/helpers/logger'
import { addOrUpdateNft } from '@echo/tasks/tasks/add-or-update-nft'
import { fetchNftsByAccount } from '@echo/tasks/tasks/fetch-nfts-by-account'
import { getOrAddCollection } from '@echo/tasks/tasks/get-or-add-collection'
import { updateNftOwner } from '@echo/tasks/tasks/update-nft-owner'
import { isInWith } from '@echo/utils/fp/is-in-with'
import { getNftOwner } from '@echo/web3/services/get-nft-owner'
import { assoc, flatten, head, map, path, pipe, prop } from 'ramda'

async function updateNftsForAddress(address: EvmAddress, chain: Chain): Promise<void> {
  const nftGroups = await fetchNftsByAccount({ address, chain })
  for (const nftGroup of nftGroups) {
    const contract = pipe<[PartialNft[]], PartialNft, Contract>(head, path(['collection', 'contract']))(nftGroup)
    // Use a try to avoid the command from crashing in some cases (i.e. if collection is spam)
    try {
      const collection = await getOrAddCollection(contract)
      const nfts = map(assoc('collection', collection), nftGroup)
      for (const nft of nfts) {
        await addOrUpdateNft(nft)
      }
    } catch (err) {
      error({ err, nftGroup }, 'could not get/add collection or NFT')
    }
  }
  // check if there are any NFTs owned by the wallet in our database for which ownership changed
  const nfts = flatten(nftGroups)
  const walletNfts = await getNftsForOwnerWallet({ address, chain })
  for (const walletNft of walletNfts) {
    if (!isInWith(nfts, eqNftContract, walletNft)) {
      const ownerWallet = await getNftOwner(walletNft)
      await updateNftOwner({ nft: walletNft, owner: ownerWallet.address })
    }
  }
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
 * @param wallet
 */
export async function updateNftsForWallet(wallet: Wallet): Promise<void> {
  info({ wallet }, 'started updating NFTs for wallet')
  const chains = pipe(prop('vm'), chainsForVirtualMachine)(wallet)
  for (const chain of chains) {
    await updateNftsForAddress(wallet.address, chain)
  }
  info({ wallet }, 'done updating NFTs for wallet')
}
