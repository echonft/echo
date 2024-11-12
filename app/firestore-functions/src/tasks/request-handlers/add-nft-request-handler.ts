import type { AddNftTaskData } from '@echo/firestore-functions/tasks/add-nft-task'
import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { addNft } from '@echo/firestore/crud/nft/add-nft'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import { error, info } from 'firebase-functions/logger'
import { andThen, assoc, otherwise, pipe, prop } from 'ramda'

export async function addNftRequestHandler(data: AddNftTaskData) {
  const owner = await pipe(prop('owner'), getUserByWallet, andThen(unlessNil(userDocumentToModel)))(data)
  await pipe(
    assoc('owner', owner),
    addNft,
    andThen(({ id, data }) => {
      info({ nft: assoc('id', id, data) }, 'added nft')
    }),
    otherwise((err) => {
      error({ err, nft: assoc('owner', owner, data) }, 'could not add nft')
    })
  )(data)
}
