import { ServerError } from '../error/server-error'
import { mapAlchemyNftToFirestore } from './map-alchemy-nft-to-firestore'
import { GetNftResponse } from '@echo/alchemy'
import { addNft, NftCollection, User, Wallet } from '@echo/firestore'

export const createNft = async (
  alchemyNft: GetNftResponse,
  user: User,
  userWallet: Wallet,
  collections: NftCollection[]
) => {
  try {
    await addNft(mapAlchemyNftToFirestore(alchemyNft, user, userWallet, collections))
  } catch (e) {
    throw new ServerError('Error adding NFT')
  }
}
