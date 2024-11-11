import { userDocumentToModel } from '@echo/firestore/converters/user-document-to-model'
import { addNft as addNftToFirestore } from '@echo/firestore/crud/nft/add-nft'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import type { Address } from '@echo/model/types/address'
import type { Nft } from '@echo/model/types/nft'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import { error, info } from 'firebase-functions/logger'
import { andThen, assoc, otherwise, pipe, prop } from 'ramda'

export async function addNft(nft: Omit<Nft, 'owner'> & Record<'owner', Address>) {
  const owner = await pipe(prop('owner'), getUserByWallet, andThen(unlessNil(userDocumentToModel)))(nft)
  await pipe(
    assoc('owner', owner),
    addNftToFirestore,
    andThen(({ id, data }) => {
      info({ nft: assoc('id', id, data) }, 'added nft')
    }),
    otherwise((err) => {
      error({ err, nft }, 'could not add nft')
    })
  )(nft)
}
