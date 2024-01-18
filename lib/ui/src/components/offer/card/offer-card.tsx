import { linkProvider } from '@echo/api/services/routing/link-provider'
import { OFFER_ROLE_RECEIVER } from '@echo/model/constants/offer-role'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { NftItemCard } from '@echo/ui/components/nft/card/nft-item-card'
import { NftStack } from '@echo/ui/components/nft/stack/nft-stack'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { head, map, prop } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
}

export const OfferCard: FunctionComponent<Props> = ({ offer }) => {
  // FIXME This doesnt work right now because the offer can be expired yet final
  const { state, receiverItems, senderItems, role, expired } = offer
  const isReceiver: boolean = role === OFFER_ROLE_RECEIVER
  const counterpartyItems = isReceiver ? senderItems : receiverItems
  const tradeMultipleItems = counterpartyItems.length > 1

  // Should not happen, but makes unwrapping safe
  if (isNilOrEmpty(counterpartyItems)) {
    return null
  }

  const headNft = head(counterpartyItems)!.nft
  const { owner, collection, pictureUrl, tokenId } = headNft
  return (
    <InternalLink path={linkProvider.profile.offer.get({ offerId: offer.id })}>
      <ShowIf condition={tradeMultipleItems}>
        <NftStack
          stack={{ owner, collection, pictureUrl, tokenId, nfts: map(prop('nft'), counterpartyItems) }}
          status={state}
          expired={expired}
        />
      </ShowIf>
      <ShowIf condition={!tradeMultipleItems}>
        <NftItemCard nft={headNft} status={state} expired={expired} />
      </ShowIf>
    </InternalLink>
  )
}
