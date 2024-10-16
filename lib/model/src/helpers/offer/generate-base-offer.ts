import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { BaseOffer } from '@echo/model/types/offer/base-offer'
import type { User } from '@echo/model/types/user/user'
import { applySpec, head, type NonEmptyArray, pipe, prop } from 'ramda'

interface GenerateBaseOfferArgs {
  senderOfferItems: NonEmptyArray<OwnedNft>
  receiverOfferItems: NonEmptyArray<OwnedNft>
  expiresAt: number
}

export function generateBaseOffer(args: GenerateBaseOfferArgs): BaseOffer {
  return applySpec<BaseOffer>({
    expiresAt: prop('expiresAt'),
    receiver: pipe<[GenerateBaseOfferArgs], NonEmptyArray<OwnedNft>, OwnedNft, User>(
      prop('receiverOfferItems'),
      head,
      prop('owner')
    ),
    receiverItems: prop('receiverOfferItems'),
    sender: pipe<[GenerateBaseOfferArgs], NonEmptyArray<OwnedNft>, OwnedNft, User>(
      prop('senderOfferItems'),
      head,
      prop('owner')
    ),
    senderItems: prop('senderOfferItems')
  })(args)
}
