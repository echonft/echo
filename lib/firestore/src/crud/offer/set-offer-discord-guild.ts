import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { updateOffer } from '@echo/firestore/crud/offer/update-offer'
import { assertOffer } from '@echo/firestore/helpers/offer/assert/assert-offer'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/firestore-nft-collection-discord-guild'
import type { WriteResult } from 'firebase-admin/lib/firestore'
import { isNil } from 'ramda'

export async function setOfferDiscordGuild(
  id: string,
  discordGuild: FirestoreNftCollectionDiscordGuild,
  threadId: string
): Promise<WriteResult> {
  const offer = await findOfferById(id)
  assertOffer(offer)
  if (!isNil(offer.discordGuild)) {
    throw Error('offer already has a discord guild')
  }
  return updateOffer(id, {
    discordGuild: {
      discordId: discordGuild.discordId,
      threadId
    }
  })
}
