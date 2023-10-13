import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { NftThumbnailSkeleton } from '@echo/ui/components/nft/thumbnail/skeleton/nft-thumbnail-skeleton'
import { SwapDirectionHeaderSkeleton } from '@echo/ui/components/shared/skeleton/swap-direction-header-skeleton'
import { DirectionIn, DirectionOut } from '@echo/ui/constants/swap-direction'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
}

export const OfferDetailsItemsContainerSkeleton: FunctionComponent<Props> = ({ isReceiver }) => {
  const t = useTranslations('shared.assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <SwapDirectionHeaderSkeleton
        direction={isReceiver ? DirectionIn : DirectionOut}
        title={t(isReceiver ? 'in' : 'out')}
      />
      <NftsLayout centered={true}>
        <NftThumbnailSkeleton />
        <NftThumbnailSkeleton />
        <NftThumbnailSkeleton />
      </NftsLayout>
    </div>
  )
}
