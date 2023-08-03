import { getNftsForOwner } from '@echo/alchemy'
import {
  findNftByCollection,
  getAllContractsAddresses,
  getUserWalletAddresses,
  updateNftOwner
} from '@echo/firebase-admin'
import { FirestoreUserData } from '@echo/firestore'
import { isNilOrEmpty } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { any, flatten, map } from 'ramda'

export const updateUserNfts = (user: FirestoreUserData) =>
  // Check if wallets are empty, fail fast
  isNilOrEmpty(user.wallets)
    ? Promise.resolve([])
    : getAllContractsAddresses().then((addressesResult) => {
        if (R.isError(addressesResult)) {
          return Promise.reject('Error fetching contract addresses')
        }
        return Promise.all(
          getUserWalletAddresses(user).map((address) =>
            getNftsForOwner({ owner: address, contractAddresses: R.getExn(addressesResult) })
          )
        ).then((nftResults) => {
          if (any(R.isError, nftResults)) {
            return Promise.reject('Error fetching NFTs from alchemy')
          }
          return Promise.all(
            flatten(map(R.getExn, nftResults)).map((nft) =>
              // TODO Should support multi chain, right now only ETH (chainId 1) is supported
              findNftByCollection({
                contract: { address: nft.contractAddress, chainId: 1 },
                tokenId: nft.tokenId as number
              }).then((nftResult) => {
                if (R.isError(nftResult)) {
                  return Promise.reject('Error fetching NFT from firebase')
                }
                return updateNftOwner(R.getExn(nftResult).id, user.id)
              })
            )
          )
        })
      })
