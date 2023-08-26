import { assertOffer } from '../../helpers/offer/assert-offer'
import { NftCollectionDiscordGuild } from '../../types/model/nft-collection-discord-guild'
import { findOfferById } from './find-offer-by-id'
import { updateOffer } from './update-offer'
import { WriteResult } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function setOfferDiscordGuild(
  id: string,
  discordGuild: NftCollectionDiscordGuild,
  threadId: string
): Promise<WriteResult> {
  const offer = await findOfferById(id)
  assertOffer(offer)
  if (!isNil(offer?.discordGuild)) {
    throw Error('offer already has a discord guild')
  }
  return updateOffer(id, {
    discordGuild: {
      discordId: discordGuild.discordId,
      threadId
    }
  })
}
