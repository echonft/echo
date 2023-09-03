import { getUserFromSession } from '../../helpers/auth/get-user-from-session'
import { BadRequestError } from '../../helpers/error/bad-request-error'
import { createOffer } from '../../helpers/offer/create-offer'
import { getOfferItems } from '../../helpers/offer/get-offer-items'
import { getOfferItemsWallet } from '../../helpers/offer/get-offer-items-wallet'
import { assertUser } from '../../helpers/user/assert-user'
import { assertUserHasWallets } from '../../helpers/user/assert-user-has-wallets'
import { findUserById } from '../../helpers/user/find-user-by-id'
import { createOfferSchema } from '../../validators/create-offer-schema'
import { ApiRequest, CreateOfferRequest, IdResponse } from '@echo/api'
import { NextResponse } from 'next/server'
import { AuthOptions } from 'next-auth'

export async function createOfferRequestHandler(req: ApiRequest<CreateOfferRequest>, authOptions: AuthOptions) {
  const requestBody = await req.json()
  const { receiverItems, receiverId, senderItems } = parseCreateOfferRequest(requestBody)
  const sender = await getUserFromSession(authOptions)
  assertUserHasWallets(sender)
  const receiver = await findUserById(receiverId)
  assertUser(receiver)
  assertUserHasWallets(receiver)
  const receiverNfts = await getOfferItems(receiverItems)
  const senderNfts = await getOfferItems(senderItems)
  const receiverWallet = await getOfferItemsWallet(receiverNfts, receiver)
  const senderWallet = await getOfferItemsWallet(senderNfts, sender)
  const id = await createOffer(sender, senderWallet, senderNfts, receiver, receiverWallet, receiverNfts)
  return NextResponse.json<IdResponse>({ id })
}

function parseCreateOfferRequest(request: CreateOfferRequest) {
  try {
    return createOfferSchema.parse(request)
  } catch (e) {
    throw new BadRequestError()
  }
}
