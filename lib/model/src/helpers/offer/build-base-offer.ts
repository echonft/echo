import { nftsOwner } from '@echo/model/helpers/nft/nfts-owner'
import { erc721NftToItem } from '@echo/model/mappers/nft/erc721-nft-to-item'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import type { BaseOffer } from '@echo/model/types/base-offer'
import type { User } from '@echo/model/types/user'
import { applySpec, map, type NonEmptyArray, pipe, prop } from 'ramda'

interface GenerateBaseOfferArgs {
  senderOfferItems: NonEmptyArray<OwnedNft>
  receiverOfferItems: NonEmptyArray<OwnedNft>
  expiresAt: number
}

// TODO add ERC20 and ERC1155
export function buildBaseOffer(args: GenerateBaseOfferArgs): BaseOffer {
  return applySpec<BaseOffer>({
    expiresAt: prop('expiresAt'),
    receiver: pipe<[GenerateBaseOfferArgs], NonEmptyArray<OwnedNft>, User>(prop('receiverOfferItems'), nftsOwner),
    receiverItems: pipe(prop('receiverOfferItems'), map(erc721NftToItem)),
    sender: pipe<[GenerateBaseOfferArgs], NonEmptyArray<OwnedNft>, User>(prop('senderOfferItems'), nftsOwner),
    senderItems: pipe(prop('senderOfferItems'), map(erc721NftToItem))
  })(args)
}
