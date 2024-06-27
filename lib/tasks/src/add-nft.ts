import { addNft as addNftToFirestore } from '@echo/firestore/crud/nft/add-nft'
import { getWalletOwner } from '@echo/firestore/crud/wallet/get-wallet-owner'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { always, andThen, assoc, isNil, otherwise, pipe } from 'ramda'

interface AddNftArgs<T extends Wallet> {
  nft: Omit<Nft, 'owner' | 'updatedAt'>
  wallet: T
}

export async function addNft<T extends Wallet>(args: WithLoggerType<AddNftArgs<T>>) {
  const { logger, nft, wallet } = args
  const user = await pipe(getWalletOwner, otherwise(always(undefined)))(wallet)
  if (isNil(user)) {
    logger?.error({ nft, wallet }, 'cannot add NFT because no owner found for the wallet')
  } else {
    return pipe<
      [Omit<Nft, 'owner' | 'updatedAt'>],
      Omit<Nft, 'updatedAt'>,
      Promise<NewDocument<Nft>>,
      Promise<void>,
      Promise<void>
    >(
      assoc('owner', getUserFromFirestoreData({ user, wallet })),
      addNftToFirestore,
      andThen(({ id, data }) => {
        logger?.info({ nft: assoc('id', id, data) }, 'added NFT to the database')
      }),
      otherwise<void>((err) => {
        logger?.error({ err, nft }, 'could not add NFT to the database')
      })
    )(nft)
  }
}
