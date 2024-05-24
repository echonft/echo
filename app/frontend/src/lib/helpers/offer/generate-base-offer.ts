import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import type { BaseOffer } from '@echo/model/types/base-offer'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { always, applySpec, head, pipe, prop } from 'ramda'

interface GenerateBaseOfferArgs {
  senderOfferItems: Nft[]
  receiverOfferItems: Nft[]
  expiresAt: number
}

export function generateBaseOffer(args: GenerateBaseOfferArgs): BaseOffer {
  return applySpec<BaseOffer>({
    expiresAt: prop('expiresAt'),
    receiver: pipe<[GenerateBaseOfferArgs], Nft[], Nft, User>(prop('receiverOfferItems'), head, prop('owner')),
    receiverItems: prop('receiverOfferItems'),
    sender: pipe<[GenerateBaseOfferArgs], Nft[], Nft, User>(prop('senderOfferItems'), head, prop('owner')),
    senderItems: prop('senderOfferItems'),
    state: always(OFFER_STATE_OPEN)
  })(args)
}
