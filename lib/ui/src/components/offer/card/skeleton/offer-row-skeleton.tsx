import { NftCardSkeleton } from '@echo/ui/components/nft/card/skeleton/nft-card-skeleton'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { OfferRowHeaderLayout } from '@echo/ui/components/offer/card/layout/offer-row-header-layout'
import { OfferRowLayout } from '@echo/ui/components/offer/card/layout/offer-row-layout'
import { OfferRowSwapIcon } from '@echo/ui/components/offer/card/offer-row-swap-icon'
import { OfferRowStatePillSkeleton } from '@echo/ui/components/offer/card/skeleton/offer-row-state-pill-skeleton'
import { OfferRowSwapContainerLayout } from '@echo/ui/components/offer/layout/offer-row-swap-container-layout'
import { UserDiscordTagSkeleton } from '@echo/ui/components/user/base/skeleton/user-discord-tag-skeleton'
import { ALIGNMENT_RIGHT } from '@echo/ui/constants/alignments'
import { type FunctionComponent } from 'react'

export const OfferRowSkeleton: FunctionComponent = () => (
  <OfferRowLayout>
    <OfferRowHeaderLayout>
      <OfferRowStatePillSkeleton />
      <UserDiscordTagSkeleton />
    </OfferRowHeaderLayout>
    <OfferRowSwapContainerLayout>
      <NftsLayout>
        <NftCardSkeleton />
        <NftCardSkeleton />
      </NftsLayout>
      <OfferRowSwapIcon />
      <NftsLayout alignment={ALIGNMENT_RIGHT}>
        <NftCardSkeleton />
        <NftCardSkeleton />
      </NftsLayout>
    </OfferRowSwapContainerLayout>
  </OfferRowLayout>
)
