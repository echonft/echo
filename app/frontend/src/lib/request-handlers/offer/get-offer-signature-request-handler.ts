import { ApiRequest } from '@echo/api/types/api-request'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { findOfferSignature } from '@echo/firestore/crud/offer-signature/find-offer-signature'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { guarded_assertOffer } from '@echo/frontend/lib/helpers/offer/assert/guarded_assert-offer'
import { guarded_assertOfferSenderIs } from '@echo/frontend/lib/helpers/offer/assert/guarded_assert-offer-sender-is'
import { guarded_assertOfferSignature } from '@echo/frontend/lib/helpers/offer/assert/guarded_assert-offer-signature'
import type { AuthUser } from '@echo/model/types/auth-user'
import { getChainId } from '@echo/utils/helpers/get-chain-id'
import { signSignature } from '@echo/web3/helpers/sign-signature'
import { NextResponse } from 'next/server'

export async function getOfferSignatureRequestHandler(user: AuthUser, _req: ApiRequest<never>, params: { id: string }) {
  const { id } = params
  const offer = await guardAsyncFn(findOfferById, ErrorStatus.SERVER_ERROR)(id)
  guarded_assertOffer(offer)
  guarded_assertOfferSenderIs(offer, user.username)
  const offerSignature = await guardAsyncFn(findOfferSignature, ErrorStatus.SERVER_ERROR)(offer.id)
  guarded_assertOfferSignature(offerSignature)
  const signerSignature = await guardAsyncFn(
    signSignature,
    ErrorStatus.SERVER_ERROR
  )({ chainId: getChainId(), signature: offerSignature.signature })

  return NextResponse.json<OfferSignatureResponse>({
    signature: signerSignature,
    offerSignature: offerSignature.signature
  })
}
