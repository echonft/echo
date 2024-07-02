import { addNft as addNftToFirestore } from '@echo/firestore/crud/nft/add-nft'
import { getWalletOwner } from '@echo/firestore/crud/wallet/get-wallet-owner'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import type { PartialWallet } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import type { Nft } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { always, andThen, assoc, isNil, otherwise, pipe } from 'ramda'

interface AddNftArgs {
  nft: Omit<Nft, 'owner' | 'updatedAt'>
  wallet: PartialWallet
}

export async function addNft(args: WithLoggerType<AddNftArgs>) {
  const { logger, nft, wallet } = args
  const user = await pipe(getWalletOwner, otherwise(always(undefined)))(wallet)
  if (isNil(user)) {
    logger?.error({ nft, wallet }, 'cannot add NFT because no owner found for the wallet')
    return undefined
  } else {
    return pipe<
      [Omit<Nft, 'owner' | 'updatedAt'>],
      Omit<Nft, 'updatedAt'>,
      Promise<NewDocument<Nft>>,
      Promise<Nullable<Nft>>,
      Promise<Nullable<Nft>>
    >(
      assoc('owner', getUserFromFirestoreData({ user, wallet })),
      addNftToFirestore,
      andThen(({ id, data }) => {
        const newNft = assoc('id', id, data)
        logger?.info({ nft: newNft }, 'added NFT to the database')
        return newNft
      }),
      otherwise<void>((err) => {
        logger?.error({ err, nft }, 'could not add NFT to the database')
        return undefined
      })
    )(nft)
  }
}
