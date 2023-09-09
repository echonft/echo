import { mapAlchemyNftToFirestore } from '../alchemy/map-alchemy-nft-to-firestore'
import { ServerError } from '../error/server-error'
import { AlchemyNft } from '@echo/alchemy'
import { addNft } from '@echo/firestore'
import { NftCollection, User, Wallet } from '@echo/firestore-types'

export const createNft = async (
  alchemyNft: AlchemyNft,
  user: User,
  userWallet: Wallet,
  collections: NftCollection[]
) => {
  try {
    await addNft(mapAlchemyNftToFirestore(alchemyNft, user, userWallet, collections))
  } catch (e) {
    const nft = {
      alchemyNft,
      user,
      userWallet,
      collections
    }
    throw new ServerError(`error adding nft ${JSON.stringify(nft)}`, e)
  }
}
