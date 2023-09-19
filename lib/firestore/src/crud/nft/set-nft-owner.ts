import { findDiscordUserByUserId } from '@echo/firestore/crud/discord-user/find-discord-user-by-user-id'
import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import { getUserDetails } from '@echo/firestore/helpers/user/get-user-details'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { isNil } from 'ramda'

export async function setNftOwner(nftId: string, userId: string, username: string, wallet: FirestoreWallet) {
  const discordUser = await findDiscordUserByUserId(userId)
  if (isNil(discordUser)) {
    throw Error(`discord user with userId ${userId} not found`)
  }
  const userDetails = getUserDetails(username, discordUser, wallet)
  return updateNft(nftId, { owner: userDetails })
}
