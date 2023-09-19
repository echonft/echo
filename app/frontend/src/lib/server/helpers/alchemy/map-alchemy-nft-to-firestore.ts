import type { AlchemyNft } from '@echo/alchemy/types/model/alchemy-nft'
import { findDiscordUserByUserId } from '@echo/firestore/crud/discord-user/find-discord-user-by-user-id'
import { getUserDetails } from '@echo/firestore/helpers/user/get-user-details'
import type { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'
import type { FirestoreNftCollection } from '@echo/firestore/types/model/firestore-nft-collection'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { modifyStringPropToUrl } from '@echo/utils/fp/modify-string-prop-to-url'
import { getNftBlurUrl } from '@server/helpers/nft/get-nft-blur-url'
import { getOpenSeaUrl } from '@server/helpers/nft/get-open-sea-url'
import { isNil, omit, pipe } from 'ramda'

export async function mapAlchemyNftToFirestore(
  alchemyNft: AlchemyNft,
  user: AuthUser,
  wallet: FirestoreWallet,
  collection: FirestoreNftCollection
) {
  const { contractAddress, chainId, tokenId } = alchemyNft
  const partialNft = pipe(
    modifyStringPropToUrl<'pictureUrl', AlchemyNft>('pictureUrl'),
    modifyStringPropToUrl<'thumbnailUrl', AlchemyNft & Record<'pictureUrl', URL | undefined>>('thumbnailUrl'),
    omit(['contractAddress', 'chainId'])
  )(alchemyNft) as Partial<FirestoreNft>

  const discordUser = await findDiscordUserByUserId(user.id)
  if (isNil(discordUser)) {
    throw Error(`discord user not found for user with id ${user.id}`)
  }

  return {
    ...partialNft,
    blurUrl: getNftBlurUrl(contractAddress, tokenId),
    openSeaUrl: getOpenSeaUrl(contractAddress, chainId, tokenId),
    collection,
    owner: getUserDetails(user.name, discordUser, wallet)
  } as Omit<FirestoreNft, 'id'>
}
