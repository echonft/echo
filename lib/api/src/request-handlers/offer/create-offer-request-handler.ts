import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { assertAllowedMethods } from '../../helpers/error/assert-allowed-methods'
import { createOffer } from '../../helpers/offer/create-offer'
import { getOfferItems } from '../../helpers/offer/get-offer-items'
import { getOfferItemsWallet } from '../../helpers/offer/get-offer-items-wallet'
import { parseCreateOfferSchema } from '../../helpers/offer/parse-create-offer-schema'
import { assertUser } from '../../helpers/user/assert-user'
import { assertUserHasWallets } from '../../helpers/user/assert-user-has-wallets'
import { findUserById } from '../../helpers/user/find-user-by-id'
import { ApiRequest, ApiResponse, CreateOfferRequest, IdResponse } from '@echo/api-public'
import { AuthOptions } from 'next-auth'

export async function createOfferRequestHandler(
  req: ApiRequest<CreateOfferRequest>,
  res: ApiResponse<IdResponse>,
  authOptions: AuthOptions
) {
  assertAllowedMethods(req, ['PUT'])
  const { receiverItems, receiverId, senderItems } = parseCreateOfferSchema(req.body)
  const sender = await getUserFromSession(req, res, authOptions)
  assertUserHasWallets(sender)
  const receiver = await findUserById(receiverId)
  assertUser(receiver)
  assertUserHasWallets(receiver!)
  const receiverNfts = await getOfferItems(receiverItems)
  const senderNfts = await getOfferItems(senderItems)
  const receiverWallet = await getOfferItemsWallet(receiverNfts, receiver!)
  const senderWallet = await getOfferItemsWallet(senderNfts, sender)
  const id = await createOffer(sender, senderWallet, senderNfts, receiver!, receiverWallet, receiverNfts)
  return res.status(200).json({ id })
}
