import { ErrorResponse } from '../../../types'
import { FirestoreDiscordGuildData, FirestoreOfferData, FirestoreUserData, offerFirestoreData } from '@echo/firestore'
import { NextApiResponse } from 'next'

export function createOfferFromData(
  _sender: FirestoreUserData,
  _senderItems: string[],
  _receiver: FirestoreUserData,
  _receiverItems: string[],
  _discordGuild: FirestoreDiscordGuildData,
  res: NextApiResponse<FirestoreOfferData | ErrorResponse>,
  _requestForOfferId?: string
) {
  return res.status(200).json(offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!)
}
