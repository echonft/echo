import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getWalletOwner } from '@echo/firestore/crud/wallet/get-wallet-owner'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { Collection } from '@echo/model/types/collection'
import type { Nft, PartialNft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { changeNftOwnership } from '@echo/tasks/change-nft-ownership'
import { fetchNft } from '@echo/tasks/fetch-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, ifElse, isNil, otherwise, pipe } from 'ramda'

export interface UpdateNftArgs {
  collection: Collection
  nft: PartialNft
  owner: Pick<User, 'wallet'>
}

/**
 * Updates the ownership of an NFT, or adds it to Firestore if it does not exist
 * @param args
 * @throws Error returns a rejected promise if the NFT does not exist in Firestore and no user is associated to the wallet
 * @throws Error returns a rejected promise if the NFT is not found in the API
 * @throws Error returns a rejected promise if the NFT could not have been fetched from the API
 * @throws Error returns a rejected promise if the NFT could not have been added or updated in Firestore
 */
export async function updateNft(args: WithLoggerType<UpdateNftArgs>): Promise<Nullable<Nft>> {
  const { owner, collection } = args
  const nft = await pipe(
    getNftByIndex,
    otherwise((err) => {
      args.logger?.error({ err, nft: nft }, 'could not get NFT from Firestore')
      return undefined
    })
  )(args.nft)
  if (isNil(nft)) {
    const user = await getWalletOwner(owner.wallet)
    if (isNil(user)) {
      return Promise.reject(Error('no user found for wallet'))
    }
    return await pipe(
      fetchNft,
      andThen(
        ifElse(
          isNil,
          () => {
            args.logger?.error({ nft: nft }, 'NFT not found in API')
            return Promise.reject(Error('NFT not found'))
          },
          pipe(
            assoc('collection', collection),
            assoc('owner', getUserFromFirestoreData({ user, wallet: owner.wallet })),
            addNft,
            andThen(({ id, data }) => {
              const newNft = assoc('id', id, data)
              args.logger?.info({ nft: newNft }, 'added NFT')
              return newNft
            })
          )
        )
      ),
      otherwise((err) => {
        args.logger?.error({ err, nft: nft }, 'could not fetch NFT')
        return Promise.reject(Error('could not fetch NFT'))
      })
    )({
      logger: args.logger,
      fetch,
      identifier: args.nft.tokenId.toString(),
      contract: collection.contract
    })
  }
  return changeNftOwnership({ nft, owner, logger: args.logger })
}
