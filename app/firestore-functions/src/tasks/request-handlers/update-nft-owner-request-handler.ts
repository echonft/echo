import type { UpdateNftOwnerTaskData } from '@echo/firestore-functions/tasks/update-nft-owner-task'
import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { getNftByCollectionContract } from '@echo/firestore/crud/nft/get-nft-by-collection-contract'
import { removeNftOwner } from '@echo/firestore/crud/nft/remove-nft-owner'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { eqUser } from '@echo/model/helpers/user/eq-user'
import type { User } from '@echo/model/types/user'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, andThen, assoc, isNil, otherwise, pipe } from 'ramda'

export async function updateNftOwnerRequestHandler(data: UpdateNftOwnerTaskData) {
  const nft = await getNftByCollectionContract(data)
  if (!isNil(nft)) {
    const owner = await pipe(
      getUserByWallet,
      andThen(unlessNil(pipe(userDocumentToModel, assoc('wallet', data.owner)))),
      otherwise(always(undefined as Nullable<User>))
    )(data.owner)
    if (!eqUser(nft.owner, owner)) {
      if (isNil(owner)) {
        await removeNftOwner(nft)
      } else {
        await setNftOwner({ nft, owner })
      }
    }
  }
}
