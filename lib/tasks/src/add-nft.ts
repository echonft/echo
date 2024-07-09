import { addNft as addNftToFirestore } from '@echo/firestore/crud/nft/add-nft'
import { getWalletOwner } from '@echo/firestore/crud/wallet/get-wallet-owner'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { PartialWallet } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import type { Nft } from '@echo/model/types/nft'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { andThen, assoc, isNil, pipe } from 'ramda'

interface AddNftArgs {
  nft: Omit<Nft, 'owner' | 'updatedAt'>
  wallet: PartialWallet
}

/**
 * Adds an NFT to firestore
 * @param args
 * @throws Error returns a rejected promise if the wallet is not associated with any user in Firestore
 * @throws Error returns a rejected promise if the NFT could not have been added to Firestore
 */
export async function addNft(args: WithLoggerType<AddNftArgs>) {
  const { nft, wallet, logger } = args
  const user = await getWalletOwner(wallet)
  if (isNil(user)) {
    return Promise.reject(Error('user not found'))
  }
  return pipe<[Omit<Nft, 'owner' | 'updatedAt'>], Omit<Nft, 'updatedAt'>, Promise<NewDocument<Nft>>, Promise<Nft>>(
    assoc('owner', getUserFromFirestoreData({ user, wallet })),
    addNftToFirestore,
    andThen(({ id, data }) => {
      const newNft = assoc('id', id, data)
      logger?.info({ nft: newNft }, 'added NFT to the database')
      return newNft
    })
  )(nft)
}
