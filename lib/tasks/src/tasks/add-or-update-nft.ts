import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import type { Nft } from '@echo/model/types/nft'
import { info } from '@echo/tasks/helpers/logger'
import { updateNftOwner, type UpdateNftOwnerArgs } from '@echo/tasks/tasks/update-nft-owner'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import { getNftOwner } from '@echo/web3/services/get-nft-owner'
import { andThen, assoc, isNil, objOf, pipe } from 'ramda'

export async function addOrUpdateNft(nft: Nft): Promise<Nft> {
  const wallet = await getNftOwner(nft)
  const existingNft = await getNftByIndex(nft)
  if (isNil(existingNft)) {
    const owner = await pipe(getUserByWallet, andThen(unlessNil(userDocumentToModel)))(wallet)
    return await pipe(
      assoc('owner', owner),
      addNft,
      andThen(({ id, data }) => {
        info({ nft: assoc('id', id, data) }, 'added NFT')
        return data
      })
    )(nft)
  } else {
    return pipe<[Nft], Omit<UpdateNftOwnerArgs, 'wallet'>, UpdateNftOwnerArgs, Promise<Nft>>(
      objOf('nft'),
      assoc('wallet', wallet),
      updateNftOwner
    )(nft)
  }
}
