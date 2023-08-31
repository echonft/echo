import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { createOffer } from '../../helpers/offer/create-offer'
import { getOfferItems } from '../../helpers/offer/get-offer-items'
import { getOfferItemsWallet } from '../../helpers/offer/get-offer-items-wallet'
import { parseCreateOfferSchema } from '../../helpers/offer/parse-create-offer-schema'
import { assertUser } from '../../helpers/user/assert-user'
import { assertUserHasWallets } from '../../helpers/user/assert-user-has-wallets'
import { findUserById } from '../../helpers/user/find-user-by-id'
import { ApiRequest, CreateOfferRequest, IdResponse } from '@echo/api-public'
import { NextResponse } from 'next/server'
import { AuthOptions } from 'next-auth'

export async function createOfferRequestHandler(req: ApiRequest<CreateOfferRequest>, authOptions: AuthOptions) {
  const requestBody = await req.json()
  const { receiverItems, receiverId, senderItems } = parseCreateOfferSchema(requestBody)
  const sender = await getUserFromSession(authOptions)
  assertUserHasWallets(sender)
  const receiver = await findUserById(receiverId)
  assertUser(receiver)
  assertUserHasWallets(receiver!)
  const receiverNfts = await getOfferItems(receiverItems)
  const senderNfts = await getOfferItems(senderItems)
  const receiverWallet = await getOfferItemsWallet(receiverNfts, receiver!)
  const senderWallet = await getOfferItemsWallet(senderNfts, sender)
  const id = await createOffer(sender, senderWallet, senderNfts, receiver!, receiverWallet, receiverNfts)
  return NextResponse.json<IdResponse>({ id })
}
